import React from "react";
import styled from "styled-components";
import { Canvas } from "react-three-fiber";
import Form from "./components/Form"
import Stars from "./components/Stars"
import CameraController from "./controller/cameraController";

import "./style.css";

const SpaceBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overscroll-behavior: none;
  overflow: hidden;
  background: #272727;
`;

export default function (props) {
  return (
    <div>
      <SpaceBackground>
        <Canvas>
          <CameraController />
          <Stars />
        </Canvas>
      </SpaceBackground>
      <Form history={props.history}/>
    </div>
  );
}
