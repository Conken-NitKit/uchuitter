import * as THREE from "three/src/Three";
import { CSS3DObject, CSS3DRenderer } from "three-css3drenderer";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import React from "react";
import styled from "styled-components";
import { renderToString } from "react-dom/server";
import { auth } from "./firebase";

import TweetCard from "./components/TweetCard";
import Humberger from "./components/Humberger";
import { Vector3 } from "three/src/Three";

const Renderer = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
//星のcss情報
const StarDiv = styled.div`
  content: "";
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 4.5px lightblue;

`
//のcss情報
const CubeDiv = styled.div`
  height: 800px;
  width: 800px;
  border: 100px double rgba(127, 255, 255, 1);
  background-color: rgba(0, 255, 255, 0.5);
`
class ThreeScene extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}
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
		this.camera.position.x = 1000;
		this.camera.position.y = 1000;
		this.camera.position.z = 1000;
		this.camera.lookAt(new Vector3(0, 0, 500, true));

		// レンダラーの出力をhtml要素に追加する
		this.mount.appendChild(this.renderer.domElement);

		//ツイート内容の配置 
		const vector = new THREE.Vector3();
		for (let i = 0, l = 60; i < l; i++) {
			// JSX要素を文字列(string)に変換
			const stringElement = renderToString(<TweetCard />);

			// 生成したstringをもとにCSS3DObjectを生成する
			const cssElement = createCSS3DObject(stringElement);

			const phi = Math.acos(- 1 + (2 * i) / l);
			const theta = Math.sqrt(l * Math.PI) * phi;

			cssElement.position.setFromSphericalCoords(1000, phi, theta);

			vector.copy(cssElement.position).multiplyScalar(2);

			cssElement.lookAt(vector);

			// シーンに追加する
			this.scene.add(cssElement);
		}

		//コンテンツの表示
		const stringCube = renderToString(<CubeDiv />);
		const css3DCube = createCSS3DObject(stringCube);

		css3DCube.position.set(
			0, 0, 410
		);
		this.scene.add(css3DCube)

		const css3DCube2 = createCSS3DObject(stringCube);
		css3DCube2.position.set(
			0, 0, -410
		);
		this.scene.add(css3DCube2)

		const css3DCube3 = createCSS3DObject(stringCube);
		css3DCube3.rotation.y = Math.PI / 2;
		css3DCube3.position.set(
			410, 0, 0
		);
		this.scene.add(css3DCube3)

		const css3DCube4 = createCSS3DObject(stringCube);
		css3DCube4.rotation.y = Math.PI / 2;
		css3DCube4.position.set(
			-410, 0, 0
		);
		this.scene.add(css3DCube4)

		const css3DCube5 = createCSS3DObject(stringCube);
		css3DCube5.rotation.x = Math.PI / 2;
		css3DCube5.position.set(
			0, 410, 0
		);
		this.scene.add(css3DCube5)

		const css3DCube6 = createCSS3DObject(stringCube);
		css3DCube6.rotation.x = Math.PI / 2;
		css3DCube6.position.set(
			0, -410, 0
		);
		this.scene.add(css3DCube6)


		//星背景の表示
		for (let i = 0; i < 400; i++) {

			const x = Math.random() * 3000 - 1500;
			const y = Math.random() * 3000 - 1500;
			const z = Math.random() * 3000 - 1500;

			const randomColor = ["lightskyblue", "lightgreen", "lightyellow", "lightpink"];
			const stringStar = renderToString(<StarDiv color={randomColor[Math.floor(Math.random() * 4)]} />);

			const css3DStar = createCSS3DObject(stringStar);
			css3DStar.position.set(
				x, y, z
			);
			this.scene.add(css3DStar)

			const css3DStarX = createCSS3DObject(stringStar);
			css3DStarX.rotation.x = Math.PI / 2;
			css3DStarX.position.set(
				x, y, z
			)
			this.scene.add(css3DStarX)

			const css3DStarY = createCSS3DObject(stringStar);
			css3DStarY.rotation.y = Math.PI / 2;
			css3DStarY.position.set(
				x, y, z
			)
			this.scene.add(css3DStarY)
		}

		this.control = new TrackballControls(this.camera, this.renderer.domElement);
		this.control.minDistance = 550;
		this.control.maxDistance = 1800;
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
				<Humberger
					logout={async () => {
						try {
							await auth.signOut();
							this.props.history.push("login");
						} catch (error) {
							alert(error.message);
						}
					}}
				/>
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
