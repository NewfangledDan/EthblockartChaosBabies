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

let DEFAULT_SIZE = 500;
let show = false;
let imgs = [];
//let NUMFACES = 15;

const CustomStyle = ({
  block,
  canvasRef,
  attributesRef,
  width,
  height,
  handleResize,
  mod1 = 0.75, // Example: replace any number in the code with mod1, mod2, or color values
  mod2 = 1.0,
  mod3 = 1.0,
  mod4 = 0.5,
  color1 = "#4f83f1",
  background = "#ccc"
}) => {
  const shuffleBag = useRef();
  const hoistedValue = useRef();

  const { hash } = block;

  const preload = (p5) => {
    imgs.push(p5.loadImage("./images/01.jpg"));
    imgs.push(p5.loadImage("./images/02.jpg"));
    imgs.push(p5.loadImage("./images/03.jpg"));
    imgs.push(p5.loadImage("./images/04.jpg"));
    imgs.push(p5.loadImage("./images/05.jpg"));
    imgs.push(p5.loadImage("./images/06.jpg"));
    imgs.push(p5.loadImage("./images/07.jpg"));
    imgs.push(p5.loadImage("./images/08.jpg"));
    imgs.push(p5.loadImage("./images/09.jpg"));
    imgs.push(p5.loadImage("./images/10.jpg"));
    imgs.push(p5.loadImage("./images/11.jpg"));
    imgs.push(p5.loadImage("./images/12.jpg"));
    imgs.push(p5.loadImage("./images/13.jpg"));
    imgs.push(p5.loadImage("./images/14.jpg"));
    imgs.push(p5.loadImage("./images/15.jpg"));
    imgs.push(p5.loadImage("./images/16.jpg"));
    imgs.push(p5.loadImage("./images/17.jpg"));
    imgs.push(p5.loadImage("./images/18.jpg"));
    imgs.push(p5.loadImage("./images/19.jpg"));
    imgs.push(p5.loadImage("./images/20.jpg"));
    imgs.push(p5.loadImage("./images/21.jpg"));
    imgs.push(p5.loadImage("./images/22.jpg"));
    imgs.push(p5.loadImage("./images/23.jpg"));
    imgs.push(p5.loadImage("./images/24.jpg"));
    imgs.push(p5.loadImage("./images/25.jpg"));
  };

  // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
  const setup = (p5, canvasParentRef) => {
    // Keep reference of canvas element for snapshots
    let _p5 = p5.createCanvas(width, height).parent(canvasParentRef);
    canvasRef.current = p5;

    attributesRef.current = () => {
      return {
        // This is called when the final image is generated, when creator opens the Mint NFT modal.
        // should return an object structured following opensea/enjin metadata spec for attributes/properties
        // https://docs.opensea.io/docs/metadata-standards
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

        attributes: [
          {
            display_type: "number",
            trait_type: "your trait here number",
            value: hoistedValue.current // using the hoisted value from within the draw() method, stored in the ref.
          },

          {
            trait_type: "your trait here text",
            value: "replace me"
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
    let WIDTH = width;
    let HEIGHT = height;
    let DIM = Math.min(WIDTH, HEIGHT);
    let M = DIM / DEFAULT_SIZE;

    let MINFACES = 5;
    let NUMFACES = MINFACES + Math.floor(mod3 * (imgs.length - MINFACES));
    let xFade = MINFACES + mod3 * (imgs.length - MINFACES) - NUMFACES;

    // reset shuffle bag
    let seed = parseInt(hash.slice(0, 16), 16);
    shuffleBag.current = new MersenneTwister(seed);
    let x = [];
    let xSum = 0;
    for (let i = 0; i < NUMFACES - 1; i += 1) {
      let temp = (1.0 + mod2) * shuffleBag.current.random() - mod2;
      x.push(temp);
      xSum += temp;
    }

    //xFade
    let temp = (1.0 + mod2) * shuffleBag.current.random() - mod2;
    x.push(xFade * temp);
    xSum += xFade * temp;
    let norm = (4.0 * mod1) / xSum;

    let base = p5.createImage(imgs[0].width, imgs[0].height);
    for (let i = 0; i < NUMFACES; i += 1) {
      imgs[i].loadPixels();
    }
    base.loadPixels();
    //let d = p5.pixelDensity();
    let d = 1;
    let imageSize = 4 * (base.width * d) * (base.height * d);
    for (let im = 0; im < NUMFACES; im += 1) {
      for (let i = 0; i < imageSize; i += 1) {
        //base.pixels[i] += norm * x[im] * imgs[im].pixels[i];
        base.pixels[i] += norm * x[im] * imgs[im].pixels[i];
      }
    }
    base.updatePixels();

    //Saturation
    let final = p5.createImage(imgs[0].width, imgs[0].height);
    let satVal = -2.0 * mod4 + 1.0;
    final.loadPixels();
    for (let i = 0; i < imageSize; i += 4) {
      let grey =
        0.299 * base.pixels[i] +
        0.587 * base.pixels[i + 1] +
        0.114 * base.pixels[i + 2];
      final.pixels[i] = satVal * grey + (1.0 - satVal) * base.pixels[i];
      final.pixels[i + 1] = satVal * grey + (1.0 - satVal) * base.pixels[i + 1];
      final.pixels[i + 2] = satVal * grey + (1.0 - satVal) * base.pixels[i + 2];
      final.pixels[i + 3] = base.pixels[i + 3];
    }
    final.updatePixels();

    //p5.colorMode(p5.HSB);
    //p5.tint(0,50,50);

    p5.background(final);
    //p5.image(img, 0, 0);

    //Frame
    let off = 5;
    let weight = 15;
    p5.fill(0);
    p5.rectMode(p5.CORNERS);
    p5.rect(off, off, width - off, off + weight);
    p5.rect(width - off, off, width - off - weight, height - off);
    p5.rect(width - off, height - off, off, height - off - weight);
    p5.rect(off, height - off, off + weight, off);

    // example assignment of hoisted value to be used as NFT attribute later
    hoistedValue.current = 42;

    //if (show) {
    //  objs.map((dot, i) => {
    //    p5.stroke(color1);
    //    p5.strokeWeight(1 + mod2 * 10);
    //    p5.ellipse(
    //      200 * dot.y * 6 * M,
    //      100 * dot.x * 6 * M,
    //      dot.radius * M * mod1
    //    );
    //  });
    //}
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
    mod2: 1.0,
    mod3: 1.0,
    mod4: 0.5,
    color1: "#fff000",
    background: "#000000"
  }
};

export { styleMetadata };
