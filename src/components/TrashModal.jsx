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
  background-color: rgb(21, 32, 43);
`;

const ModalTitle = styled.p`
  color: white;
`;

const ModalBody = styled.p`
  color: white;
`;

const ModalChoices = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalChoice = styled.p`
  color: white;
`;

const TrashModal = (props) => {
  return (
    <ModalBack>
      <Modal>
        <ModalTitle>削除</ModalTitle>
        <ModalBody>この投稿を削除しますか?</ModalBody>
        <ModalChoices>
          <ModalChoice onClick={props.close}>いいえ</ModalChoice>
          <ModalChoice onClick={props.close}>はい</ModalChoice>
        </ModalChoices>
      </Modal>
    </ModalBack>
  );
};

export default TrashModal;
