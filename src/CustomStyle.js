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
let img01;
let img02;
let img03;
let img04;
let img05;
let img06;
let img07;
let img08;
let img09;
let img10;
let img11;
let img12;
let img13;
let img14;
let img15;

const CustomStyle = ({
  block,
  canvasRef,
  attributesRef,
  width,
  height,
  handleResize,
  mod1 = 0.75, // Example: replace any number in the code with mod1, mod2, or color values
  mod2 = 0.25,
  color1 = "#4f83f1",
  background = "#ccc"
}) => {
  const shuffleBag = useRef();
  const hoistedValue = useRef();

  const { hash } = block;

  const preload = (p5) => {
    img01 = p5.loadImage("./images/1.jpg");
    img02 = p5.loadImage("./images/2.jpg");
    img03 = p5.loadImage("./images/3.jpg");
    img04 = p5.loadImage("./images/4.jpg");
    img05 = p5.loadImage("./images/5.jpg");
    img06 = p5.loadImage("./images/6.jpg");
    img07 = p5.loadImage("./images/7.jpg");
    img08 = p5.loadImage("./images/8.jpg");
    img09 = p5.loadImage("./images/9.jpg");
    img10 = p5.loadImage("./images/10.jpg");
    img11 = p5.loadImage("./images/11.jpg");
    img12 = p5.loadImage("./images/12.jpg");
    img13 = p5.loadImage("./images/13.jpg");
    img14 = p5.loadImage("./images/14.jpg");
    img15 = p5.loadImage("./images/15.jpg");
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

    // reset shuffle bag
    let seed = parseInt(hash.slice(0, 16), 16);
    shuffleBag.current = new MersenneTwister(seed);
    //let x01 = Math.abs(shuffleBag.current.random());
    //let x02 = Math.abs(shuffleBag.current.random());
    //let x03 = Math.abs(shuffleBag.current.random());
    //let x04 = Math.abs(shuffleBag.current.random());
    //let x05 = Math.abs(shuffleBag.current.random());
    //let x06 = Math.abs(shuffleBag.current.random());
    //let x07 = Math.abs(shuffleBag.current.random());
    //let x08 = Math.abs(shuffleBag.current.random());
    //let x09 = Math.abs(shuffleBag.current.random());
    //let x10 = Math.abs(shuffleBag.current.random());
    //let x11 = Math.abs(shuffleBag.current.random());
    //let x12 = Math.abs(shuffleBag.current.random());
    //let x13 = Math.abs(shuffleBag.current.random());
    //let x14 = Math.abs(shuffleBag.current.random());
    //let x15 = Math.abs(shuffleBag.current.random());
    let x01 = 2.0 * shuffleBag.current.random() - 1.0;
    let x02 = 2.0 * shuffleBag.current.random() - 1.0;
    let x03 = 2.0 * shuffleBag.current.random() - 1.0;
    let x04 = 2.0 * shuffleBag.current.random() - 1.0;
    let x05 = 2.0 * shuffleBag.current.random() - 1.0;
    let x06 = 2.0 * shuffleBag.current.random() - 1.0;
    let x07 = 2.0 * shuffleBag.current.random() - 1.0;
    let x08 = 2.0 * shuffleBag.current.random() - 1.0;
    let x09 = 2.0 * shuffleBag.current.random() - 1.0;
    let x10 = 2.0 * shuffleBag.current.random() - 1.0;
    let x11 = 2.0 * shuffleBag.current.random() - 1.0;
    let x12 = 2.0 * shuffleBag.current.random() - 1.0;
    let x13 = 2.0 * shuffleBag.current.random() - 1.0;
    let x14 = 2.0 * shuffleBag.current.random() - 1.0;
    let x15 = 2.0 * shuffleBag.current.random() - 1.0;
    let norm =
      (4.0 * mod1) /
      (x01 +
        x02 +
        x03 +
        x04 +
        x05 +
        x06 +
        x07 +
        x08 +
        x09 +
        x10 +
        x11 +
        x12 +
        x13 +
        x14 +
        x15);

    let img = img01;
    img01.loadPixels();
    img02.loadPixels();
    img03.loadPixels();
    img04.loadPixels();
    img05.loadPixels();
    img06.loadPixels();
    img07.loadPixels();
    img08.loadPixels();
    img09.loadPixels();
    img10.loadPixels();
    img11.loadPixels();
    img12.loadPixels();
    img13.loadPixels();
    img14.loadPixels();
    img15.loadPixels();
    img.loadPixels();
    //let d = p5.pixelDensity();
    let d = 1;
    let imageSize = 4 * (img.width * d) * (img.height * d);
    for (let i = 0; i < imageSize; i += 1) {
      img.pixels[i] = norm * x01 * img01.pixels[i];
      img.pixels[i] += norm * x02 * img02.pixels[i];
      img.pixels[i] += norm * x03 * img03.pixels[i];
      img.pixels[i] += norm * x04 * img04.pixels[i];
      img.pixels[i] += norm * x05 * img05.pixels[i];
      img.pixels[i] += norm * x06 * img06.pixels[i];
      img.pixels[i] += norm * x07 * img07.pixels[i];
      img.pixels[i] += norm * x08 * img08.pixels[i];
      img.pixels[i] += norm * x09 * img09.pixels[i];
      img.pixels[i] += norm * x10 * img10.pixels[i];
      img.pixels[i] += norm * x11 * img11.pixels[i];
      img.pixels[i] += norm * x12 * img12.pixels[i];
      img.pixels[i] += norm * x13 * img13.pixels[i];
      img.pixels[i] += norm * x14 * img14.pixels[i];
      img.pixels[i] += norm * x15 * img15.pixels[i];

      //img.pixels[i] = img02.pixels[i];
    }
    img.updatePixels();

    p5.background(img01);
    //p5.image(img, 0, 0);

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
    mod2: 0.1,
    color1: "#fff000",
    background: "#000000"
  }
};

export { styleMetadata };
