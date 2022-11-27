async function syncLoadImg(src) {
  return new Promise(resolve => {
    const imgDom = new Image()
    imgDom.src = src
    imgDom.onload = () => {
      resolve(imgDom)
    }
  })
}

// const res = await syncLoadImg('https://freenaturestock.com/wp-content/uploads/freenaturestock-1439-768x512.jpeg')
// console.log(res.width, 'xx');