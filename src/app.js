import React from 'react';
import ReactDOM from 'react-dom';
import { Stack } from '../easyImage/Stack/Stack';
import { Tile } from '../easyImage/Tile/Tile';
import { SimpleSlides } from '../easyImage/Slideshow/SimpleSlides';
import card from './imgs/cards/10H.png';
import { AnimatedSlides } from '../easyImage/AnimatedSlides/AnimatedSlides';
import './app.css';


const App = () => {


   const slideArr = [
      { img: require("./imgs/cards/2C.png"), cap: "2 of clubs" },
      { img: require("./imgs/cards/5H.png"), cap: "5 of hearts" },
      { img: require('./imgs/cards/3D.png'), cap: "3 of dimaonds" }
   ];

   const slideConfig = {
      containerWidth: "350px",
      containerHeight: "500px",
      imgWidth: "250px",
      imgHeight: "400px",
      shadowColor: "rgba(0,0,0,0.09)",
      allowDots: true
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
      width: "250px",
      height: "400px",
      dotBgColor: "#888",
      dotHighlightColor: "violet",
      shadowColor: "rgba(100, 100, 100, 0.05)",
      allowDots: false
   }

   const importAll = (r) => {
      console.log(r)
      return r.keys().map(r);
   };

   //if you get TS context error-- - npm install - D @types/webpack-env
   let images = importAll(
      require.context("./imgs/cards", true, /\.(png|jpe?g|svg)$/)
   );


   const aniSlidesConfig = {
      containerWidth: "100%",
      containerHeight: "1000px",
      imgWidth: "2000ppx",
      imgHeight: "1250px",
      dotBgColor: "slategray",
      dotHighlightColor: "slateblue"
   }

   const aniImages = [
      { img: require('./imgs/aniSlides/image1.jpg'), cap: "" },
      { img: require('./imgs/aniSlides/image2.jpg'), cap: "" },
      { img: require('./imgs/aniSlides/image3.jpg'), cap: "" },
      { img: require('./imgs/aniSlides/image4.jpg'), cap: "" },
      { img: require('./imgs/aniSlides/image5.jpg'), cap: "" }
   ]

   return (
      <div style={{ transform: "rotate(0.02deg)" }}>

         <div className="app">
            <Stack
               images={images}
               maxImgWidth="470px"
               maxImgHeight="600px"
               userConfig={stackConfig}
            />
         </div>

         <div className="tile_container">

            <Tile config={tileConfig}>
               <img src={card} />
            </Tile>

         </div>

         <div className="slide_container">
            <SimpleSlides images={slideArr} userConfig={slideConfig} />
         </div>

         <div className="animated_slide_container">
            <AnimatedSlides images={aniImages} userConfig={aniSlidesConfig} />
         </div>
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'));


