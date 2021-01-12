import React, { useState, useEffect, useRef } from 'react';
import './animatedSlides.css';
import PropTypes from 'prop-types';
import { css, jsx, keyframes } from '@emotion/react';
import styled from 'styled-components';
import useWindowDimensions from "./windowDimensionsHook.js";


export const AnimatedSlides = ({ images, userConfig, children }) => {

  const { width, height } = useWindowDimensions();

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
    heightNumForCalc: parseInt(userConfig.imgHeight.replace(/([a-z]|[A-Z]|[%])/g, ""))
  }

  function calculateMargin() {
    let fiftyPercent = width / 2;
    let halfImg = applyConfig.widthNumForCalc < fiftyPercent ? applyConfig.widthNumForCalc / 2 : fiftyPercent / 2;
    let onePercent = width / 100;
    return fiftyPercent + halfImg + onePercent;

  }

  calculateMargin()



  //margin-left: calc(((100vw /2) - ${applyConfig.imgWidth}) + (100vw / 100)*2 + ${applyConfig.imgWidth});
  var anim = keyframes`
    50% { 
      max-width: calc((100vw / 100) * 22);
      width: calc(${applyConfig.imgWidth} / 2.5);
      max-height: calc(${applyConfig.imgHeight} / 2.5);
      height: calc((${applyConfig.heightNumForCalc} / 100) *22)px;
      transform: perspective(600px) rotateY(10deg); 
      margin-left: ${calculateMargin()}px;
      opacity: 1;
      }
      100%{
        max-width: calc((100vw / 100) * 22);
        width: calc(${applyConfig.imgWidth} / 2.5);
      max-height: calc(${applyConfig.imgHeight} / 2.5);
      height: calc((${applyConfig.heightNumForCalc} / 100) *22)px;
      transform: perspective(600px) rotateY(10deg); 
      margin-left:  ${calculateMargin()}px;
      opacity: 1;
      }
  `

  var middleAniRight = {
    animation: `${anim} 0.5s linear 1 forwards`,
  };

  // var ani = keyframes`
  //   70% {max-height: calc(${applyConfig.imgWidth / 2.5}); height: calc((${applyConfig.heightNumForCalc} / 100)*22)px; width: calc(${applyConfig.imgWidth} / 2.5); max-width: 22%; transform: perspective(600px) rotateY(10deg); margin-left: calc(2% + ${applyConfig.imgWidth / 2.5});}
  // `

  const [animateRight, setanimateRight] = useState(0);
  const [animateLeft, setanimateLeft] = useState(0);
  const [currentNum, setCurrentNum] = useState(Math.round(images.length / 2));

  useEffect(() => {
    console.log(animateRight)
    console.log(animateLeft)
  }, [animateLeft, animateRight])

  // Emmpty Array tp push dot span elements to;
  const dots = [];
  // Create Span elements for the dots cal
  for (const [index, dot] of images.entries()) {
    dots.push(
      <span
        key={index}
        onClick={() => { setCurrentNum(index) }}
        className="dot"
        style={index === currentNum ? { backgroundColor: `${applyConfig.dotHighlightColor}` } : { backgroundColor: `${applyConfig.dotBgColor}` }}
      >
      </span>
    );
  };

  return (

    <div
      css={css`
          width: 100%;
          height: ${applyConfig.containerHeight};
        `}
    >
      <div
        className="imgs_container"
        style={{ height: `${applyConfig.containerHeight}` }}>
        <img
          src={currentNum === 0 ? images[images.length - 1].img.default : images[currentNum - 1].img.default}
          css={css`
            width: calc(${applyConfig.imgWidth} / 2.5);
            max-height: calc(${applyConfig.imgHeight} / 2.5);
            height: calc((${applyConfig.heightNumForCalc} / 100)*22)px;
            max-width: 100%;
            z-index:0;
            grid-column: 1/2;
            transform: perspective(600px) rotateY(-10deg);
            align-self: center;
            justify-self:flex-end;
            margin-right:2%;
            transition: 0.2s ease-in-out;
            filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
              drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
              drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
              drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
              drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
              drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
              &:hover{
                cursor:pointer;
                transition: 0.2s ease-in-out;
                transform: perspective(600px) rotateY(-10deg) scale(1.05);
              }
          `}
        />

        <img
          src={images[currentNum].img.default}
          onClick={() => setanimateRight(1)}

          className={animateRight === 1 ? middleAniRight : { color: "red" }}
          ani={animateRight}
          css={css`
                grid-column: 2/3;
                object-fit: cover;
                width:calc(${applyConfig.imgWidth}/2.5);
                max-height: ${applyConfig.imgHeight};
                max-width: 100%;
                justify-self:center;
                align-self:center;
                postition:absolute;
                animation: ${anim} 0.5s linear 1 forwards;
                height:calc((${applyConfig.heightNumForCalc} / 100) * 50)px;
                filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
                z-index: 3000;
                transition: 0.2s linear;
                
                &:hover{
                  transition: 0.2s linear;
                  transform: scale(1.02);
                  filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                      drop-shadow(0 2px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor}) 
                      drop-shadow(0 4px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                      drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                      drop-shadow(0 8px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                      drop-shadow(0 20px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                      drop-shadow(0 32px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                      drop-shadow(0 32px ${applyConfig.maxShadowBlur / 1}px ${applyConfig.shadowColor});
                      z-index: 3001;
                }
            `}
        />
        <img
          src={currentNum === images.length - 1 ? images[0].img.default : images[currentNum + 1].img.default}

          css={css`
              grid-column: 3/4;
              max-width: 100%;
              width: calc(${applyConfig.imgWidth} / 2.5);
              max-height: calc(${applyConfig.imgHeight} / 2.5);
              height: calc((${applyConfig.heightNumForCalc} / 100)*22)px;
              z-index: 1;
              transform: perspective(600px) rotateY(10deg);
              align-self: center;
              justify-self: flex-start;
              margin-left:2%;
              transition: 0.2s ease-in-out;
              filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
              &:hover{
                cursor:pointer;
                transition: 0.2s ease-in-out;
                transform: perspective(600px) rotateY(10deg) scale(1.05);
              }
            `}
        />
      </div>
      <div css={css`
        margin-top: 100px;
      `}>
        {dots}
      </div>
    </div>
  )
}