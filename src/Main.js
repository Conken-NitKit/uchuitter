import * as THREE from "three/src/Three";
import { CSS3DObject, CSS3DRenderer } from "three-css3drenderer";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import React from "react";
import Humberger from "./components/Humberger";

let string =
  "<div>" +
  "<h1>This is an H1 Element.</h1>" +
  '<span class="large">Hello Three.js cookbook</span>' +
  "<textarea> And this is a textarea</textarea>" +
  "</div>";

function createCSS3DObject(s) {
  // 文字列をDOM要素に変換
  var wrapper = document.createElement("div");
  wrapper.innerHTML = s;
  var div = wrapper.firstChild;

  // DOM要素にCSSを当てる
  div.style.width = "375px";
  div.style.height = "375px";
  div.style.opacity = 1;
  div.style["will-change"] = "all";
  div.style.transition = "top 0.2s linear";
  div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

  // DOM要素からCSSオブジェクトを生成する
  var object = new CSS3DObject(div);
  return object;
}

export default ThreeScene;
