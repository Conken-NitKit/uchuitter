import React, { useState } from "react";
import styled from "styled-components";

const HunbergerBar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? "0" : "-320px")};
  width: 320px;
  height: 100vh;
  background-color: red;
  transition: .2s all;
`;

const HunbergerButton = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 5;
  background-color: white;
`;

const Hunberger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <HunbergerButton onClick={() => setIsOpen(!isOpen)}>test</HunbergerButton>
    <HunbergerBar isOpen={isOpen}>
    </HunbergerBar>
    </>
  );
};

export default Hunberger;
