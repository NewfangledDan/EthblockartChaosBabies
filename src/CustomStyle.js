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
let facesImg;
let show = false;
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
    //facesImg = p5.createImg(
    //  "https://upload.wikimedia.org/wikipedia/commons/6/6a/Leonardo_da_Vinci_-_Portrait_of_a_Musician_-_Pinacoteca_Ambrosiana.jpg"
    //);

    //facesImg = p5.loadImage("./images/eigenfacesScale.jpg");
    //show = true;
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

    //p5.background(img01);
    p5.image(img01, 0, 0);
    //p5.image(img02,0,0);

    p5.blend(img02, 0, 0, 39, 39, 0, 0, 39, 39, p5.ADD);
    //p5.image(img01,0,0,img01.width,img01.height);
    //p5.image(img02,0,0,img02.width,img02.height);
    //p5.image(facesImg, 0, 0, facesImg.width / 2, facesImg.height / 2);

    // reset shuffle bag
    let seed = parseInt(hash.slice(0, 16), 16);
    shuffleBag.current = new MersenneTwister(seed);
    let objs = block.transactions.map((t) => {
      let seed = parseInt(t.hash.slice(0, 16), 16);
      return {
        y: shuffleBag.current.random(),
        x: shuffleBag.current.random(),
        radius: seed / 1000000000000000
      };
    });

    // example assignment of hoisted value to be used as NFT attribute later
    hoistedValue.current = 42;

    if (show) {
      objs.map((dot, i) => {
        p5.stroke(color1);
        p5.strokeWeight(1 + mod2 * 10);
        p5.ellipse(
          200 * dot.y * 6 * M,
          100 * dot.x * 6 * M,
          dot.radius * M * mod1
        );
      });
    }
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
