import '../scss/main.scss';
import loadGif from './loadGif';
import mobileTouch from './mobileTouch';

const loadHandler = () => {
  loadGif();
  mobileTouch();
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





  
  