import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import useWindowDimensions from "./windowDimensionsHook.js";
import './animatedSlides.css';
import '../chevrons.css';

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
      shadows: userConfig.shadows ?? true,
      widthNumForCalc: parseInt(userConfig.imgWidth.replace(/([a-z]|[A-Z]|[%])/g, "")),
      heightNumForCalc: parseInt(userConfig.imgHeight.replace(/([a-z]|[A-Z]|[%])/g, "")),
      rotateTime: userConfig.rotateTime ?? 350
   };

   // React State 
   const [indexes, setindexes] = useState([2, 3, 4]);
   const [currentNumber, setcurrentNumber] = useState(() => Math.round(images.length / 2))
   const [iteration, setiteration] = useState(0);
   const [mainImgDimensions, setmainImgDimension] = useState(0);
   const [calculatedContainerHeight, setcalculatedContainerHeight] = useState(0);

   // Perform once on first render for img scaling 
   useEffect(() => {
      let mainImgWidth = Math.round((width / 100) * 44).toString() + "px";
      let height = width > 1000 ? (((width / 100) * 22) + 350).toString() + "px" : ((width / 100) * 55).toString() + "px"
      setmainImgDimension(mainImgWidth);
      setcalculatedContainerHeight(height);
   }, []);

   // Perfrorm everytime the width of window changes providing 
   // Accurate dimensions for the smaller images
   useEffect(() => {
      let mainImgWidth = Math.round((width / 100) * 44).toString() + "px";
      let height = width > 1000 ? (((width / 100) * 22) + 350).toString() + "px" : ((width / 100) * 55).toString() + "px"
      setmainImgDimension(mainImgWidth);
      setcalculatedContainerHeight(height);
   }, [width])

   // Left Hand Image stlying class
   const leftSide = {
      transition: `${applyConfig.rotateTime}ms ease-in-out`,
      position: "absolute",
      top: "50%",
      left: width < 2415 ? "8%" : "10%",
      transform: width < 2415 ? "translate(-8%, -50%) perspective(600px) rotateY(-10deg)" : "translate(-10%, -50%) perspective(600px) rotateY(-10deg)",
      maxWidth: `calc(${applyConfig.imgWidth} / 2.5)`,
      width: `calc(${mainImgDimensions} / 2.5)`,
      height: `calc((${applyConfig.heightNumForCalc} / 100)*22)px`,
      maxHeight: `calc(${applyConfig.imgHeight} / 2)`,
      zIndex: "1",
      display: "block"
   }

   // Middle image styling class
   const middle = {
      transition: `${applyConfig.rotateTime}ms ease-in-out`,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) perspective(0px) rotateY(0deg)",
      maxWidth: `${applyConfig.imgWidth}`,
      width: "44%",
      height: `calc((${applyConfig.heightNumForCalc} / 100)*22)px`,
      maxHeight: `${applyConfig.imgHeight}`,
      zIndex: "25",
   }

   // Right side image styling class
   const rightSide = {
      transition: `${applyConfig.rotateTime}ms ease-in-out`,
      position: "absolute",
      left: width < 2415 ? "92%" : "90%",
      top: "50%",
      transform: width < 2415 ? "translate(-92%, -50%) perspective(600px) rotateY(10deg)" : "translate(-90%, -50%) perspective(600px) rotateY(10deg)",
      maxWidth: `calc(${applyConfig.imgWidth} / 2.5)`,
      width: `calc(${mainImgDimensions} / 2.5)`,
      height: `calc((${applyConfig.heightNumForCalc} / 100)*22)px`,
      maxHeight: `calc(${applyConfig.imgHeight} / 2)`,
      zIndex: "1",
   }

   // Clicking on representive image dots will change the images 
   const calculateNewIndexes = (index) => {
      let arr = new Array(3);
      arr[0] = index == 0 ? images.length - 1 : index - 1;
      arr[1] = index;
      arr[2] = index == images.length - 1 ? 0 : index + 1;
      return arr;
   }

   // Emmpty Array tp push dot span elements to;
   const dots = [];

   // Create Span elements for the dots cal
   for (const [index, dot] of images.entries()) {
      dots.push(
         <span
            key={index}
            onClick={() => { setcurrentNumber(index); setindexes(calculateNewIndexes(index)) }}
            className="dot"
            style={index === currentNumber
               ? { backgroundColor: `${applyConfig.dotHighlightColor}` }
               : { backgroundColor: `${applyConfig.dotBgColor}` }
            }>
         </span>
      );
   };

   const rotateBack = () => {
      caroselLogic.left_button_press();
      setiteration(prev => prev === 2 ? 0 : prev + 1);
      setcurrentNumber(prev => prev === 0 ? images.length - 1 : prev - 1)
   }

   const rotateForward = () => {
      caroselLogic.right_button_press();
      setiteration(prev => prev === 0 ? 2 : prev - 1);
      setcurrentNumber(prev => prev === images.length - 1 ? 0 : prev + 1)
   }

   const caroselLogic = {

      offset_index: function (image_index, offset) {
         console.log((image_index + offset) + images.length) % images.length
         return ((image_index + offset) + images.length) % images.length
      },

      right_button_press: function () {
         let arr = [...indexes];
         let numToPush = arr[0];
         numToPush = this.offset_index(arr[arr.length - 1], 1)
         arr.shift();
         arr.push(numToPush)
         setindexes(arr);
      },

      left_button_press: function () {
         let arr = [...indexes];
         let numtoShift = arr[2];
         numtoShift = this.offset_index(arr[0], -1);
         arr.pop()
         arr.unshift(numtoShift)
         setindexes(arr)
      }
   };

   return (
      <div css={css`width: 100%; height: ${applyConfig.containerHeight};`}>
         <div
            className="imgs_container"
            style={{ height: `${calculatedContainerHeight}` }}>

            {/* Left Side Img */}
            <img
               src={
                  iteration == 0
                     ? images[indexes[0]].img.default
                     : iteration == 1
                        ? images[indexes[1]].img.default
                        : images[indexes[2]].img.default
               }
               className={iteration !== 1 ? "hoverImg" : ""}
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
               onClick={() => {
                  iteration === 0
                     ? rotateBack()
                     : iteration === 2
                        ? rotateForward()
                        : null
               }}
            />

            {/* Middle Image */}
            <img
               src={
                  iteration == 0
                     ? images[indexes[1]].img.default
                     : iteration === 1
                        ? images[indexes[2]].img.default
                        : images[indexes[0]].img.default
               }
               className={iteration !== 0 ? "hoverImg" : ""}
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
               onClick={() => {
                  iteration === 1
                     ? rotateForward()
                     : iteration === 2
                        ? rotateBack()
                        : null
               }}
            />

            {/* Right Side Imgage */}
            <img
               src={
                  iteration == 0
                     ? images[indexes[2]].img.default
                     : iteration == 1
                        ? images[indexes[0]].img.default
                        : images[indexes[1]].img.default
               }
               className={iteration !== 2 ? "hoverImg" : ""}
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
               onClick={() => {
                  iteration === 0
                     ? rotateForward()
                     : iteration === 1
                        ? rotateBack()
                        : null
               }}
            />

            <div
               css={css`
                  position:absolute;
                  top: 99%;
                  left: 50%;
                  transform: translate(-50%, -99%);
                  `}>
               {dots}
            </div>

         </div>
      </div>
   )
}

AnimatedSlides.propTypes = {
   userConfig: PropTypes.shape({
      containerWidth: PropTypes.string,
      containerHeight: PropTypes.string,
      imgWidth: PropTypes.string,
      imgHeight: PropTypes.string,
      dotHighlightColor: PropTypes.string,
      dotBgColor: PropTypes.string,
      maxShadowBlur: PropTypes.number,
      shadowColor: PropTypes.string,
      shadows: PropTypes.bool,
      rotateTime: PropTypes.number
   })
}