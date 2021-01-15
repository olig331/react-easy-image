import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import useWindowDimensions from "./windowDimensionsHook.js";
import './animatedSlides.css';
import './chevrons.css';
import './slides.css';
import './chevrons.css';
import './stack.css';
import './chevrons.css';
import './tile.css'

export const Tile = ({ children, config }) => {

   let applyConfig = {
      traction: config.traction ?? 17,
      shadowColor: config.shadowColor ?? "rgba(0,0,0,0.07)",
      maxShadowBlur: config.maxShadowBlur ?? 64,
      width: config.width,
      height: config.height,
      scale: config.scale ?? 1.1
   }

   // XCoord, YCoord, Scale 
   const [xys, set] = useState({
      x: 0,
      y: 0,
      s: 1
   })

   const requestRef = React.useRef();

   // Calculate the amount of flex on perspective from xys 
   const calc = (x, y) => {
      let vals = [-(y - window.innerHeight / 2) / applyConfig.traction, (x - window.innerWidth / 2) / applyConfig.traction, applyConfig.scale];
      set({ x: vals[0], y: vals[1], s: vals[2] })
   }

   React.useEffect(() => {
      requestRef.current = requestAnimationFrame(calc);
      return () => cancelAnimationFrame(requestRef.current);
   }, [])


   return (
      <div
         className="tile_img_other"
         onMouseMove={({ clientX: x, clientY: y }) => (calc(x, y))}
         onMouseLeave={() => set({ x: 0, y: 0, s: 1 })}
         css={css`
               max-height: ${applyConfig.height};
               max-width: ${applyConfig.width};
               filter: drop-shadow(0 1px 2px ${config.shadowColor}) 
                        drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                        drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                        drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                        drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                        drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
               display:flex;
               justify-content: center;
               align-items: center;
               position: relative;
               transform: rotate(0.02deg);
               transform: perspective(600px) rotate(0.02deg) rotateX(${xys.x}deg) rotateY(${xys.y}deg) scale(${xys.s}); 
               transition: 0.15s linear;
                  img:nth-of-type(1){
                     width: ${applyConfig.width};
                     height: ${applyConfig.height};
                  }
                  &:hover{
                     transition: 0.15s linear;
                     filter: drop-shadow(0 1px 2px ${config.shadowColor}) 
                        drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                        drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                        drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                        drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                        drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
                  }  
            `}
      >
         {children}
      </div>
   )
}

Tile.propTypes = {
   config: PropTypes.shape({
      shadowColor: PropTypes.string,
      maxShadowBlur: PropTypes.number,
      traction: PropTypes.number,
      width: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      scale: PropTypes.number
   }).isRequired
}


