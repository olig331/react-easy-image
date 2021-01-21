import React from 'react';
import './fadeSlides.css';
import PropTypes from 'prop-types';
import {css} from '@emotion/react'

export const FadeSlides = ( { userConfig, images} ) => {
   // Array for the Image path string
   let appliedImages = [];

   // Determine if the passed images prop is path string or webpack modules 
   // If they are webpack modules parse the path strings and add to applidImages array for rendering 
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

   // Config Settings
   const applyConfig ={
      imgWidth: userConfig.imgWidth,
      imgHeight: userConfig.imgHeight,
   }

   return (
      <div>
         
      </div>
   )
}

FadeSlides.propTypes ={
   userConfig: PropTypes.shape({
      imgWidth: PropTypes.string.isRequired,
      imgHeight: PropTypes.string.isRequired,
   })
}