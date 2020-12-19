import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Profile from "./Profile";
import UchueetModal from "./UchueetModal"

const PlanetRotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const HumbergerList = styled.ul`
  margin-top: 150px;
`;

const HumbergerContent = styled.li`
  font-size: 30px;
  line-height: 30px;
  color: white;
  margin-top: 50px;
  list-style: none;
  border-bottom: solid white 1px;
  padding: 5px;
`;

const HumbergerBar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-320px")};
  width: 300px;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(39, 39, 39, 0.8),
    rgba(41, 152, 204, 0.5),
    rgba(51, 190, 255, 0.6)
  );
  transition: 0.3s all;
`;

const HumbergerButton = styled.div`
  position: fixed;
  top: 48px;
  right: 72px;
  z-index: 5;
  background-color: white;
`;

const LineTop = styled.div`
  position: absolute;
  top: ${(props) => (props.isOpen ? 0 : -18)}px;
  content: "";

  transition: 0.3s;
  width: 48px;
  height: 10px;
  padding: 2px;
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
  width: 48px;
  height: 10px;
  padding: 2px;
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
  width: 48px;
  height: 10px;
  padding: 2px;
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
  background-color: none;
  transition: 0.35s all;
  border-color: rgba(
    ${(props) => (props.isHidden ? "51, 190, 255, 0" : "51, 190, 255, 0.8")}
  );
`

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
  border-color: rgba(
    ${(props) => (props.isHidden ? "51, 190, 255, 0" : "51, 190, 255, 0.8")}
  );
  background-color: rgba(
    ${(props) => (props.isHidden ? "255, 255, 255, 0" : "0, 0, 0, 0.8")}
  );
`

const PlanetRight = styled.div`
  position: absolute;
  top: 21px;
  right: -6px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 5px solid;
  transition: 0.35s all;
  border-color: rgba(
    ${(props) => (props.isHidden ? "51, 190, 255, 0" : "51, 190, 255, 0.8")}
  );
  background-color: rgba(
    ${(props) => (props.isHidden ? "255, 255, 255, 0" : "0, 0, 0, 0.8")}
  );
`

const Humberger = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [viewEditor, setViewEditor] = useState(false);

  return (
    <>
      <HumbergerButton onClick={() => setIsOpen(!isOpen)}>
        <LineTop isOpen={isOpen} isHidden={viewProfile}/>
        <LineMiddle isHidden={isOpen || viewProfile} />
        <LineBottom isOpen={isOpen} isHidden={viewProfile}/>
      </HumbergerButton>
      <HumbergerBar isOpen={isOpen} >
        <HumbergerList>
          <HumbergerContent onClick={() => {
            setIsOpen(false);
            setViewProfile(true);
          }}>
              プロフィール
          </HumbergerContent>
          <HumbergerContent onClick={() => console.log("ユーザー検索")}>
              ユーザー検索
          </HumbergerContent>
          <HumbergerContent onClick={() => props.logout()}>
              ログアウト
          </HumbergerContent>
        </HumbergerList>
      </HumbergerBar>
      <UchueetButton isHidden={isOpen || viewProfile} onClick={() => setViewEditor(true)}/>
      <PlanetSatellites>
        <PlanetLeft isHidden={isOpen || viewProfile} />
        <PlanetRight isHidden={isOpen || viewProfile} />
      </PlanetSatellites>
      {viewProfile && <Profile close={() => setViewProfile(false)}/>}
      {viewEditor && <UchueetModal close={() => setViewEditor(false)}/>}
    </>
  );
};

export default Humberger;
