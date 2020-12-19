import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Add from "react-ionicons/lib/MdAdd";

import Profile from "./Profile";
import UchueetModal from "./UchueetModal";

const PlanetRotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const HumbergerList = styled.ul`
  margin-top: 50%;
`;

const HumbergerContent = styled.li`
  cursor: pointer;
  font-size: 20px;
  line-height: 70%;
  color: white;
  margin-top: 30%;
  list-style: none;
  border-bottom: solid white 2px;
  padding: 5px;
  background-color: none;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  &:hover {
    background-size: 100%;
    color: rgba(255, 255, 255, 0.9);
    font-weight: bold;
    border-bottom: solid rgba(255, 255, 255, 0.5) 10px;
  }
`;

const HumbergerBar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-240px")};
  width: 240px;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(39, 39, 39, 0),
    rgba(41, 152, 204, 0.5),
    rgba(51, 190, 255, 0.6)
  );
  transition: 0.3s all;
`;

const HumbergerButton = styled.div`
  position: fixed;
  top: 5%;
  right: 72px;
  z-index: 5;
  cursor: pointer;
`;

const LineTop = styled.div`
  position: absolute;
  top: ${(props) => (props.isOpen ? 0 : -18)}px;
  content: "";

  transition: 0.3s;
  width: 40px;
  height: 1px;
  padding: 2px;
  border-radius: 20%;
  transition: 0.5s;
  background-color: rgba(
    ${(props) => (props.isHidden ? "255, 255, 255, 0" : "255, 255, 255, 1")}
  );
  transform: rotate(${(props) => (props.isOpen ? 45 : 0)}deg);
`;

const LineMiddle = styled.div`
  position: absolute;
  top: 0px;
  content: "";

  transition: 0.5s;
  width: 40px;
  height: 1px;
  padding: 2px;
  border-radius: 20%;
  transition: 0.3s all;
  visibility: ${(props) => (props.isOpen ? "hidden" : "visible")};
  background-color: rgba(
    ${(props) => (props.isHidden ? "255, 255, 255, 0" : "255, 255, 255, 1")}
  );
`;

const LineBottom = styled.div`
  position: absolute;
  top: ${(props) => (props.isOpen ? 0 : 18)}px;
  content: "";

  transition: 0.3s;
  width: 40px;
  height: 1px;
  padding: 2px;
  border-radius: 20%;
  transition: 0.5s;
  background-color: rgba(
    ${(props) => (props.isHidden ? "255, 255, 255, 0" : "255, 255, 255, 1")}
  );
  transform: rotate(${(props) => (props.isOpen ? -45 : 0)}deg);
`;

const UchueetButton = styled.div`
  position: fixed;
  right: 32px;
  bottom: 48px;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  border: 5px solid;
  background-color: rgb(37, 39, 41);
  transition: 0.35s all;
  border-color: rgb(51, 190, 255);
`;

const PlanetSatellites = styled.div`
  position: fixed;
  right: 32px;
  bottom: 48px;
  height: 64px;
  width: 64px;
  animation: ${PlanetRotate} 4s linear infinite;
`;

const PlanetLeft = styled.div`
  position: absolute;
  top: 21px;
  left: -6px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 5px solid;
  transition: 0.35s all;
  border-color: rgb(51, 190, 255);
  background: rgb(37, 39, 41);
`;

const PlanetRight = styled.div`
  position: absolute;
  top: 21px;
  right: -6px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 5px solid;
  transition: 0.35s all;
  border-color: rgb(51, 190, 255);
  background: rgb(37, 39, 41);
`;

const UchueetIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Humberger = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [viewEditor, setViewEditor] = useState(false);
  /*
  stateの宣言 上から
  ハンバーガーメニューを出す
  プロフィールを出す
  うちゅいーと画面を出す
  */
  

  return (
    <>
      <HumbergerButton onClick={() => setIsOpen(!isOpen)}>
        <LineTop isOpen={isOpen} isHidden={viewProfile} />
        <LineMiddle isHidden={isOpen || viewProfile} />
        <LineBottom isOpen={isOpen} isHidden={viewProfile} />
      </HumbergerButton>
      <HumbergerBar isOpen={isOpen}>
        <HumbergerList>
          <HumbergerContent
            onClick={() => {
              setIsOpen(false);
              setViewProfile(true);
            }}
          >
            プロフィール
          </HumbergerContent>
          <HumbergerContent onClick={() => console.log("コビルンルン")}>
            ???
          </HumbergerContent>
          <HumbergerContent onClick={() => props.logout()}>
            ログアウト
          </HumbergerContent>
        </HumbergerList>
      </HumbergerBar>
      <UchueetButton
        isHidden={isOpen || viewProfile}
        onClick={() => setViewEditor(true)}
      >
        <PlanetSatellites>
          <PlanetLeft isHidden={isOpen || viewProfile} />
          <PlanetRight isHidden={isOpen || viewProfile} />
        </PlanetSatellites>
        <UchueetIcon>
          <Add fontSize="32px" color="rgba(51, 190, 255, 0.8)" />
        </UchueetIcon>
      </UchueetButton>
      {viewProfile && <Profile close={() => setViewProfile(false)} />}
      {viewEditor && <UchueetModal close={() => setViewEditor(false)} />}
    </>
  );
};

export default Humberger;
