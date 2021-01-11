import React, { useState, useEffect } from 'react';
import './slides.css';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';

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
    arrowStyle: userConfig.arrowStyle ?? 1,
    dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
    dotBgColor: userConfig.dotBgColor ?? "#888",
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
        style={index + 1 === currentImgage ? { backgroundColor: `${applyConfig.dotHighlightColor}` } : { backgroundColor: `${applyConfig.dotBgColor}` }}
      >
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
        .chevron-right{
          opacity: 1;
        }
         .chevron-left{
          opacity: 1;
        }
      }
    `}>
      {images.map((object, index) => (
        <div key={index}
          title={object.cap}
          className="slide_img_con"
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
        `
          }
          style={index + 1 === currentImgage ? { display: "block" } : { display: "none" }}
        >
          <img
            src={object.img.default}
            css={css`
              transition: 0.25s linear;
              width:${applyConfig.imgWidth};
              height:${applyConfig.imgHeight};
              `}
          />
          {/* 
          <h4 css={css`text-align:center; color: ${applyConfig.capColor}`}>{object.cap}</h4> */}
        </div>
      ))
      }
      {dots}
      <div
        css={css`
          position: absolute;
          right:2%;
          top: 50%;
          transform :translate(-2%, -50%);
          opacity: 0;
          transition: 0.2s linear;
          &:hover{
            cursor:pointer;
          }
        `}
        className="chevron-right"
        onClick={() =>
          setcurrentImage(
            (prevState) => prevState < images.length
              ? prevState + 1
              : prevState)}>

      </div>

      <div
        css={css`
          position: absolute;
          left:2%;
          top: 50%;
          transform :translate(-2%, -50%);
          opacity: 0;
          transition: 0.2s linear;
          &:hover{
            cursor:pointer;
          }
        `}
        className="chevron-left"
        onClick={() =>
          setcurrentImage(
            (prevState) => prevState > 1
              ? prevState - 1
              : prevState)}>

      </div>
    </div >
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
    arrowStyle: PropTypes.number,
    capBgColor: PropTypes.string,
    dotHighlightColor: PropTypes.string,
    dotBgColor: PropTypes.string,
  }).isRequired
}