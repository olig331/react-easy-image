import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { css } from '@emotion/react';
import './stack.css';
import '../chevrons.css';


export const Stack = ({ images, userConfig }) => {

   let appliedImages = [];

   function sortImages() {
      if (typeof (images[0]) == 'object') {
         for (let i = 0; i < images.length; i++) {
            appliedImages.push(images[i].default)
         }
      } else {
         appliedImages = [...images]
      }
   }

   sortImages()

   const applyConfig = {
      imgWidth: userConfig.imgWidth,
      imgHeight: userConfig.imgHeight,
      containerWidth: userConfig.containerWidth ?? `calc(${userConfig.imgWidth} + 150px)`,
      containerHeight: userConfig.containerHeight ?? `calc(${userConfig.imgHeight} + 150px)`,
      dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
      dotBgColor: userConfig.dotBgColor ?? "#777",
      border: userConfig.border ?? "none",
      allowDots: userConfig.allowDots ?? true,
      shadowColor: userConfig.shadowColor ?? "rgba(0,0,0, 0.05)",
      shadowHoverColor: userConfig.shadowHoverColor ?? "rgba(0,0,0, 0.25)",
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
         {appliedImages.map((x, i) => (
            <img
               className={i < currentNum
                  ? `stack_image ${i} `
                  : i % 2
                     ? `stack_image ${i} displayNoneLefty`
                     : `stack_image ${i} displayNoneRighty`
               }
               key={i}
               src={x}
               onClick={() => currentNum > 1 ? setCurrentNum(prev => prev - 1) : setCurrentNum(images.length)}
               css={css`
                  width: ${applyConfig.imgWidth};
                  height: ${applyConfig.imgHeight}; 
                  postition:absolute;
                  left:50%;
                  top:50%;
                  transform: translate(-50%, -50%) scale(1);
                  filter: drop-shadow(0 0px 1px ${applyConfig.shadowColor}) 
                     drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                     drop-shadow(0 2px 4px ${applyConfig.shadowColor})
                     drop-shadow(0 4px 8px ${applyConfig.shadowColor})
                     drop-shadow(0 8px 16px ${applyConfig.shadowColor})
                     drop-shadow(0 16px 32px ${applyConfig.shadowColor});
                  &:hover{
                     transition: 0.2s linear;
                     cursor:pointer;
                     transform: translate(-50%, -50%) scale(1.5);
                     filter: drop-shadow(0 0px 1px ${applyConfig.shadowHoverColor}) 
                     drop-shadow(0 1px 2px ${applyConfig.shadowHoverColor}) 
                     drop-shadow(0 2px 4px ${applyConfig.shadowHoverColor})
                     drop-shadow(0 4px 8px ${applyConfig.shadowHoverColor})
                     drop-shadow(0 8px 16px ${applyConfig.shadowHoverColor})
                     drop-shadow(0 16px 32px ${applyConfig.shadowHoverColor});
                     
                  }
               `}
            />
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
                        margin-right: -5px;
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
      containerWidth: PropTypes.string,
      containerHeight: PropTypes.string,
      border: PropTypes.string,
      dotHighlightColor: PropTypes.string,
      dotBgColor: PropTypes.string,
      shadowColor: PropTypes.string,
      shadowHoverColor: PropTypes.string,
      allowDots: PropTypes.bool,
      chevronColor: PropTypes.string,
      chevronHoverColor: PropTypes.string,
      chevronScale: PropTypes.number,
      chevronStyle: PropTypes.number,
      allowChevrons: PropTypes.bool
   }).isRequired
}



