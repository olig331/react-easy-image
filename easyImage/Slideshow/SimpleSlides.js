import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import './slides.css';
import '../chevrons.css';

export const SimpleSlides = ({ images, userConfig, children }) => {

   let appliedImages = [];

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
         {appliedImages.map((object, index) => (
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
                  src={object.img}
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