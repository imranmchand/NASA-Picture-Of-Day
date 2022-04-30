// The user will enter a date. Use that date to get the NASA picture of the day from that date using this api -    https://api.nasa.gov/

function init () {

  document.querySelector('img').style.display = 'none'
  document.querySelector('iframe').style.display = 'none'

  document.querySelector('button').addEventListener('click', getPicture)

  let image;
  let video;

  function getPicture () {

    let date = document.querySelector('input').value
  
    if (dateValidation(date)){

      // had to add &date={$date} for the api to be able to get the actual date
      fetch(`https://api.nasa.gov/planetary/apod?api_key=M25NXhuijsBk5dBn0yJmnA43yDPVfi2dpm3wA1aM&date=${date}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('h2').innerHTML = data.title
        document.querySelector('p').innerHTML = data.explanation
        insertMedia(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    } else {
      alert('Date cannot be a future date')
    }
  }

  function insertMedia (obj) {
    if (obj.media_type == 'image'){
      // if there was already a video, remove it from the dom and make it falsy
      if (video) {
        document.querySelector('iframe').style.display = 'none'
        video = null
      }
      // if there is no image, add it to the dom 
      if (!image){
        image = document.querySelector('img')
        image.src = obj.url
        document.querySelector('img').style.display = 'block'
        // if there is already an image, replace it with the new one
      } else {
        image.src = obj.url
      }
    } else if (obj.media_type == 'video'){
      // if there is already an image, remove it from the dom and make it falsy
      if (image){
        document.querySelector('img').style.display = 'none'
        image = null
      }
      // if there is no video, add it to the dom
      if (!video){
        video = document.querySelector('iframe')
        video.src = obj.url
        document.querySelector('iframe').style.display = 'block'
      } else {
        // if there is already a video, replace it with the new one
        video.src = obj.url
      }
    } 
    
  }

  function dateValidation (date) {
    let userDate = new Date(date)
    let todaysDate = new Date()
    if (userDate > todaysDate) {
      return false
    } else {
      return true
    }
  }

}

window.addEventListener('load', init)







// OLD CODE BUT WORKS AND DOES THE EXACT SAME THING
// IS A LITTLE MORE COMPLEX FOR NO REASON - JUST WANTED TO TRY SOME NEW THINGS LIKE CREATING AND APPENDING ELEMENTS
// IN THE HTML, WOULD NEED TO ADD A DIV AND REMOVE THE IMG AND IFRAMES



// function init () {

//   document.querySelector('button').addEventListener('click', getPicture)

//   let image;
//   let video;

//   function getPicture () {

//     let date = document.querySelector('input').value

//     if(dateValidation(date)){

//       // had to add &date={$date} for the api to be able to get the actual date
//       fetch(`https://api.nasa.gov/planetary/apod?api_key=M25NXhuijsBk5dBn0yJmnA43yDPVfi2dpm3wA1aM&date=${date}`)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.querySelector('h2').innerHTML = data.title
//         document.querySelector('p').innerHTML = data.explanation
//         insertMedia(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
//     } else {
//       alert('Cannot enter a future date')
//     }
//   }

//   function insertMedia (obj) {
//     if (obj.media_type == 'image'){
//       // if there was already a video, remove it from the dom and make it null
//       if (video) {
//         document.querySelector('iframe').remove()
//         video = null
//       }
//       // if there is no image, create an image and add it to the dom 
//       if (!image){
//         image = document.createElement('img')
//         image.src = obj.url
//         document.querySelector('div').appendChild(image)
//         // if there is already any image, replace it with the new one
//       } else {
//         image.src = obj.url
//       }
//     } else if (obj.media_type == 'video'){
//       // if there was already an image, remove it from the dom and make it null
//       if (image){
//         document.querySelector('img').remove()
//         image  = null
//       }
//       // if there is no video, create a video and add it to the dom
//       if (!video){
//         video = document.createElement('iframe')
//         video.src = obj.url
//         document.querySelector('div').appendChild(video)
//       } else {
//         // if there is already a video, replace it with the new one
//         video.src = obj.url
//       }
//     }  
//   }
  
//     function dateValidation (date) {
//     let userDate = new Date(date)
//     let todaysDate = new Date()
//     if (userDate > todaysDate) {
//       return false
//     } else {
//       return true
//     }
//   }

// }

// window.addEventListener('load', init)