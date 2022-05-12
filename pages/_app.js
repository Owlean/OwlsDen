import '../styles/globals.css'
import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const theme = extendTheme({
	styles: {
    global: (props) => ({
      "html, body": {
        background: mode("black")(props),  //mode(light mode color, dark mode color)
	color: mode("white")(props),
      },
    }),
  },
  colors: {
    white: {
      100: "#ffffff",
      200: "#f9f9f9",
      300: "#ededed",
      400: "#e1e1e1",
      500: "#d3d3d3",
      600: "#c4c4c4",
      700: "#b3b3b3",
      800: "#a0a0a0",
      900: "#898989",
    },

    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
})

function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
