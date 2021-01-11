import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/react';
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
        `}>
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