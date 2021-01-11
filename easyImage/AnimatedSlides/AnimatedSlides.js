import React, { useState } from 'react';
import './animatedSlides.css';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

export const AnimatedSlides = ({ images, userConfig, children }) => {

  const applyConfig = {
    containerWidth: userConfig.containerWidth,
    containerHeight: userConfig.containerHeight,
    imgWidth: userConfig.imgWidth,
    imgHeight: userConfig.imgHeight,
    dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
    dotBgColor: userConfig.dotBgColor ?? "#777",
    maxShadowBlur: userConfig.maxShadowBlur ?? 54,
    shadowColor: userConfig.shadowColor ?? "rgba(0,0,0, 0.19)"
  }

  const [currentNum, setCurrentNum] = useState(Math.round(images.length / 2));

  const dots = [];

  // Create Span elements for the dots 
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
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction:column;
          height: ${applyConfig.containerHeight};
        `}
    >
      <div className="imgs_container">
        <img
          src={currentNum === 0 ? images[images.length - 1].img.default : images[currentNum - 1].img.default}
          onClick={currentNum === 0 ? setCurrentNum(images.length - 1) : setCurrentNum(prev => prev - 1)}
          css={css`
            width: calc(${applyConfig.imgWidth} / 2.5);
            height: calc(${applyConfig.imgHeight} / 2.5);
            z-index: 1;
            transform: perspective(600px) rotateY(-10deg);
            align-self: center;
            margin-right:35px;
            transition: 0.2s ease-in-out;
            filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
              drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
              drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
              drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
              drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
              drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
              z-index: 3000;
              &:hover{
                cursor:pointer;
                transition: 0.2s ease-in-out;
                transform: perspective(600px) rotateY(-10deg) scale(1.05);
              }
          `}
        />

        <img
          style={{ objectFit: "cover" }}
          width={applyConfig.imgWidth}
          height={applyConfig.imgHeight}
          src={images[currentNum].img.default}
          css={css`
  
                filter: drop-shadow(0 1px 2px ${applyConfig.shadowColor}) 
                drop-shadow(0 2px ${applyConfig.maxShadowBlur / 16}px ${applyConfig.shadowColor}) 
                drop-shadow(0 4px ${applyConfig.maxShadowBlur / 8}px ${applyConfig.shadowColor})
                drop-shadow(0 8px ${applyConfig.maxShadowBlur / 4}px ${applyConfig.shadowColor})
                drop-shadow(0 16px ${applyConfig.maxShadowBlur / 2}px ${applyConfig.shadowColor})
                drop-shadow(0 32px ${applyConfig.maxShadowBlur}px ${applyConfig.shadowColor});
                z-index: 3000;
            `}
        />
        <img
          src={currentNum === images.length - 1 ? images[0].img.default : images[currentNum + 1].img.default}
          onClick={currentNum === images.length - 1 ? setCurrentNum(0) : setCurrentNum(prev => prev + 1)}
          css={css`
              width: calc(${applyConfig.imgWidth} / 2.5);
              height: calc(${applyConfig.imgHeight} / 2.5);
              z-index: 1;
              transform: perspective(600px) rotateY(10deg);
              align-self: center;
              margin-left:35px;
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