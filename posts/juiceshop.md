---
author: NONCLERCQ Basile, BELLEC Louison, BOUVARD Alexandre, GUILLAUMIE Bilal, TORRET Lucas
title: JuiceShop, How to protect your application/network with middlewares ?
date: last change 26 02 2021
---

# Preamble

In order to develop our argumentation and illustrate some cases, we are going to work on the JuiceShop project, the most insecure web application. After finding all or some vulnerabilities, we will set up one or several security solutions to resolve theses vulnerabilities without touching the source code of Juice Shop.

<!-- omit in toc -->

# Table of content:

- [Preamble](#preamble)
- [Table of content:](#table-of-content)
- [Setup](#setup)
- [Juice Shop Vulnerabilities](#juice-shop-vulnerabilities)
  - [SQL injection](#sql-injection)
    - [Exploitation 1 - Basic SQLi](#exploitation-1---basic-sqli)
  - [XSS](#xss)
    - [Exploitation 1 - Basic XSS](#exploitation-1---basic-xss)
    - [Exploitation 2 - Cookie Exploitation](#exploitation-2---cookie-exploitation)
  - [Sensitive Data Exposure](#sensitive-data-exposure)
    - [Exploitation 1 - Admin bypass](#exploitation-1---admin-bypass)
    - [Exploitation 2 - FTP](#exploitation-2---ftp)
    - [Exploitation 3 - Coupon bypass](#exploitation-3---coupon-bypass)
      - [Exploitation 4 - Private RSA Key Exposure](#exploitation-4---private-rsa-key-exposure)
  - [Broken authentification](#broken-authentification)
    - [Exploitation 1 - Broken Reset Password](#exploitation-1---broken-reset-password)
  - [Broken Access Control](#broken-access-control)
    - [Exploitation 1 - See other'user basket](#exploitation-1---see-otheruser-basket)
    - [Exploitation 2 - Register with a password of less than 5 characters](#exploitation-2---register-with-a-password-of-less-than-5-characters)
  - [Using Components with Known Vulnerabilities](#using-components-with-known-vulnerabilities)
    - [Exploitation 1 - Deprecated Packages](#exploitation-1---deprecated-packages)
- [Juice Shop Securisation](#juice-shop-securisation)
  - [Reverse Proxy](#reverse-proxy)
  - [Reverse Proxy](#reverse-proxy-1)
  - [IDS / IPD (Intrusion Detection/Prevention System)](#ids--ipd-intrusion-detectionprevention-system)
  - [WAF](#waf)
    - [Definition](#definition)
    - [WAF Implementation](#waf-implementation)
  - [SSL](#ssl)

# Setup

1. Install Docker
2. Run docker pull bkimminich/juice-shop
3. Run docker run --rm -p 3000:3000 bkimminich/juice-shop
4. Browse to http://localhost:3000

Juice Shop Link: https://hub.docker.com/r/bkimminich/juice-shop

Structure for each section:

- Vulnerability
  - Demonstration
  - Fix

# Juice Shop Vulnerabilities

## SQL injection

### Exploitation 1 - Basic SQLi

We can inject SQL in the username section of the login page. We can write  
```
' or 1=1; 
```  
to match all users and login as an user.

![SQLi](/images/juiceshop/SQli/sqliVuln1.png)
![SQLi](/images/juiceshop/SQli/sqliVuln2.png)

> `WAF could prevent this attack `

## XSS

### Exploitation 1 - Basic XSS

We can inject javascript code via an iframe in the search bar:  

Payload:

```bash
<iframe src="javascript:alert(`Nice XSS`)">
```

![XSS](/images/juiceshop/XSS/XSSVuln1.png)

![XSS](/images/juiceshop/XSS/XSSVuln2.png)

### Exploitation 2 - Cookie Exploitation

As above, we use the following playload:

```bash
<iframe src="javascript:console.log(document.cookies)">
```

Here's the result :

![Cookie](/images/juiceshop/Injection/Injection1.png)

Here's the decode result :

![Cookie](/images/juiceshop/Injection/Injection2.png)
We have a lot of intel about the user by just looking at the JWT token

```json
// Header
{
  "typ": "JWT",
  "alg": "RS256"
}
// Payload
{
  "status": "success",
  "data": {
    "id": 22,   // << intressting for a database probably
    "username": "",
    "email": "test@test.com",
    "password": "147538da338b770b61e592afc92b1ee6",     // << ='(
    "role": "customer",             // << intressting to 
    "deluxeToken": "",              // << if "deluxe" user 
    "lastLoginIp": "0.0.0.0",       // << ='(
    "profileImage": "/assets/public/images/uploads/22.png",
    // by default
    // "profileImage": "/assets/public/images/uploads/default.svg",  // could be useful
    "totpSecret": "",               // << ??
    "isActive": true,
    "createdAt": "2021-01-28 22:59:17.696 +00:00",
    "updatedAt": "2021-01-28 22:59:17.696 +00:00",
    "deletedAt": null   // << token or user data ?
  },
  "iat": 1611874774,
  "exp": 1611892774
}
```

We could know

- Which role the user who've done a request have.
- The last login ip of this user.
- The md5 password (md5 is deprecated, see figured just below)
- Email password -> which could be devastating, a lot of users reused their password on several webstites.
- An id which is probably used within a database
- Fields that could be intressting for some feature of the website - `deluxeToken` - `totpSecret`


With the first dummy hash crack website we got the following result for the password.

![md5 crack](images/XSS/md5-crack.png)

We could gain control over the user account and probably have more intels about his private informaiton.

## Sensitive Data Exposure

### Exploitation 1 - Admin bypass

In the review section of many product, we can find users' emails incuding the admin one: `admin@juice-sh.op`. He comments "I bought it, would buy again. 5/7" in the review of Eggfruit Juice (500ml).

Then, with bruteforcing or basic input (like admin123) we can enter as the admin account. This one can also fit with Broken Authentification.

### Exploitation 2 - FTP

In the section "about us" we can see a link "Check out our boring terms of use if you are interested in such lame stuff" with the url: `ip:port/ftp/legal.md`.

We can go to the ftp directory and see a lot of files, probably not for basic users. But we can't (at the moment) download all the files. When trying to download` eastere.gg`, we got the following error: `403 Error: Only .md and .pdf files are allowed!`.

[I](http://localhost:3000/ftp/acquisitions.md)

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure1.png)

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure4.png)

For the `.md` file within the directory, we can open the `acquisition.md` file which seems to be very confidential (Something great for blackmailing).  

For the otherdfile which have not the rigth extension, if we add a null bytes `%00` encoded as unicode and then `.md` like that:

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure3.png)

We must encoded the `%` because it's a special character for URL, it define unicode. So what we can do in order to bypass the extension security checek is to encoded the `%` itself in unicode which give us `%25` and then added the rest of the null byte *i.e 00*
So `%2500.md` -> unicode decoded -> `%00.md` -> bypass the extesion validation + null byte that will give us the right document.

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure2.png)
It works.  
For the easter we could see what's inside of the document and see the following content: 
```bash
(ins)[rikishi@toru juice-shop]$ strings eastere.gg
"Congratulations, you found the easter egg!"
- The incredibly funny developers
Oh' wait, this isn't an easter egg at all! It's just a boring text file! The real easter egg can be found here:
L2d1ci9xcmlmL25lci9mYi9zaGFhbC9ndXJsL3V2cS9uYS9ybmZncmUvcnR0L2p2Z3V2YS9ndXIvcm5mZ3JlL3J0dA==
Good luck, egg hunter!
```
We could directly see by the `==` at the end of the payload that it's a base64 payload `L2d1ci9xcmlmL25lci9mYi9zaGFhbC9ndXJsL3V2cS9uYS9ybmZncmUvcnR0L2p2Z3V2YS9ndXIvcm5mZ3JlL3J0dA==`  
Once it's decoded it will give us the following content `/gur/qrif/ner/fb/shaal/gurl/uvq/na/rnfgre/rtt/jvguva/gur/rnfgre/rtt` which seems to be a path but doesn't work on the application. The path is weird so there is probably an obfuscation made by Ceasar or any alogrithm with rotation (the `/` seems not to be impacted by the obfuscation)  
With Caesar bruteforce we get the following path `the/devs/are/so/funny/they/hid/an/easter/egg/within/the/easter/egg` which make sense for an easter egg. This path gave us a beautiful planet.

Otherwise, thanks to the `%2500.md` bypass we could retrieve a lot of important files such as `encrypted.pyc` which could give us intel about the way `annoucement_encrypted.md` is encrypted.  
Indeed thanks to website like https://www.toolnb.com/tools-lang-en/pyc.html we could rebuilt the source code of the `encrypted.pyc` which give us the following result: 
```python
# uncompyle6 version 3.5.0
# Python bytecode 2.7 (62211)
# Decompiled from: Python 2.7.5 (default, Aug  7 2019, 00:51:29) 
# [GCC 4.8.5 20150623 (Red Hat 4.8.5-39)]
# Embedded file name: encrypt.py
# Compiled at: 2020-05-21 04:46:26
confidential_document = open('announcement.md', 'r')
N = 145906768007583323230186939349070635292401872375357164399581871019873438799005358938369571402670149802121818086292467422828157022922076746906543401224889672472407926969987100581290103199317858753663710862357656510507883714297115637342788911463535102712032765166518411726859837988672111837205085526346618740053L
e = 65537
encrypted_document = open('announcement_encrypted.md', 'w')
for char in confidential_document.read():
    encrypted_document.write(str(pow(ord(char), e, N)) + '\n')

encrypted_document.close()
```

One more file that is intressting is `coupons_2013.md.bak` 
```bash
curl localhost:3000/ftp/coupons_2013.md.bak%2500.md
n<MibgC7sn
mNYS#gC7sn
o*IVigC7sn
k#pDlgC7sn
o*I]pgC7sn
n(XRvgC7sn
n(XLtgC7sn
k#*AfgC7sn
q:<IqgC7sn
pEw8ogC7sn
pes[BgC7sn
l}6D$gC7ss
```

This file bring us to the following exploit:


### Exploitation 3 - Coupon bypass

By looking at the source code of the browser inside the `index.js` file, we could try to look if anything is hardcoded by looking at terms wich we could found on the website.
If we look at coupons we could found chunk of code with discout keywords. And by looking at the discount keyword we could found a intresting section :
```js
(this.campaigns = {
      WMNSDY2019: {
        validOn: 15519996e5,
        discount: 75,
      },
      WMNSDY2020: {
        validOn: 1583622e6,
        discount: 60,
      },
      WMNSDY2021: {
        validOn: 1615158e6,
        discount: 60,
      },
      WMNSDY2022: {
        validOn: 1646694e6,
        discount: 60,
      },
      WMNSDY2023: {
        validOn: 167823e7,
        discount: 60,
      },
      ORANGE2020: {
        validOn: 15885468e5,
        discount: 50,
      },
      ORANGE2021: {
        validOn: 16200828e5,
        discount: 40,
      },
      ORANGE2022: {
        validOn: 16516188e5,
        discount: 40,
      },
      ORANGE2023: {
        validOn: 16831548e5,
        discount: 40,
      },
    });
}
``` 
We have the list of the active coupons, with their discount's percentage.

While reading the source code from the repository, we stumble upon:  

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure5.png)

Here's the source code on how they treat coupon related things. We can see how they create their coupon:

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure6.png)

They are using `z85` encoding.

Moreover, as the coupon is generated from the current date and the discount pourcentage, we could create one.  
Exemple: `FEB21-99` stand for 99% of discount (Max 8 characters).

We just have to encode first in `hexadecimal` and then in `z85`.

Demonstration:

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure7.png)

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure8.png)


#### Exploitation 4 - Private RSA Key Exposure

On the github repository,we can have access to the code. We can find a RSA :
https://github.com/bkimminich/juice-shop/blob/f68b2c49a880acca2d8a525f362ea4f449143935/lib/insecurity.js#L19.
We can also find information about the way Hash based messages are created in this app.

![Sensitive Data Exposure](/images/juiceshop/SensitiveData/SensitiveDataExposure12.png)

We have not found any way to exploit it yet.

## Broken authentification

### Exploitation 1 - Broken Reset Password

Even if we can, from admin account, do malicious things, there are others ways.

In the same way as we did before with the admin user, we can see `jim@juice-sh.op` who wrote: Fresh out of a replicator.". From here, with his email, we can try to answer his security question in the "forgot password" section: "your eldest siblings middle name?".  
With some research, we can reset his password and take control of the account.  
By typing "replicator" on google, we can find a Star Trek reference that leads us to find the answer to the question: "Samuel" for George Samuel Kirk, the eldest brother of James Tiberius Kirk.

![Vulnerability Exploitation](/images/juiceshop/BrokenAuth/brokenAuthVuln1.png)
![Vulnerability Exploitation](/images/juiceshop/BrokenAuth/brokenAuthVuln2.png)

## Broken Access Control

### Exploitation 1 - See other'user basket

Once we have a account, we can go to our basket and check with `burp` the corresponding url:

![Broken Access Control](/images/juiceshop/BrokenAccess/BrokenAccessControl1.png)

By simply replacing the `2` by an other figure like `1`, we can get the basket of an other user (in this case, the admin user).

![Broken Access Control](/images/juiceshop/BrokenAccess/BrokenAccessControl2.png)

### Exploitation 2 - Register with a password of less than 5 characters

As we can see in the picture, the application requires a 5-20 length password.

![Broken Access Control](/images/juiceshop/Passwd/5passwd1.png)

But, with burpsuite, we can bypass this. In fact the length check is done in the frontend only instead of in the backend as well. We can finally modify the password as we want (even enterering two differents passwords) and create an account.

![Broken Access Control](/images/juiceshop/Passwd/5passwd2.png)

![Broken Access Control](/images/juiceshop/Passwd/5passwd3.png)

## Using Components with Known Vulnerabilities

### Exploitation 1 - Deprecated Packages

When we audit the code (run `npm install` and then `npm audit`) :

![ Using Components with Known Vulnerabilities](/images/juiceshop/KnowVulnerability/UsingComponentsKnownVulnerabilities1.png)

We are seeing a critical vulerability for the jsonwebtoken package :

```
npm WARN deprecated jsonwebtoken@0.4.0: Critical vulnerability fix in v5.0.0.
```

See https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/

After a quick internet search:

POC : https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/

We can also find:

```
npm WARN deprecated jws@0.2.6: Security update: Versions below 3.0.0 are deprecated.
```

POC : https://snyk.io/test/npm/jws/0.2.6

> Note: Audit result -> [Audit](./message.txt)

![Audit picture](/images/juiceshop/auditResult.png)

# Juice Shop Securisation

## Reverse Proxy

## Reverse Proxy 

Reverse Proxy allow us to not directly expose our web app / server. Indeed, it ensures that our backend server remains unknow. As reverse proxy, we can use Apache or Nginx. 

We could also encrypting the connection between the client and the proxy with TLS/SSL in order to get a securized transmission.

![IPS / IDS](/images/juiceshop/ReverseProxy.png)

## IDS / IPD (Intrusion Detection/Prevention System)

> Note: An IDS analyse the traffic on the network et generate logs while an IPS stand side to the WAF and reject somes packets.

![IPS / IDS](/images/juiceshop/IPSIDS.png)

The second thing we can do is to add an IPS **fail2ban**. Fail2ban ignores requests from malicious IP addresses by scanning logs, for example if they fail many times in authentifications events. So, it prevents Bruteforce type attacks.

About IDS, we can use **Snort**. It uses a serie of rules that help define malicious network activities and generate alerts for packets whose match.

## WAF

### Definition

Initially for Apache (but now also available for Nginx), **ModSecurity** is a web application firewall. It works on the layer 7 of the OSI model. It analyses every packet from an external source. We distinguish two distinct components:

- An IDS/IPS engine.
- A rule set for filtering packets. (allow or disallox list)

Its usage is vast. It can detect intrusion, spams, exploit use, bruteforce ... and stop them. But it also hides versions and stop explicit error messages.

Just to get an idea, it can prevent, for example, from:

- SQL Injection
- Insuring the content type matches the body data.
- Protection against malformed POST requests.
- HTTP Protocol Protection
- Real-time Blacklist Lookups
- HTTP Denial of Service Protections
- Generic Web Attack Protection
- Error Detection and Hiding

For the deployment, we have two choices :

* Embeded: Can be usefull if you don't want to modify your architecture.
* Reverse proxy: Even better choice for security because it adds a separate security layer. It also allows scalability.

Repository : https://hub.docker.com/r/owasp/modsecurity-crs/

> Note: See Owasp ModSecurity Core Rule Set (set of generic attack detection rules) : https://owasp.org/www-project-modsecurity-core-rule-set/
>
> Modsecurity is the best known WAF. But others exist like NAXSI, App protect for Nginx.

### WAF Implementation

In order to enhanced the protection of the application we could add a WAF _Web Application Firewall_ in front of our website. Instead of accessing the website directly the user will go through the Firewall which will prevent malicious request to pass through the website.

In our project, we've decided to implement the _Application Gateway_ provided by Azure Microsoft Cloud Services with the WAF functionnality added on top of it.

In order to have the basic web application without the waf on Azure we have to :

1. Create a resource group
1. Create an App service plan with docker as configuration
1. Create an App service
1. Deploy the container from docker.io registry into the application created just the step before (deployment section)

At this point the application is hosted by Azure from the container provided by _bkimminich_ for _juice shop_ in docker hub registies (https://hub.docker.com/r/bkimminich/juice-shop).  
The URL of the web application is *https://juice-shop.azurewebsites.net/*  
![basic web app](images/azure-waf/homepage-host-on-azure.png)

We can test ou SQL Injection that is not blocked yet because no protection layer is added.

![basic web app](images/azure-waf/sql-injection-success.png)

For Azure resource group, we've got at this point the following resources :

![basic web app](images/azure-waf/resource-group.png)

Now that the application is working. we could start thinking about hardening it by adding extra components. Especially the Application Gateway which provided a lot of features.

- Secure Sockets Layer (SSL/TLS) termination
- Autoscaling
- Zone redundancy
- Static VIP
- **Web Application Firewall**
- Ingress Controller for AKS
- URL-based routing
- Multiple-site hosting
- Redirection
- Session affinity
- Websocket and HTTP/2 traffic
- Connection draining
- Custom error pages
- Rewrite HTTP headers and URL
- Sizing

The feature that get our attention here is the Web Application Firewall, which will allow us to prevent the application from malicious requets as the following image could illustrate.

![basic web app](images/azure-waf/waf1.png)

The WAF act like a load balancer but not in a traditional way. A load blancer operate at the **Transport layer** ((OSI layer 4 - TCP and UDP) and route traffics based on source IP address and port, to a destination IP address and port.  
While, the Applicaiton Gateway operate at the **Application layer** and make routing decisions based on additional attributes of an HTTP request.

In order to add the application Gateway into our resource group we have to do the following steps:

1. Create an application Gateway
   - Create the virtual network associated with the Application Gateway.
   - Create the public ip which will be used to access the Application Gateway
   - Create the backend pool of the Application Gateway, add the application service into it.
   - Create at least 1 rules for the Application Gateway which need to :
     - Create the listener options
     - Create the http rules
1. Add the probe into the Application Gateway.
1. Within the Application, restrict access to the virtual network of the Application Gateway only (it will prevent any user to access the website directly, without going through the WAF first).

This screenshot it the resource group without any Application Gateway configure or added.  
![basic web app](images/azure-waf/insight-resource-group-after-waf-added.png)
Then we could set up the container application.  
![basic web app](images/azure-waf/app-service-docker-conf.png)

After the deployment of the app from the docker container we could browse the website   
![basic web app](images/azure-waf/sql-injection-success.png)

In order to enhanced the security we've added the Application Gateway with the WAF tier.  
![basic web app](images/azure-waf/review-application-gateway-creation.png)


Then we add the following restriction. We want to prevent any access directly through the application. The user must go through the Application Gateway firt.  
![basic web app](images/azure-waf/access-restriction-juice-app.png)
![basic web app](images/azure-waf/access-restriction-test-forbidden.png)

Then we can test some SQL injection  
**// Forbidden**  
![basic web app](images/azure-waf/sql-injection-stopped-by-waf.png)
We could also try to bypass the extension with `%2500.md`  
![basic web app](images/azure-waf/extenstion-bypass-stoped-forbidden-403.png)

## SSL

In order to maintain confidentiality and increase security, we can implement/activate the TLS/SSL protocol on our Reverse Proxy (or server).

![IPS / IDS](/images/juiceshop/SSL.png)