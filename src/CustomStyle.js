import React, { useRef } from "react";
import Sketch from "react-p5";
import MersenneTwister from "mersenne-twister";

/*
Create your Custom style to be turned into a EthBlock.art Mother NFT

Basic rules:
 - use a minimum of 1 and a maximum of 4 "modifiers", modifiers are values between 0 and 1,
 - use a minimum of 1 and a maximum of 3 colors, the color "background" will be set at the canvas root
 - Use the block as source of entropy, no Math.random() allowed!
 - You can use a "shuffle bag" using data from the block as seed, a MersenneTwister library is provided

 Arguments:
  - block: the blockData, in this example template you are given 3 different blocks to experiment with variations, check App.js to learn more
  - mod[1-3]: template modifier arguments with arbitrary defaults to get your started
  - color: template color argument with arbitrary default to get you started

Getting started:
 - Write p5.js code, comsuming the block data and modifier arguments,
   make it cool and use no random() internally, component must be pure, output deterministic
 - Customize the list of arguments as you wish, given the rules listed below
 - Provide a set of initial /default values for the implemented arguments, your preset.
 - Think about easter eggs / rare attributes, display something different every 100 blocks? display something unique with 1% chance?

 - check out p5.js documentation for examples!
*/
/*
  CustomStyle "Ghosts in the Ether" Copyright Dan Gillespie 2021, All rights reserved
*/

let imgs = [];
let baby = false;
let ageString = "Adult";

