import React, { useState } from "react";
import styled from "styled-components";

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
  &::before {
    content: "@";
    margin: 0 3px;
  }
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
  background-color: white;
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
    ${(props) => (props.isOpen ? "255, 255, 255, 0" : "255, 255, 255, 1")}
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
  background-color: white;
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
          <HumbergerContent>test5</HumbergerContent>
          <HumbergerContent>test6</HumbergerContent>
        </HumbergerList>
      </HumbergerBar>
    </>
  );
};

export default Humberger;
