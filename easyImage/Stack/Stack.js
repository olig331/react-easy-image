import React, { useState, useEffect } from 'react';
import './style.css';
import PropTypes, { func } from 'prop-types';
import { css, jsx } from '@emotion/react';

export const Stack = ({ images, maxImgHeight, maxImgWidth, userConfig }) => {

  const applyConfig = {
    width: userConfig.width,
    height: userConfig.height,
    dotHighlightColor: userConfig.dotHighlightColor ?? "violet",
    dotBgColor: userConfig.dotBgColor ?? "#777",
    shadowColor: userConfig.shadowColor ?? "rgba(100, 100, 100, 0.07)",
    buttonColor: userConfig.buttonColor ?? "#333",
    buttonType: userConfig.buttonType ?? 1,
    border: userConfig.border ?? "none"
  }

  console.log(userConfig);


  const [currentNum, setCurrentNum] = useState(images.length)

  // A Circle representing the number of images
  //the current image dot will be highlighed
  const dots = [];

  // Create Span elements for the dots 
  for (const [index, dot] of images.entries()) {
    dots.push(
      <span
        key={index}
        onClick={() => { setCertainNum(index + 1) }}
        className="dot"
        style={index + 1 === currentNum ? { backgroundColor: `${applyConfig.dotHighlightColor}` } : { backgroundColor: `${applyConfig.dotBgColor}` }}
      >
      </span>
    );
  };


  const setCertainNum = (index) => {
    setCurrentNum(index)
  };

  useEffect(() => {
    console.log(currentNum)
  }, [currentNum])

  const decrementCount = () => {
    setCurrentNum(currentNum - 1)
  };

  const incrementCount = () => {
    setCurrentNum(currentNum + 1)
  };

  return (
    <div className="container_div" css={css`
      box-sizing: border-box;
      width: calc(${applyConfig.width} + 150px);
      height: calc(${applyConfig.height} + 150px);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0 auto;
      perspective: 100px;
      transform: rotate(0.02deg) translateY(20px);
      border: ${applyConfig.border};`
    }>
      {images.map((x, i) => (
        <img
          key={i}
          src={x.default}
          alt=""

          css={css`
            width:${applyConfig.width};
            height:${applyConfig.height};`}
          className={i < currentNum
            ? `stack_img ${i}`
            : i % 2 ? `stack_img ${i} displayNoneLeft`
              : `stack_img ${i} displayNoneRight`
          } />
      ))}

      {dots}

      {currentNum > 1
        ? (
          <button
            onClick={decrementCount}
            className="image_toggle left">
            {" < "}
          </button>)
        : ""
      }

      {currentNum < images.length
        ? (
          <button
            onClick={incrementCount}
            className="image_toggle right" >
            {">"}
          </button>)
        : ""
      }
    </div >
  )
}

const requiredPropsCheck = (props, propName, componentName) => {
  if (!props.maxImgHeight || !props.maxImgWidth) {
    return new Error(
      `Both maxImgHeight and maxImgWidth props in the ${componentName} component must be assigned a relavent CSS Value (px, em, rem, % etc...) please apply the value as a string EG maxImgWidth="200px"`);
  };
};


Stack.propTypes = {
  maxImgWidth: requiredPropsCheck,
  maxImgHeight: requiredPropsCheck,
  userConfig: PropTypes.shape({
    border: PropTypes.string,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    dotHighlightColor: PropTypes.string,
    dotBgColor: PropTypes.string,
    shadowColor: PropTypes.string,
    buttonColor: PropTypes.string,
    buttonType: PropTypes.number
  }).isRequired
}



