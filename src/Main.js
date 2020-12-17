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

const TweetCard = styled.div`
  max-width: 560px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  transition: top 0.2s linear;
  background-color: rgba(18, 77, 174, ${(props) => props.opacity});
  padding: 16px 56px;
  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
    border: 1px solid rgba(127, 255, 255, 0.75);
  }
`;

const TweetText = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
`;

const AuthorText = styled.p`
  font-size: 24px;
  color: rgba(127, 255, 255, 0.75);
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
        <TweetCard opacity={Math.random() * 0.55 + 0.1}>
          <TweetText>今日、頭が冴えてるわ〜</TweetText>
          <AuthorText>kubo-hide-kun</AuthorText>
        </TweetCard>
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