export const Stack = ({ images, userConfig }) => {

   const applyConfig = {
      containerWidth: userConfig.containerWidth,
      containerHeight: userConfig.containerHeight,
      imgWidth: userConfig.imgWidth,
      imgHeight: userConfig.imgHeight,
      dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
      dotBgColor: userConfig.dotBgColor ?? "#777",
      shadowColor: userConfig.shadowColor ?? "rgba(100, 100, 100, 0.07)",
      buttonColor: userConfig.buttonColor ?? "#333",
      buttonType: userConfig.buttonType ?? 1,
      border: userConfig.border ?? "none",
      allowDots: userConfig.allowDots ?? true,
      chevronStyle: userConfig.chevronStyle ?? 1,
      chevronScale: userConfig.chevronScale ?? 1,
      chevronHoverColor: userConfig.chevronHoverColor ?? "black",
      chevronColor: userConfig.chevronColor ?? "black",
      allowChevrons: userConfig.allowChevrons ?? false
   }

   // Index of the image on top relative to the array of images
   const [currentNum, setCurrentNum] = useState(images.length)

   // A Circle representing the number of images
   //the current image dot will be highlighed
   const dots = [];

   // Create Span elements for the dots 
   for (const [index, dot] of images.entries()) {
      dots.push(
         <span
            key={index}
            onClick={() => { setCurrentNum(index) }}
            className="dot"
            style={index + 1 === currentNum
               ? { backgroundColor: `${applyConfig.dotHighlightColor}` }
               : { backgroundColor: `${applyConfig.dotBgColor}` }
            }>
         </span>
      );
   };

   return (
      <div
         className="container_div"
         css={css`
            box-sizing: border-box;
            width: calc(${applyConfig.containerWidth});
            height: calc(${applyConfig.containerHeight});
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin: 0 auto;
            perspective: 100px;
            transform: rotate(0.02deg) translateY(20px);
            border: ${applyConfig.border};`
         }
      >
         {images.map((x, i) => (
            <img
               key={i}
               src={x.default}
               onClick={() => currentNum > 0 ? setCurrentNum(prev => prev - 1) : setCurrentNum(images.length - 1)}
               css={css`
                  width: ${applyConfig.imgWidth};
                  height: ${applyConfig.imgHeight}; 
                  postition:absolute;
                  left:50%;
                  top:50%;
                  transform: translate(-50%, -50%) scale(1);
                  &:hover{
                     transition: 0.2s linear;
                     cursor:pointer;
                     transform: translate(-50%, -50%) scale(1.5);
                  }
               `}
               className={i < currentNum
                  ? `stack_img ${i} `
                  : i % 2
                     ? `stack_img ${i} displayNoneLeft`
                     : `stack_img ${i} displayNoneRight`
               } />
         ))}

         { applyConfig.allowDots
            ? { dots }
            : ""
         }
         {currentNum > 1 && applyConfig.allowChevrons
            ? (
               <div
                  className={`chevron-left${applyConfig.chevronStyle}`}
                  onClick={() => setCurrentNum(prev => prev - 1)}
                  css={css`
                     position: absolute;
                     left: 0;
                     top: 50%;
                     transform: translate(0%, -50%) scale(${applyConfig.chevronScale});
                     opacity: 1;
                     background-color: transparent;
                     transition: 0.2s linear;
                     color: ${applyConfig.chevronColor};
                     &:hover{
                        color: ${applyConfig.chevronHoverColor}
                        transition: 0.15s linear;
                        margin-left: -5px;
                        cursor:pointer;
                     }
                  `}
               >
               </div>
            )
            : ""
         }

         {currentNum < images.length && applyConfig.allowChevrons
            ? (
               <div
                  onClick={() => setCurrentNum(prev => prev + 1)}
                  className={`chevron-right${applyConfig.chevronStyle}`}
                  css={css`
                     position: absolute;
                     right: 0;
                     top: 50%;
                     background-color: transparent;
                     transform: translate(-0%, -50%) scale(${applyConfig.chevronScale});
                     opacity: 1;
                     transition: 0.2s linear;
                     color: ${applyConfig.chevronColor};
                     &:hover{
                        color: ${applyConfig.chevronHoverColor}
                        transition: 0.15s linear;
                        margin-right: 5px;
                        cursor:pointer;
                     }
                  `}
               >
               </div>
            )
            : ""
         }
      </div >
   )
}

const requiredPropsCheck = (props, propName, componentName) => {
   if (!props.maxImgHeight || !props.maxImgWidth) {
      return new Error(
         `Both maxImgHeight and maxImgWidth props in the ${componentName} component must be assigned a relavent CSS Value(px, em, rem, % etc...) please apply the value as a string EG maxImgWidth = "200px"`);
   };
};


Stack.propTypes = {
   userConfig: PropTypes.shape({
      imgHeight: requiredPropsCheck.isRequired,
      imgWidth: requiredPropsCheck.isRequired,
      border: PropTypes.string,
      containerWidth: PropTypes.string.isRequired,
      containerHeight: PropTypes.string.isRequired,
      dotHighlightColor: PropTypes.string,
      dotBgColor: PropTypes.string,
      shadowColor: PropTypes.string,
      buttonColor: PropTypes.string,
      buttonType: PropTypes.number,
      allowDots: PropTypes.bool,
      chevronColor: PropTypes.string,
      chevronHoverColor: PropTypes.string,
      chevronScale: PropTypes.number,
      chevronStyle: PropTypes.number,
      allowChevrons: PropTypes.bool
   }).isRequired
}



