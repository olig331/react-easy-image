import React, { useState, useEffect, useRef } from 'react';
import './animatedSlides.css';
import PropTypes, { number } from 'prop-types';
import { css, jsx, keyframes } from '@emotion/react';
import useWindowDimensions from "./windowDimensionsHook.js";



export const AnimatedSlides = ({ images, userConfig, children }) => {

   // Imported Custom Hook for screen width and height;
   const { width, height } = useWindowDimensions();

   // Configuration Settings
   const applyConfig = {
      containerWidth: userConfig.containerWidth,
      containerHeight: userConfig.containerHeight,
      imgWidth: userConfig.imgWidth,
      imgHeight: userConfig.imgHeight,
      dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
      dotBgColor: userConfig.dotBgColor ?? "#777",
      maxShadowBlur: userConfig.maxShadowBlur ?? 54,
      shadowColor: userConfig.shadowColor ?? "rgba(0,0,0, 0.19)",
      widthNumForCalc: parseInt(userConfig.imgWidth.replace(/([a-z]|[A-Z]|[%])/g, "")),
      heightNumForCalc: parseInt(userConfig.imgHeight.replace(/([a-z]|[A-Z]|[%])/g, "")),
      rotateTime: userConfig.rotateTime ?? 350
   };


   // React State 
   const [iteration, setiteration] = useState(0);
   const [animateRight, setanimateRight] = useState(0);
   const [animateLeft, setanimateLeft] = useState(0);
   const [currentNum, setCurrentNum] = useState(Math.round(images.length / 2));

   // Styling for the Left side image
   const leftSide = {
      transition: `${applyConfig.rotateTime}ms ease-in-out`,
      position: "absolute",
      top: "50%",
      left: width < 2415 ? "8%" : "16%",
      transform: width < 2415 ? "translate(-8%, -50%) perspective(600px) rotateY(-10deg)" : "translate(-16%, -50%) perspective(600px) rotateY(-10deg)",
      maxWidth: `calc(${applyConfig.imgWidth} / 2.5)`,
      width: "20%",
      height: `calc((${applyConfig.heightNumForCalc} / 100)*22)px`,
      maxHeight: `calc(${applyConfig.imgHeight} / 2)`,
      zIndex: "1",
      display: "block"
   }

   // Styling for the middle image
   const middle = {
      transition: `${applyConfig.rotateTime}ms ease-in-out`,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) perspective(0px) rotateY(0deg)",
      width: `${applyConfig.imgWidth}`,
      maxWidth: "45%",
      height: `calc((${applyConfig.heightNumForCalc} / 100)*22)px`,
      maxHeight: `${applyConfig.imgHeight}`,
      zIndex: "25",
   }

   // Syling for the right side image
   const rightSide = {
      transition: `${applyConfig.rotateTime}ms ease-in-out`,
      position: "absolute",
      left: width < 2415 ? "92%" : "84%",
      top: "50%",
      transform: width < 2415 ? "translate(-92%, -50%) perspective(600px) rotateY(10deg)" : "translate(-84%, -50%) perspective(600px) rotateY(10deg)",
      maxWidth: `calc(${applyConfig.imgWidth} / 2.5)`,
      width: "20%",
      height: `calc((${applyConfig.heightNumForCalc} / 100)*22)px`,
      maxHeight: `calc(${applyConfig.imgHeight} / 2)`,
      zIndex: "1",
   }


   // Emmpty Array tp push dot span elements to;
   const dots = [];
   // Create Span elements for the dots cal
   for (const [index, dot] of images.entries()) {
      dots.push(
         <span
            key={index}
            onClick={() => { setCurrentNum(index) }}
            className="dot"
            style={index === currentNum ? { backgroundColor: `${applyConfig.dotHighlightColor}` } : { backgroundColor: `${applyConfig.dotBgColor}` }}>
         </span>
      );
   };

   return (
      <div css={css`width: 100%; height: ${applyConfig.containerHeight};`}>
         <div
            className="imgs_container"
            style={{ height: `${applyConfig.containerHeight}` }}>

            {/* Left Side Img */}
            <img
               src={currentNum === 0 ? images[images.length - 1].img.default : images[currentNum - 1].img.default}
               css={css`filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                           drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                           drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                           drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                           drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                           drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});`}
               style={
                  iteration == 0
                     ? leftSide
                     : iteration == 1
                        ? middle
                        : iteration == 2
                           ? rightSide
                           : { color: "white" }}
            />

            {/* Middle Image */}
            <img
               src={images[currentNum].img.default}
               onClick={() => setanimateRight(1)}
               ani={animateRight}
               css={css`filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                            drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                            drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                            drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                            drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                            drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor})`}
               style={
                  iteration === 0
                     ? middle
                     : iteration == 1
                        ? rightSide
                        : iteration == 2
                           ? leftSide
                           : { color: "white" }}
            />

            {/* Right Side Imgage */}
            <img
               src={currentNum === images.length - 1 ? images[0].img.default : images[currentNum + 1].img.default}
               css={css`filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                            drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                            drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                            drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                            drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                            drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor})`}
               style={
                  iteration == 0
                     ? rightSide
                     : iteration == 1
                        ? leftSide
                        : iteration == 2
                           ? middle
                           : { color: "white" }}
            />
            <div
               css={css`
                  position:absolute;
                  top: 90%;
                  left: 50%;
                  transform: translate(-50%, -90%);
                  `}>
               {dots}
            </div>

         </div>
         <button onClick={() => setiteration(prev => prev === 2 ? 0 : prev + 1)}>Rotate Right</button>
         <button onClick={() => setiteration(prev => prev === 0 ? 2 : prev - 1)}>Rotate Left</button>
      </div>
   )
}