import React, { useState, useEffect } from 'react';
import './style.css';
import PropTypes, { func } from 'prop-types';
import { css, jsx } from '@emotion/react';

export const Stack = ({ images, maxImgHeight, maxImgWidth, userConfig }) => {

  const borderTest = userConfig.border

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
        className={index + 1 === currentNum
          ? "dot dot_highlighed"
          : "dot"
        }>
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
      width: ${maxImgWidth};
      height: ${maxImgHeight};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 0 auto;
      perspective: 100px;
      transform: rotate(0.02deg) translateY(20px);
      border: ${borderTest};`
    }>
      {images.map((x, i) => (
        <img
          key={i}
          src={x.default}
          alt=""
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
    border: PropTypes.string
  })
}