export const SimpleSlides = ({ images, userConfig, children }) => {

   const applyConfig = {
      containerWidth: userConfig.containerWidth,
      containerHeight: userConfig.containerHeight,
      imgWidth: userConfig.imgWidth,
      maxImgHeight: userConfig.imgHeight,
      maxShadowBlur: userConfig.maxShadowBlur ?? 64,
      shadowColor: userConfig.shadowColor ?? "rgba(0,0,0, 0.5)",
      capFontSize: userConfig.capFontSize ?? "14px",
      capColor: userConfig.capColor ?? "whitesmoke",
      capBgColor: userConfig.capBgColor ?? "rgba(0,0,0,0.87)",
      chevronStyle: userConfig.chevronStyle ?? 1,
      chevronScale: userConfig.chevronScale ?? 1,
      chevronHoverColor: userConfig.chevronHoverColor ?? "black",
      chevronColor: userConfig.chevronColor ?? "black",
      dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
      dotBgColor: userConfig.dotBgColor ?? "#888",
      allowDots: userConfig.allowDots ?? true,
   }

   const dots = [];

   const [numOfImages, setnumOfImages] = useState(images.length);
   const [currentImgage, setcurrentImage] = useState(Math.round(images.length / 2));

   for (const [index, dot] of images.entries()) {
      dots.push(
         <span
            key={index}
            onClick={() => setcurrentImage(index + 1)}
            className="dot"
            style={index + 1 === currentImgage
               ? { backgroundColor: `${applyConfig.dotHighlightColor}` }
               : { backgroundColor: `${applyConfig.dotBgColor}` }
            }>
         </span>
      );
   };

   return (
      <div
         className="simple_slide_con"
         css={css`
            position: relative;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            width: ${applyConfig.containerWidth};
            height: ${applyConfig.containerHeight};
            &:hover{
               .chevron-right${applyConfig.chevronStyle}{
                  opacity: 1;
               }
               .chevron-left${applyConfig.chevronStyle}{
                  opacity: 1;
               }
            }`
         }>
         {images.map((object, index) => (
            <div key={index}
               title={object.cap}
               className="slide_img_con"
               style={index + 1 === currentImgage ? { display: "block" } : { display: "none" }}
               css={css`
                  transition: 0.25s linear;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                        drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                        drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                        drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                        drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                        drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
                  &::after{
                     content: attr(title);
                     opacity: 0;
                     position: absolute;
                     top: 50%;
                     left: 50%;
                     background-color: ${applyConfig.capBgColor};
                     padding: 5px 10px;
                     border-radius: 5px;
                     font-size: ${applyConfig.capFontSize};
                     color: ${applyConfig.capColor};
                     transform: translate(-50%, -50%);
                     transition: 0.25s linear;
                  }
                     &:hover::after{
                        transition: 0.25s linear;
                        opacity: 1;
                     }
                  `}
            >
               <img
                  src={object.img.default}
                  css={css`
                     transition: 0.25s linear;
                     width:${applyConfig.imgWidth};
                     height:${applyConfig.imgHeight};
                  `}
               />

               {/* <h4 css={css`text-align:center; color: ${applyConfig.capColor}`}>{object.cap}</h4> */}
            </div>
         ))}

         { applyConfig.allowDots ? (<div css={css`display:inline-flex`}>{dots}</div>) : ""}
         <div
            className={`chevron-right${applyConfig.chevronStyle}`}
            onClick={() =>
               setcurrentImage(
                  (prevState) => prevState < images.length
                     ? prevState + 1
                     : prevState)
            }
            css={css`
               position: absolute;
               right:2%;
               top: 50%;
               transform :translate(-2%, -50%) scale(${applyConfig.chevronScale});
               opacity: 0;
               transition: 0.2s linear;
               color: ${applyConfig.chevronColor};
               &:hover{
                  color: ${applyConfig.chevronHoverColor}
                  transition: 0.15s linear;
                  margin-right: -5px;
                  cursor:pointer;
               }
            `}
         >
         </div>

         <div
            className={`chevron-left${applyConfig.chevronStyle}`}
            onClick={() =>
               setcurrentImage(
                  (prevState) => prevState > 1
                     ? prevState - 1
                     : prevState)
            }
            css={css`
               position: absolute;
               left:2%;
               top: 50%;
               transform :translate(-2%, -50%) scale(${applyConfig.chevronScale});
               opacity: 0;
               transition: 0.2s linear;
               color: ${applyConfig.chevronColor};
               &:hover{
                  color: ${applyConfig.chevronHoverColor}
                  transition: 0.15s linear;
                  margin-left: -5px;
                  cursor:pointer;
               }
            `}
         >
         </div>
      </div>
   )
}

SimpleSlides.propTypes = {
   userConfig: PropTypes.shape({
      containerWidth: PropTypes.string.isRequired,
      containerHeight: PropTypes.string.isRequired,
      imgHeight: PropTypes.string.isRequired,
      imgWidth: PropTypes.string.isRequired,
      maxShadowBlur: PropTypes.number,
      shadowColor: PropTypes.string,
      capFontSize: PropTypes.string,
      capColor: PropTypes.string,
      chevronStyle: PropTypes.number,
      chevronScale: PropTypes.number,
      chevronHoverColor: PropTypes.string,
      chevronColor: PropTypes.string,
      capBgColor: PropTypes.string,
      dotHighlightColor: PropTypes.string,
      dotBgColor: PropTypes.string,
      allowDots: PropTypes.bool,
   }).isRequired
}


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