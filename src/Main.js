import * as THREE from "three/src/Three";
import { CSS3DObject, CSS3DRenderer } from "three-css3drenderer";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import React from "react";
import styled from "styled-components";
import { renderToString } from "react-dom/server";

import TweetCard from "./components/TweetCard";
import Humberger from "./components/Humberger";
import { Vector3 } from "three/src/Three";

const Renderer = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const StarDiv = styled.div`
//星のCSS情報
  content: "";
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 4.5px lightblue;

`

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
      const stringElement = renderToString(<TweetCard />);

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
  
    //星のデータを変換
    for (let i = 0; i < 1000; i++){
      
      const x = Math.random() * 3000 - 1500;
      const y = Math.random() * 3000 - 1500;
      const z = Math.random() * 3000 - 1500;

      const randomColor = ["lightskyblue", "lightgreen", "lightyellow","lightpink"];
      const stringStar = renderToString(<StarDiv color={randomColor[Math.floor(Math.random()*4)]}/>);

      const css3DStar = createCSS3DObject(stringStar);
      css3DStar.position.set(
       x,y,z
      );
      this.scene.add(css3DStar)

      const css3DStarX = createCSS3DObject(stringStar);
      css3DStarX.rotation.x = Math.PI / 2;
      css3DStarX.position.set(
        x,y,z
      )
      this.scene.add(css3DStarX)

      const css3DStarY = createCSS3DObject(stringStar);
      css3DStarY.rotation.y = Math.PI / 2;
      css3DStarY.position.set(
        x,y,z
      )
      this.scene.add(css3DStarY)
    }
    
    this.control = new TrackballControls(this.camera, this.renderer.domElement);
    this.control.minDistance = 550;
    this.control.maxDistance = 6000;
    this.control.addEventListener("change", this.render);

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
    this.control.update();
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
