import '../scss/main.scss';
import loadGif from './loadGif';

const loadHandler = () => {
  loadGif();
}

if (document.readyState === 'complete') {
   loadHandler();
} else {
  document.addEventListener('readystatechange', ()=> {
    if (document.readyState === 'complete') {
      loadHandler();
    }
  })
}




// jQuery request

// $.ajax({url: "http://api.giphy.com/v1/gifs/random?q=amazing&api_key=q7TSsbKeyuScTAoDpnpdJUbGIhpIeO4o&limit=5"}).done(function(){console.log('done');});
// $.ajax({
//     url: "http://api.giphy.com/v1/gifs/random?q=amazing&api_key=q7TSsbKeyuScTAoDpnpdJUbGIhpIeO4o&limit=5",
//     success: function(result) {
//         console.log('success', data);
//       var data = result.data;
//       console.log("DATA", data);
//       var output = "";
//       var gifURL = data.images.original.url
//       output += "<img src='"+gifURL+"'/>";
      
//       $("#mono").html(output);
//     },
//     error: function(error) {
//       console.log(error);
//     }
//   });
  
  