import React from 'react';
import ReactDOM from 'react-dom';
import { Stack } from '../easyImage/Stack/Stack';
import { AnimatedSlides } from '../easyImage/AnimatedSlides/AnimatedSlides';
import { SimpleSlides } from '../easyImage/Slideshow/SimpleSlides'
import { Tile } from 'react-easy-img';
import './app.css';
import card from './imgs/cards/AD.png'



const App = () => {

   const slideArr = [
      { img: require("./imgs/aniSlides/image7.jpg"), cap: "img" },
      { img: require("./imgs/aniSlides/image6.jpg"), cap: "testing font familys" },
      { img: require('./imgs/aniSlides/image1.jpg'), cap: "" }
   ];

   const slideConfig = {
      containerWidth: "960px",
      containerHeight: "730px",
      imgWidth: "960px",
      imgHeight: "640px",
      shadowColor: "rgba(0,0,0,0.09)",
      capFontSize: "22px",
      capBgColor: "rgba(220,220,220, 0.89)",
      capColor: "#555",
      allowDots: true,
      chevronStyle: 2,
      chevronScale: 1.6,
      chevronColor: "whitesmoke",
      chevronHoverColor: "black",
      borderRadius: "10px"
   }

   const tileConfig = {
      width: "250px",
      height: "400px",
      shadowColor: "rgba(150, 0, 0, 0.08)",
      maxShadowBlur: 120,
      traction: 17,
      scale: 1.1
   }

   const stackConfig = {
      imgWidth: "250px",
      imgHeight: "400px",
      containerWidth: "470px",
      containerHeight: "600px",
      dotBgColor: "#888",
      dotHighlightColor: "violet",
      allowDots: false,
      allowChevrons: true,
   }

   const importAll = (r) => {
      console.log(r)
      return r.keys().map(r);
   };
   let images = importAll(
      require.context("./imgs/cards", false, /\.(png|jpe?g|svg)$/)
   );

   const stackImagesReq = [
      require('./imgs/aniSlides/image1.jpg'),
      require('./imgs/aniSlides/image2.jpg'),
      require('./imgs/aniSlides/image3.jpg'),
      require('./imgs/aniSlides/image4.jpg'),
      require('./imgs/aniSlides/image5.jpg')
   ];

   const aniSlidesConfig = {
      containerWidth: "100%",
      containerHeight: "1000px",
      imgWidth: "2000ppx",
      imgHeight: "1250px",
      dotBgColor: "slategray",
      dotHighlightColor: "slateblue",
      borderRadius: "8px"
   }

   const aniImages = [
      { img: require('./imgs/aniSlides/image1.jpg'), cap: "image 1" },
      { img: require('./imgs/aniSlides/image2.jpg'), cap: "image 2" },
      { img: require('./imgs/aniSlides/image3.jpg'), cap: "image 3" },
      { img: require('./imgs/aniSlides/image4.jpg'), cap: "image 4" },
      { img: require('./imgs/aniSlides/image5.jpg'), cap: "image 5" },
      { img: require('./imgs/aniSlides/image6.jpg'), cap: "image 6" },
      { img: require('./imgs/aniSlides/image7.jpg'), cap: "image 7" }
   ]


   return (
      <div style={{ transform: "rotate(0.02deg)" }}>

         <div className="app">
            <Stack
               images={images}
               userConfig={stackConfig}
            />
         </div>


         <div className="tile_container">
            <Tile config={tileConfig}>
               <img src={card} />
            </Tile>
         </div>


         <div className="slide_container">
            <SimpleSlides
               images={slideArr}
               userConfig={slideConfig}
            />
         </div>


         <div className="animated_slide_container">
            <AnimatedSlides
               images={aniImages}
               userConfig={aniSlidesConfig}
            />
         </div>
      </div>

   )
}

ReactDOM.render(<App />, document.getElementById('root'));


