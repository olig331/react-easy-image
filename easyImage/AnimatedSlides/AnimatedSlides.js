import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import useWindowDimensions from "./windowDimensionsHook.js";
import './animatedSlides.css';
import '../chevrons.css';

export const AnimatedSlides = ({ images, userConfig, children }) => {

   let appliedImages = [];

   // Function To Detirmine whether images have been imported through webpack or paths are given
   // If webpack the path strings are extracted if not use the strings as they are 
   function sortImages() {
      if (typeof (images[0].img) === 'object') {
         for (let i = 0; i < images.length; i++) {
            let copy = images[i];
            copy.img = images[i].img.default
            appliedImages.push(copy);
         }
      } else {
         appliedImages = [...images]
      }
   }
   sortImages();

   // Imported Custom Hook for screen width and height;
   const { width, height } = useWindowDimensions();

   // Configuration Settings
   const applyConfig = {
      imgWidth: userConfig.imgWidth,
      imgHeight: userConfig.imgHeight,
      dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
      dotBgColor: userConfig.dotBgColor ?? "#777",
      maxShadowBlur: userConfig.maxShadowBlur ?? 64,
      shadowColor: userConfig.shadowColor ?? "rgba(0,0,0, 0.19)",
      widthNumForCalc: parseInt(userConfig.imgWidth.replace(/([a-z]|[A-Z]|[%])/g, "")),
      heightNumForCalc: parseInt(userConfig.imgHeight.replace(/([a-z]|[A-Z]|[%])/g, "")),
      rotateTime: userConfig.rotateTime ?? 350,
      borderRadius: userConfig.borderRadius ?? "5px",
      capColor: userConfig.capColor ?? "#333",
      capBgColor: userConfig.capBgColor ?? "rgba(220,220,220, 0.89)",
      capFontSize: userConfig.capFontSize ?? "14px"
   };

   // React State 
   const [indexes, setindexes] = useState([2, 3, 4]);
   const [currentNumber, setcurrentNumber] = useState(() => Math.round(images.length / 2))
   const [iteration, setiteration] = useState(0);
   const [mainImgDimensions, setmainImgDimension] = useState(0);
   const [calculatedContainerHeight, setcalculatedContainerHeight] = useState(0);
   const [middleHoverd, setmiddleHovered] = useState(0);
   const [midheight, setmidHeight] = useState();
   const [capHeight, setcapHeight] = useState();
   const [loadTimes, setloadTimes] = useState(0);

   // Perform once on first render for img scaling 
   useEffect(() => {
      let mainImgWidth = Math.round((width / 100) * 44)
      let scale = (applyConfig.heightNumForCalc / applyConfig.widthNumForCalc);
      let height = ((mainImgWidth * scale) + (80 * scale)).toString() + "px";
      mainImgWidth = mainImgWidth.toString() + "px"
      setmainImgDimension(mainImgWidth);
      setcalculatedContainerHeight(height);
   }, []);

   // Perfrorm everytime the width of window changes providing 
   // Accurate dimensions for the smaller images
   useEffect(() => {
      let mainImgWidth = Math.round((width / 100) * 44)
      let scale = (applyConfig.heightNumForCalc / applyConfig.widthNumForCalc);
      let height = ((mainImgWidth * scale) + (200 * scale)).toString() + "px";
      mainImgWidth = mainImgWidth.toString() + "px"
      setmainImgDimension(mainImgWidth);
      setcalculatedContainerHeight(height);
      const midEl = document.getElementById("midImg");
      const capEl = document.getElementById("cap");
      setcapHeight(capEl.clientHeight / 2);
      setmidHeight(midEl.clientHeight / 2);
   }, [width])

   // Generally clientHeight is calculated before the image is rendered resulting in height being 0
   // this work around using the onLoad property to get the image height after the image has rendered for the first time
   // After the first render/refresh the above useEffect will handle the image hiehgt logic
   const handleFirstRenderImgHeight = (e) => {
      const imageHeight = e.target.clientHeight;
      setmidHeight(imageHeight / 2)
      setloadTimes((prev) => prev + 1);
   }

   const handleCaptionHeight = (e) => {
      const capHeight = e.target.clientHeight;
      setcapHeight(capHeight / 2);
   }

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
      display: "block",
      borderRadius: `${applyConfig.borderRadius}`
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
      borderRadius: `${applyConfig.borderRadius}`
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
      borderRadius: `${applyConfig.borderRadius}`
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

   // Rotate the images Right
   const rotateBack = () => {
      caroselLogic.left_button_press();
      setiteration(prev => prev === 2 ? 0 : prev + 1);
      setcurrentNumber(prev => prev === 0 ? images.length - 1 : prev - 1)
   }

   // Rotate the images left
   const rotateForward = () => {
      caroselLogic.right_button_press();
      setiteration(prev => prev === 0 ? 2 : prev - 1);
      setcurrentNumber(prev => prev === images.length - 1 ? 0 : prev + 1)
   }

   // Logic for rendering only one image to save performance 
   // and moving the images around 
   const caroselLogic = {
      offset_index: function (image_index, offset) {
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
      <div css={css`
         width: 100%; 
         maxHeight: calc(${applyConfig.imgHeight} + 80px)px;
         `}>

         <div
            className="imgs_container"
            style={{ height: `${calculatedContainerHeight}` }}
         >

            {/* Left Side Img */}
            <img
               id={iteration !== 1 ? "" : "midImg"}
               src={
                  iteration == 0
                     ? appliedImages[indexes[0]].img
                     : iteration == 1
                        ? appliedImages[indexes[1]].img
                        : appliedImages[indexes[2]].img
               }
               onMouseOver={() => iteration === 1 ? setmiddleHovered(1) : ""}
               onMouseLeave={() => iteration === 1 ? setmiddleHovered(0) : ""}
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
                        : rightSide}
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
               id={iteration !== 0 ? "" : "midImg"}
               onLoad={loadTimes < 1 ? handleFirstRenderImgHeight : ""}
               src={
                  iteration == 0
                     ? appliedImages[indexes[1]].img
                     : iteration === 1
                        ? appliedImages[indexes[2]].img
                        : appliedImages[indexes[0]].img
               }
               onMouseOver={() => iteration === 0 ? setmiddleHovered(1) : ""}
               onMouseLeave={() => iteration === 0 ? setmiddleHovered(0) : ""}
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
                        : leftSide}
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
               id={iteration !== 2 ? "" : "midImg"}
               src={
                  iteration == 0
                     ? appliedImages[indexes[2]].img
                     : iteration == 1
                        ? appliedImages[indexes[0]].img
                        : appliedImages[indexes[1]].img
               }
               onMouseOver={() => iteration === 2 ? setmiddleHovered(1) : ""}
               onMouseLeave={() => iteration === 2 ? setmiddleHovered(0) : ""}
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
                        : middle}
               onClick={() => {
                  iteration === 0
                     ? rotateForward()
                     : iteration === 1
                        ? rotateBack()
                        : null
               }}
            />

            <span
               id={"cap"}
               onLoad={handleCaptionHeight}
               className="ani_slides_caption"
               css={css`
                  position:absolute;
                  left:50%;
                  top:50%;
                  transform: translate(-50%, -50%);
                  margin-top:calc(${midheight}px - ${capHeight}px);
                  transition: 0.25s linear;
                  opacity: ${middleHoverd};
                  z-index:50000;
                  font-size: ${applyConfig.capFontSize};
                  color: ${applyConfig.capColor};
                  background-color:${applyConfig.capBgColor};
                  width: calc(${mainImgDimensions} - 7px);
                  text-align: center;
                  border-bottom-right-radius: ${applyConfig.borderRadius};
                  border-bottom-left-radius: ${applyConfig.borderRadius};
                  padding:10px 0px;
               `}
            >
               {appliedImages[currentNumber].cap}
            </span>

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
      rotateTime: PropTypes.number,
      borderRadius: PropTypes.string,
      capBgColor: PropTypes.string,
      capColor: PropTypes.string,
      capFontSize: PropTypes.string,
   })
}