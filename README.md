# React Easy Img 

&nbsp; React Easy Img is a React componenet library to assist in creating interactive/responsive good looking images for your webpage. 

As of version 1.0.2 React Easy Img has 4 components to choose from with more to be added in the near future. Those components are: 

&nbsp; 1. [Stack](###Stack) 
&nbsp; 2. [Tile](###Tile)
&nbsp; 3. [SimpleSlides](###SimpleSlides)
&nbsp; 4. [AnimatedSlides](###AnimatedSlides)

# Installation and Setup 

&nbsp; React Easy image can be installed via NPM with the following command <br/>
&nbsp;&nbsp; `npm install react-easy-img` <br/>
&nbsp; Once installed simply import the componenet you would to use "Stack, Tile, AnimatedSlides, SimpleSlides" into your desired React Component. <br/>
&nbsp;&nbsp; `import {Tile} from 'react-easy-img'` <br/>
&nbsp; please see the relavent infomation on how to correctly use the differnt componenets
 

### Stack

After importing react easy img Render the Stack component in your JSX `Stack images={arrayOfYourImages} config={yourConfigSettings} />`

### Tile

For tile it is imperative you only wrap a single element that element can have child elements within its container but the tile effects will only work on a single outer element <br/>
E.G <br/>
  ```
   <Tile config={yourConfigSettings}> <br/>
      <div>This is the Element you are Wrapping</div> <br/>
   </Tile>
   ```

### SimpleSlides

### AnimtedSlides