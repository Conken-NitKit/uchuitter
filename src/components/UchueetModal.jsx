import React, { useState } from "react";
import styled from "styled-components";
import Close from "react-ionicons/lib/MdClose";

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  padding-top: 3%;
  background: rgba(91, 112, 131, 0.4);
  z-index: 99;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalHeader = styled.div`
  height: 54px;
  width: 90vw;
  max-width: 720px;
  padding: 11px 16px;
  border-radius: 16px 16px 0 0;
  background-color: rgb(21, 32, 43);
  border-bottom: solid 0.5px rgba(61, 84, 102, 0.5);
`;

const ModalBody = styled.div`
  height: 256px;
  max-width: 720px;
  background-color: rgb(21, 32, 43);
`;

const ModalTextField = styled.textarea`
  background: none;
  outline: none;
  resize: none;
  border: none;
  color: white;
  width: 80%;
  height: 100%;
  margin: 12px 20px;
  font-size: 20px;
`;

const ModalFooter = styled.div`
  height: 76px;
  width: 90vw;
  max-width: 720px;
  border-radius: 0 0 16px 16px;
  background-color: rgb(21, 32, 43);
  border-top: solid 0.5px rgba(61, 84, 102, 0.5);
`;

const UchueetButton = styled.button`
  position: absolute;
  right: 12px;
  border: none;
  outline: none;
  color: white;
  font-size: 22px;
  line-height: 32px;
  height: 44px;
  border-radius: 22px;
  font-weight: bold;
  padding: 2px 16px;
  margin: 12px 8px;
  background-color: rgb(29, 161, 242);
`;

const UchueetModal = (props) => {
  return (
    <ModalBack>
      <Modal>
        <ModalHeader>
          <Close
            fontSize="32px"
            color="rgb(29,161,242)"
            onClick={() => props.close()}
          />
        </ModalHeader>
        <ModalBody>
          <ModalTextField placeholder={"宇宙空間にメッセージを送ろう！！"} />
        </ModalBody>
        <ModalFooter>
          <UchueetButton
            onClick={() => {
              props.close();
            }}
          >
            うちゅいーとする
          </UchueetButton>
        </ModalFooter>
      </Modal>
    </ModalBack>
  );
};

export default UchueetModal;
