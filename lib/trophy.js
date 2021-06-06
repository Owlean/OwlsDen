import fs from 'fs'
import path from 'path'

const currentdir = process.cwd()
// const trophyPictures = path.join(currentdir, 'trophy')
const trophyPictures = currentdir + '/public/images/trophy'

export function getNbPictures() {
    let images = fs.readdirSync(trophyPictures)
    const srcImages = images.map((img) => {
        return '/images/trophy/'.concat(img)
    })

    const srcImagesByTwo = srcImages.reduce(function (rows, key, index) { 
        return (index % 2 == 0 ? rows.push([key]) 
          : rows[rows.length-1].push(key)) && rows;
      }, []);
  
    return srcImagesByTwo;
}