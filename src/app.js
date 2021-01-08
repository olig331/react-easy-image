import React from 'react';
import ReactDOM from 'react-dom';
import { Stack } from '../easyImage/Stack/Stack';
import { Tile } from '../easyImage/Tile/Tile';
import './app.css';
import card from './imgs/cards/10H.png';


const App = () => {

  const myConfig = {
    "border": "none"
  }

  const tileConfig = {
    width: "250px",
    height: "400px",
    shadowColor: "rgba(150, 0, 0, 0.08)",
    maxShadowBlur: 120,
    traction: 17,
    scale: 1.1
  }

  const importAll = (r) => {
    console.log(r)
    return r.keys().map(r);
  };

  //if you get TS context error-- - npm install - D @types/webpack-env
  let images = importAll(
    require.context("./imgs/cards", true, /\.(png|jpe?g|svg)$/)
  );

  console.log(images)

  console.log(__dirname)
  return (
    <div style={{ transform: "rotate(0.02deg)" }}>

      <div className="app">
        <Stack
          images={images}
          maxImgWidth="470px"
          maxImgHeight="600px"
          userConfig={myConfig}
        />
      </div>

      <div className="tile_container">

        <Tile config={tileConfig}>
          <img src={card} />
        </Tile>

      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));


