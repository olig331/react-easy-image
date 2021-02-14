# React Easy Image

&nbsp;&nbsp; React Easy Image is a React componenet library to assist in creating interactive/responsive good looking images for your webpage.

React Easy Image has 4 components to choose from with more to be added in the near future. The components are:

[NPM package](https://www.npmjs.com/package/react-easy-image)

&nbsp; 1. [Stack](#stack)

&nbsp; 2. [Tile](#tile)

&nbsp; 3. [SimpleSlides](#simpleslides)

&nbsp; 4. [AnimatedSlides](#animtedslides)

All components must be passed a **userConfig** prop which must be an object with some required values and other optional ones. Each component's configs are broken down in their relevant documentation.

# Installation and Setup

&nbsp; React Easy image can be installed via NPM with the following command. <br/>

&nbsp;&nbsp; `npm install react-easy-image` <br/>

&nbsp; Once installed import the R-E-I component you would to use "Stack, Tile, AnimatedSlides, SimpleSlides" into your desired React component. <br/>

&nbsp;&nbsp; `import {name of component} from 'react-easy-image'` <br/>

&nbsp; please see the relevant information on how to correctly utilise R-E-I components.

<ins>**Example:**</ins> <br/>

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Stack, Tile, SimpleSlides, AnimatedSlides } from 'react-easy-image'
import card from './10h.png'

const App = () => {
   return (
      <div>
         <Stack images={YOUR_IMAGES} userConfig={YOUR_CONFIG} />

         <Tile userConfig={YOUR_CONFIG}>
            <img src={card} />
         </Tile>

         <SimpleSlides images={YOUR_IMAGES} userConfig={YOUR_CONFIG} />

         <AnimatedSlides images={YOUR_IMAGES} userConfig={YOUR_CONFIG} />
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# Stack

The **Stack** Component must be passed 2 properties:

&nbsp;&nbsp;&nbsp; 1. _images_ <br/>
&nbsp;&nbsp;&nbsp; 2. _userConfig_

&nbsp;`<Stack images={stackImages} userConfig={yourConfigSettings} />`

### <ins> Images</ins>

&nbsp;&nbsp; Images can be an array of required images via webpack or simply and array of imported images

```js
const importAll = (r) => {
   return r.keys().map(r)
}

let stackImages = importAll(
   require.context('path-to-imgs-folder', true, /\.(png|jpe?g|svg)$/)
)
```

or

```js
const stackImages = [
   require('./imgs/stackImgs/image1.jpg'),
   require('./imgs/stackImgs/image2.jpg'),
   require('./imgs/stackImgs/image3.jpg'),
   require('./imgs/stackImgs/image4.jpg'),
   require('./imgs/stackImgs/image5.jpg'),
]
```

### <ins>Config </ins>

Stack's config options are as follows:

| Key                             |  Type   | Property is required | Default Values      |
| :------------------------------ | :-----: | :------------------: | :------------------ |
| imgWidth                        | string  |       **yes**        | N/A                 |
| imgHeight                       | string  |       **yes**        | N/A                 |
| containerHeight                 | string  |          no          | imgWidth + 150px    |
| containerWidth                  | string  |          no          | imgHeight + 150px   |
| shadowColor                     | string  |          no          | "rgba(0,0,0, 0.05)" |
| shadowHoverColor                | string  |          no          | "rgba(0,0,0, 0.25)  |
| border                          | string  |          no          | "none"              |
| allowDots                       | boolean |          no          | true                |
| dotHighlightColor               | string  |          no          | ""violet            |
| dotBgColor                      | string  |          no          | "#777"              |
| allowChevrons                   | boolean |          no          | false               |
| [chevronStyle](#chevron-styles) | number  |          no          | 1                   |
| chevronColor                    | string  |          no          | "black"             |

if no conatinerHeight and containerWidth values are passed they will be calclated with the imgWidth and imgHeight + 150px

**Eample**:

```js
const stackConfig = {
   imgWidth: '250px',
   imgHeight: '400px',
   containerWidth: '470px',
   containerHeight: '600px',
   dotBgColor: '#888',
   dotHighlightColor: 'violet',
   shadowColor: 'rgba(100, 100, 100, 0.05)',
   allowDots: false,
   allowChevrons: false,
}
```

![Stack](./src/docsImgs/stack.PNG)

By default clicking on the top image will cycle through the images. Clicking on the final image will reset the stack. [Chevrons](#Chevrons) can enabled with the **allowChevrons** config property being set to true.

[try on code sandbox](https://codesandbox.io/s/react-easy-image-stack-gu1ko?file=/src/App.js)

# Tile

For the Tile component it is imperative you only wrap a single element that element can have child elements within its container but the tile effects will only work on a single outer element <br/>

E.G <br/>

```js
<Tile userConfig={yourConfigSettings}>
   <img src={yourImg} alt="" />
</Tile>
```

Tile's config must be passed with **width** and **height** values passed as a string. These values can be any CSS value E.G. _"PX, EM, REM, CM, MM, %, etc"_

Tile's config options are as follows:

| Key           |  Type  | Property is required | Defaults           |
| :------------ | :----: | :------------------: | :----------------- |
| width         | string |       **yes**        | N/A                |
| height        | string |       **yes**        | N/A                |
| shadowColor   | string |          no          | "rgba(0,0,0, 0.7)" |
| maxShadowBlur | number |          no          | 64                 |
| scale         | number |          no          | 1.1                |
| traction      | number |          no          | 17                 |

<img width="520" height="590" src="./src/docsImgs/Tile.png">

[try on code sandbox](https://codesandbox.io/s/react-easy-image-tile-rmvzm?file=/src/App.js)

# SimpleSlides

After importing **react easy img** render the **SimpleSlides** component in your JSX
the **SimpleSlides** Component must be passed 2 properties:

&nbsp;&nbsp;&nbsp; 1. _images_
&nbsp;&nbsp;&nbsp; 2. _userConfig_

&nbsp; `<SimpleSlides images={yourImagesArray} userConfig={yourSimpleSlidesConfig} />`

### <ins>Images</ins>

Due to having the option to have captions for these images the import method must differ slightly to that of _Stack_ The images passed as a prop to **SimpleSlides** must be an **Array of objects** with the following key value pairs:

```js
const simpleslidesArray = [
   { img: require('path-to-your-img.png'), cap: 'Image 1 Caption' },
   { img: require('path-to-your-img.png'), cap: 'Image 1 Caption' },
   { img: require('path-to-your-img.png'), cap: 'Image 1 Caption' },
   { img: require('path-to-your-img.png'), cap: '' },
]

// Images can also be imported manually

import image1 from 'yourpath/image1.png'
import image2 from 'yourpath/image2.png'
import image3 from 'yourpath/image3.png'
import image4 from 'yourpath/image4.png'
import image5 from 'yourpath/image5.png'

const simpleSlidesArray = [image1, image2, image3, image4, image5]
```

If no caption is required just pass an empty string.

### <ins>Config</ins>

Simple Slides config must be passed with **imgWidth**, **imgHeight**, **containerWidth** and **containerHeight** values passed as strings. These values can be any CSS value E.G. _"PX, EM, REM, CM, MM, %, etc"_

Simple Slides config options are as follows:

| Key                             |  Type   | Property is required | Defaults                  |
| :------------------------------ | :-----: | :------------------: | :------------------------ |
| imgWidth                        | string  |       **yes**        | N/A                       |
| imgHeight                       | string  |       **yes**        | N/A                       |
| containerWidth                  | string  |       **yes**        | N/A                       |
| containerHeight                 | string  |       **yes**        | N/A                       |
| maxShadowBlur                   | number  |          no          | 64                        |
| shadowColor                     | string  |          no          | "rgba(0,0,0, 0.09)"       |
| capFontSize                     | string  |          no          | "14px"                    |
| capColor                        | string  |          no          | "#333"                    |
| capBgColor                      | string  |          no          | "rgba(220,220,220, 0.89)" |
| [chevronStyle](#chevron-styles) | number  |          no          | 2                         |
| chevronScale                    | number  |          no          | 1                         |
| chevronColor                    | string  |          no          | "black"                   |
| allowDots                       | boolean |          no          | true                      |
| dotHighlightColor               | string  |          no          | "violet"                  |
| dotBgColor                      | string  |          no          | "#888"                    |
| borderRadius                    | string  |          no          | "5px"                     |

**Eample**:

```js
const tileConfig = {
   containerWidth: '960px',
   containerHeight: '730px',
   imgWidth: '960px',
   imgHeight: '640px',
   capFontSize: '20px',
   chevronStyle: 2,
   chevronScale: 1.6,
   chevronColor: 'whitesmoke',
   borderRadius: '10px',
}
```

<img width="732" height="485" src="./src/docsImgs/simpleSlides.PNG">

[try on code sandbox](https://codesandbox.io/s/react-easy-image-simple-slides-bob0i?file=/src/App.js)

# AnimtedSlides

After importing **react easy img** render the **AnimatedSlides** component in your JSX
the **AnimatedSlides** Component must be passed 2 properties:

&nbsp;&nbsp;&nbsp; 1. _images_
&nbsp;&nbsp;&nbsp; 2. _userConfig_

&nbsp; `<AnimatedSlides images={yourImagesArray} userConfig={yourSimpleSlidesConfig4} />`

### <ins>Images</ins>

Due to having the option to have captions for these images the import method must differ slightly to that of _Stack_ The images passed as a prop to **SimpleSlides** must be an **Array of objects** with the following key value pairs:

```js
const animatedSlidesArray = [
   { img: require('path-to-your-img.png'), cap: 'Image 1 Caption' },
   { img: require('path-to-your-img.png'), cap: 'Image 2 Caption' },
   { img: require('path-to-your-img.png'), cap: 'Image 3 Caption' },
   { img: require('path-to-your-img.png'), cap: 'Image 4 Caption' },
]

// Images can also be imported normally

import image1 from 'yourpath/image1.png'
import image2 from 'yourpath/image2.png'
import image3 from 'yourpath/image3.png'
import image4 from 'yourpath/image4.png'
import image5 from 'yourpath/image5.png'

const animatedSlidesArray = [
   { img: image1, cap: 'image 1 caption' },
   { img: image2, cap: 'image 2 caption' },
   { img: image3, cap: 'image 3 caption' },
   { img: image4, cap: 'image 4 caption' },
   { img: image5, cap: 'image 5 caption' },
]
```

If no caption is required just pass an empty string.

### <ins>Config</ins>

AnimatedSlide's config options are as follow:

| Key               |  Type   | Property is required | Defaults                  |
| :---------------- | :-----: | :------------------: | :------------------------ |
| imgWidth          | string  |       **yes**        | N/A                       |
| imgHeight         | string  |       **yes**        | N/A                       |
| allowDots         | boolean |          no          | true                      |
| dotHighlightColor | string  |          no          | "violet"                  |
| dotBgColor        | string  |          no          | "#777"                    |
| maxShadowBlur     | number  |          no          | 64                        |
| shadowColor       | string  |          no          | "rgba(0,0,0, 0.19)"       |
| roateTime         | number  |          no          | 350 _(in ms)_             |
| roateTime         | string  |          no          | "5px"                     |
| capColor          | string  |          no          | "#333"                    |
| capBgColor        | string  |          no          | "rgba(220,220,220, 0.89)" |
| capFontSize       | string  |          no          | "14px"                    |

**Example:**

```js
const aniSlidesConfig = {
   imgWidth: '2000ppx',
   imgHeight: '1250px',
   dotBgColor: 'slategray',
   dotHighlightColor: 'slateblue',
}
```

Animated Slides container width is set 100% if you want the container width smaller wrap it inside so it takes 100% of its parent.

Animated Slides images are positioned absolutly and the 3 image elements change position on rotation this is to limit re-renders of the images to only one per rotation.

Animted slides is also fully responsive and the images are scaled based on their aspect ratio to fit the viewport size.

<img width="1014" height="394" src="./src/docsImgs/aniSlides1.PNG">

[try on code sandbox](https://codesandbox.io/s/react-easy-image-animated-slides-307kw)

# Chevron Styles

| Chevron Style Number |                              Style                               |
| :------------------- | :--------------------------------------------------------------: |
| 1                    | <img width="150" height="150" src="./src/docsImgs/chevron1.PNG"> |
| 2                    | <img width="150" height="150" src="./src/docsImgs/chevron2.PNG"> |
| 3                    | <img width="150" height="150" src="./src/docsImgs/chevron3.PNG"> |
| 4                    | <img width="150" height="150" src="./src/docsImgs/chevron4.PNG"> |
| 5                    | <img width="150" height="150" src="./src/docsImgs/chevron5.PNG"> |
| 6                    | <img width="150" height="150" src="./src/docsImgs/chevron6.PNG"> |
