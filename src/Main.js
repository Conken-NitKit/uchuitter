import * as THREE from "three/src/Three";
import { CSS3DObject, CSS3DRenderer } from "three-css3drenderer";
import React from "react";
import styled from "styled-components";
import { renderToString } from "react-dom/server";
import Humberger from "./components/Humberger";

const Renderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
    this.camera.lookAt(this.scene.position);

    // レンダラーの出力をhtml要素に追加する
    this.mount.appendChild(this.renderer.domElement);

    for (let i = 0; i < 8; i++) {

      // JSX要素を文字列(string)に変換
      const stringElement = renderToString(
        <Renderer>
          <h1>Sample Date</h1>
          <button onClick={() => console.log("ok")}>test</button>
        </Renderer>
      );

      // 生成したstringをもとにCSS3DObjectを生成する
      const cssElement = createCSS3DObject(stringElement);
      cssElement.position.set(100, 100, 100 + 50 * i);

      // マウスでホバーした時のアクション
      cssElement.element.addEventListener(
        "mouseover",
        (e) => {
          console.log(e.currentTarget);
          e.currentTarget.style.top = "200px";
        },
        false
      );

      // マウスでホバーを解除した時のアクション
      cssElement.element.addEventListener(
        "mouseout",
        (e) => {
          console.log(e.currentTarget);
          e.currentTarget.style.top = "0px";
        },
        false
      );

      // シーンに追加する
      this.scene.add(cssElement);
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
