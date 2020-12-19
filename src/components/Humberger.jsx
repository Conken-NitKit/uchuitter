import React, { useState } from "react";
import styled from "styled-components";

const HumbergerList = styled.ul`
  margin-top: 50%;
`;

const HumbergerContent = styled.li`
  cursor:pointer;
  font-size: 30px;
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
  &:nth-child(1)::before {
    
    content: "1";
    margin: 0 3px;
  }
  &:nth-child(2)::before {
    
    content: "2";
    margin: 0 3px;
  }
  &:nth-child(3)::before {
    
    content: "3";
    margin: 0 3px;
  }
  &:nth-child(4)::before {
    content: "4";
    margin: 0 3px;
  }
  &:nth-child(4) {
    position: absolute;
    bottom: 100px;
    padding-right: 100%;
    &:hover {
      background-size: 100%;
      color: rgba(255,255,0,0.8);
      font-weight: bold;
      border-bottom: solid rgba(204,204,0,0.5) 10px;
    }
  }
`;

const HumbergerBar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-50%")};
  width: 50%;
  max-width: 320px;
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
  cursor:pointer;

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
  background-color: white;
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
    ${(props) => (props.isOpen ? "255, 255, 255, 0" : "255, 255, 255, 1")}
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
  background-color:white;
  transform: rotate(${(props) => (props.isOpen ? -45 : 0)}deg);

`;

const Humberger = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <HumbergerButton onClick={() => setIsOpen(!isOpen)}>
        <LineTop isOpen={isOpen} />
        <LineMiddle isOpen={isOpen} />
        <LineBottom isOpen={isOpen} />
      </HumbergerButton>
      <HumbergerBar isOpen={isOpen}>
        <HumbergerList>
          <HumbergerContent>test1</HumbergerContent>
          <HumbergerContent>test2</HumbergerContent>
          <HumbergerContent>test3</HumbergerContent>
          <HumbergerContent>test4</HumbergerContent>
        </HumbergerList>
      </HumbergerBar>
    </>
  );
};

export default Humberger;
