import React from "react";
import styled from "styled-components";

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding-top: 3%;
  background: rgba(91, 112, 131, 0.4);
  border-radius:15px;
  z-index: 99;
`;
const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 640px;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 12px rgba(228, 224, 23, 0.4);
  border: 1px solid rgba(31, 121, 109, 0.75);
  border-radius:20px;

`;

const ModalTitle = styled.p`
  position:relative;
  display:inline-block;
  font-family: monospace;
  font-size: 100%;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: white;
  border-top:solid 1px white;
  border-bottom:solid 1px white;
  padding:5%;
  background:linear-gradient(rgba(228, 224, 23, 0.4),rgba(0, 0, 0, 0.7));

`;

const ModalBody = styled.p`
  font-family: monospace;
  font-size: 20px;
  color: white;
  text-align: center;
  margin-bottom:10%;
`;
const ModalChoice = styled.p`
  position:absolute;
  right: 16px;
  bottom: 16px;
  text-align:center;
  font-family: monospace;
  font-size: 100%;
  color: white;
  padding:1%;
  display:inline-block;
  border:solid 1px white;
  border-radius:10px;
  -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all  0.3s ease;
    text-align:right;
  &:before{
      content:"×";
  }
  &:hover{
      color:white;
      border-color:white;
      background:rgba(228, 224, 23, 0.2);
  }
`;

const PopupAttention = (props) => {
  return(
   <ModalBack>
      <Modal>
          <ModalTitle>ATTENTION</ModalTitle>
          <ModalBody>禁止用語が含まれているため､うちゅいーとできません。</ModalBody>
          <ModalChoice onClick={props.close}>Close</ModalChoice>
        </Modal>
    </ModalBack>
  )
}

export default PopupAttention;