const CustomStyle = ({
  block,
  canvasRef,
  attributesRef,
  width,
  height,
  handleResize,
  mod1 = 0.75, // Example: replace any number in the code with mod1, mod2, or color values
  mod2 = 0.5,
  mod3 = 0.5
}) => {
  const shuffleBag = useRef();
  //const hoistedValue = useRef();

  const { hash } = block;
  const { parentHash } = block;

  const preload = (p5) => {
    let seed = parseInt(parentHash.slice(0, 16), 16);
    shuffleBag.current = new MersenneTwister(seed);
    if (shuffleBag.current.random() < 0.001) {
      baby = true;
      ageString = "BABY";
      imgs.push(p5.loadImage("./images/Babies/B01.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B02.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B03.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B04.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B05.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B06.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B07.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B08.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B09.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B10.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B11.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B12.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B13.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B14.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B15.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B16.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B17.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B18.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B19.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B20.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B21.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B22.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B23.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B24.jpg"));
      imgs.push(p5.loadImage("./images/Babies/B25.jpg"));
    } else {
      imgs.push(p5.loadImage("./images/Standard/01.jpg"));
      imgs.push(p5.loadImage("./images/Standard/02.jpg"));
      imgs.push(p5.loadImage("./images/Standard/03.jpg"));
      imgs.push(p5.loadImage("./images/Standard/04.jpg"));
      imgs.push(p5.loadImage("./images/Standard/05.jpg"));
      imgs.push(p5.loadImage("./images/Standard/06.jpg"));
      imgs.push(p5.loadImage("./images/Standard/07.jpg"));
      imgs.push(p5.loadImage("./images/Standard/08.jpg"));
      imgs.push(p5.loadImage("./images/Standard/09.jpg"));
      imgs.push(p5.loadImage("./images/Standard/10.jpg"));
      imgs.push(p5.loadImage("./images/Standard/11.jpg"));
      imgs.push(p5.loadImage("./images/Standard/12.jpg"));
      imgs.push(p5.loadImage("./images/Standard/13.jpg"));
      imgs.push(p5.loadImage("./images/Standard/14.jpg"));
      imgs.push(p5.loadImage("./images/Standard/15.jpg"));
      imgs.push(p5.loadImage("./images/Standard/16.jpg"));
      imgs.push(p5.loadImage("./images/Standard/17.jpg"));
      imgs.push(p5.loadImage("./images/Standard/18.jpg"));
      imgs.push(p5.loadImage("./images/Standard/19.jpg"));
      imgs.push(p5.loadImage("./images/Standard/20.jpg"));
      imgs.push(p5.loadImage("./images/Standard/21.jpg"));
      imgs.push(p5.loadImage("./images/Standard/22.jpg"));
      imgs.push(p5.loadImage("./images/Standard/23.jpg"));
      imgs.push(p5.loadImage("./images/Standard/24.jpg"));
      imgs.push(p5.loadImage("./images/Standard/25.jpg"));
    }
  };

  // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
  const setup = (p5, canvasParentRef) => {
    // Keep reference of canvas element for snapshots
    let canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    canvasRef.current = p5;

    attributesRef.current = () => {
      return {
        // This is called when the final image is generated, when creator opens the Mint NFT modal.
        // should return an object structured following opensea/enjin metadata spec for attributes/properties
        // https://docs.opensea.io/docs/metadata-standards
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

        attributes: [
          {
            trait_type: "AGE",
            value: ageString
          }
        ]
      };
    };
  };

  // draw() is called right after setup and in a loop
  // disabling the loop prevents controls from working correctly
  // code must be deterministic so every loop instance results in the same output

  // Basic example of a drawing something using:
  // a) the block hash as initial seed (shuffleBag)
  // b) individual transactions in a block (seed)
  // c) custom parameters creators can customize (mod1, color1)
  // d) final drawing reacting to screen resizing (M)
  const draw = (p5) => {
    let MINFACES = 5;
    //Number of Eigenfaces used is based on the number of transactions in the block
    let moreFaces = Math.min(block.transactions.length, imgs.length - MINFACES);
    //let NUMFACES = MINFACES + Math.floor(mod3 * (imgs.length - MINFACES));
    let NUMFACES = MINFACES + moreFaces;
    let xFade = MINFACES + moreFaces - NUMFACES;

    // reset shuffle bag
    let gasUsed = parseInt(block.gasUsed.hex, 16);
    let gasLimit = parseInt(block.gasLimit.hex, 16);
    let warp = gasUsed / gasLimit;
    let warpVal = Math.pow(warp, 64);
    //let warpVal = warp;
    let seed = parseInt(hash.slice(0, 16), 16);
    shuffleBag.current = new MersenneTwister(seed);
    let x = [];
    let xSum = 0;
    for (let i = 0; i < NUMFACES - 1; i += 1) {
      let temp = (1.0 + warpVal) * shuffleBag.current.random() - warpVal;
      x.push(temp);
      xSum += temp;
    }

    //xFade
    let temp = (1.0 + warpVal) * shuffleBag.current.random() - warpVal;
    x.push(xFade * temp);
    xSum += xFade * temp;
    //let norm = Math.min(Math.abs((4.0 * mod1) / xSum),10.0);
    let norm = Math.abs((7.0 * mod1) / xSum);
    //let norm = 4.0*Math.abs((4.0 * mod1) / xSum) - 2.0;

    let base = p5.createImage(imgs[0].width, imgs[0].height);
    for (let i = 0; i < NUMFACES; i += 1) {
      imgs[i].loadPixels();
    }
    base.loadPixels();
    let d = 1;
    let imageSize = 4 * (base.width * d) * (base.height * d);
    for (let im = 0; im < NUMFACES; im += 1) {
      for (let i = 0; i < imageSize; i += 1) {
        base.pixels[i] += norm * x[im] * imgs[im].pixels[i];
      }
    }
    base.updatePixels();

    //Saturation
    let final = p5.createImage(imgs[0].width, imgs[0].height);
    let satVal = -2.0 * mod2 + 1.0;
    final.loadPixels();
    for (let i = 0; i < imageSize; i += 4) {
      let grey =
        0.299 * base.pixels[i] +
        0.587 * base.pixels[i + 1] +
        0.114 * base.pixels[i + 2];
      let r = satVal * grey + (1.0 - satVal) * base.pixels[i];
      let g = satVal * grey + (1.0 - satVal) * base.pixels[i + 1];
      let b = satVal * grey + (1.0 - satVal) * base.pixels[i + 2];

      final.pixels[i] = Math.min(r, 255.0);
      final.pixels[i + 1] = Math.min(g, 255.0);
      final.pixels[i + 2] = Math.min(b, 255.0);
      final.pixels[i + 3] = 255;
    }
    final.updatePixels();

    p5.noSmooth();
    p5.background(final);
    p5.filter(p5.BLUR, 3 - 3 * mod3);

    //Frame
    let off = 5;
    let weight = 10;
    if (baby) {
      p5.fill(234, 170, 221);
      p5.stroke(234, 170, 221);
      //p5.fill(226,191,231);
      //p5.stroke(226,191,231);
    } else {
      p5.fill(0);
      p5.stroke(0);
    }
    p5.rectMode(p5.CORNERS);
    p5.rect(off, off, width - off, off + weight);
    p5.rect(width - off, off, width - off - weight, height - off);
    p5.rect(width - off, height - off, off, height - off - weight);
    p5.rect(off, height - off, off + weight, off);

    //Series
    let textHeight = Math.min(12, weight - 2);
    p5.textSize(textHeight);
    //let seriesString = "1/1000";
    let seriesString = "Block# " + String(block.number);
    //let seriesString = norm;
    //let thing = gasUsed/gasLimit;
    //let seriesString = warpVal.toString();
    p5.textFont("Lato");
    p5.textStyle(p5.BOLDITALIC);
    let seriesWidth = p5.textWidth(seriesString);
    if (baby) {
      p5.fill(50, 50, 50);
    } else {
      p5.fill(150, 150, 150);
    }
    p5.text(
      "Ghosts in the Ether",
      off + weight,
      height - off - (weight - textHeight)
    );
    p5.text(
      seriesString,
      width - off - weight - seriesWidth,
      height - off - (weight - textHeight)
    );
    // example assignment of hoisted value to be used as NFT attribute later
    //hoistedValue.current = 42;
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={handleResize}
    />
  );
};

export default CustomStyle;

const styleMetadata = {
  name: "",
  description: "",
  image: "",
  creator_name: "",
  options: {
    mod1: 0.4,
    mod2: 0.5,
    mod3: 0.5
  }
};

export { styleMetadata };
