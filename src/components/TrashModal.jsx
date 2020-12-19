import React from "react";
import styled from "styled-components";

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
  width: 80vw;
  max-width: 640px;
  background-color: rgba(9, 53, 61, 0.7);
  box-shadow: 0px 0px 12px rgba(5, 109, 95, 0.75);
  border: 1px solid rgba(31, 121, 109, 0.75);
`;

// 削除
const ModalTitle = styled.p`
  font-family: monospace;
  font-size: 20px;
  color: white;
  padding-top: 7px;
  padding-left: 25px;
`;

// このページを削除しますか
const ModalBody = styled.p`
  font-family: monospace;
  font-size: 20px;
  color: white;
  padding-top: 10px;
  padding-left: 25px;
`;

const ModalChoice = styled.p`
  font-family: monospace;
  font-size: 20px;
  color: white;
  padding-bottom: 5px;
  padding-right: 20px;
`;

const ModalChoices = styled.div`
  font-family: monospace;
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 5px;
  padding-right: 15px;
`;

const TrashModal = (props) => {
  return (
    <ModalBack>
      <Modal>
        <ModalTitle>削除</ModalTitle>
        <ModalBody>この投稿を削除しますか?</ModalBody>
        <ModalChoices>
          <ModalChoice onClick={props.close}>OK</ModalChoice>
          <ModalChoice onClick={props.close}>Cansel</ModalChoice>
        </ModalChoices>
      </Modal>
    </ModalBack>
  );
};

export default TrashModal;
