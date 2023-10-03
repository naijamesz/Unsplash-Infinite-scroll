const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 30
let photosArray = []

// Unsplash API
// let count = 5
// let initialCount = 5
// const apiKey = 'dbCfl2m615rLsxaiRx3G-KpOWq5-5FoERa_5AwZYPsE'
// const apiKey = '61YWiHXjTkGyznIhzpP56ODiwgvDTCjHr_FYqszG-24'
// let apiUrl = `https://api.unsplash.com/photos/random
// /?client_id=${apiKey}&count=${count}`
let isInitialLoad = true // NEW LINE ****
// Unsplash API
let initialCount = 5
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek'
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`

// Add NEW Block****
function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`
}

// Condition check all images were loaded
function imageLoaded() {
  imagesLoaded++
  console.log(imagesLoaded)
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Elements for links and Photos Add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    // create <a></a> to link to full photo
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // Event check when each is finished loading
    img.addEventListener('load', imageLoaded)

    // <img> inside anchor tag, then put both inside imageContainer Element
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Get photos frome Unslash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
    // NEW LINE ****
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30)
      isInitialLoad = false // NEW LINE ****
    }

    // console.log(photosArray)
  } catch (error) {
    // Catch Error this here
  }
}

// Condition for check to see if scrolling near bottom of page, Load more images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos()
