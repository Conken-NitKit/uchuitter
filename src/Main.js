import * as THREE from "three/src/Three";
import { CSS3DObject, CSS3DRenderer } from "three-css3drenderer";
import React from "react";
import styled from "styled-components";
import { renderToString } from "react-dom/server";

import TweetCard from "./components/TweetCard"
import Humberger from "./components/Humberger";
import { Vector3 } from "three/src/Three";

const Renderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const StarDiv = styled.div`
//星のCSS情報
  content: "";
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: white;
  box-shadow: lightblue;
`;

// global variables
let control;

class ThreeScene extends React.Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // オブジェクト、カメラ、ライトなどの全ての要素を保持するシーンを作成する
    this.scene = new THREE.Scene();
    // カメラの定義 (視野角, アスペクト比, 近くの限界距離, 遠くの限界距離)
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // 描画領域としてのDOMを設定
    this.renderer = new CSS3DRenderer();
    this.renderer.setSize(width, height);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.top = 0;

    // カメラを指定座標に設置し、向きをシーンの中央に向ける
    this.camera.position.x = 500;
    this.camera.position.y = 475;
    this.camera.position.z = 767;
    this.camera.lookAt(new Vector3(0, 0, 500, true));

    // レンダラーの出力をhtml要素に追加する
    this.mount.appendChild(this.renderer.domElement);

    for (let i = 0; i < 8; i++) {
      // JSX要素を文字列(string)に変換
      const stringElement = renderToString(
        <TweetCard />
      );

      // 生成したstringをもとにCSS3DObjectを生成する
      const cssElement = createCSS3DObject(stringElement);
      cssElement.position.set(100, 100, 150 * (i - 3));

      cssElement.element.addEventListener(
        "click",
        () => {
          this.camera.lookAt(cssElement.position);
        },
        false
      );

      // シーンに追加する
      this.scene.add(cssElement);
    }

    const stringStar = renderToString(<StarDiv />);
    //星のデータを変換
    for (let i = 0; i < 5000; i++){
      const css3DStar = createCSS3DObject(stringStar);
      css3DStar.position.set(
        Math.random() * 3000 - 1500,
        Math.random() * 3000 - 1500,
        Math.random() * 3000 - 1500
      );
      this.scene.add(css3DStar)
    }
    
    control = {
      cameraX: 500,
      cameraY: 450,
      cameraZ: 780,
    };

    this.start();
  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <>
        <Renderer
          ref={(mount) => {
            this.mount = mount;
          }}
        />
        <Humberger />
      </>
    );
  }
}

function createCSS3DObject(s) {
  // 文字列をDOM要素に変換
  var wrapper = document.createElement("div");
  wrapper.innerHTML = s;
  var div = wrapper.firstChild;

  // DOM要素からCSSオブジェクトを生成する
  var object = new CSS3DObject(div);
  return object;
}

export default ThreeScene;
