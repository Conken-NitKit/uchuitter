import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import generateUuid from "../functions/generateUuid";
import Close from "react-ionicons/lib/MdClose";
import PopupAttention from "./PopupAttention";

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
  color: ${(props) => (props.disabled ? "red" : "white")};
  padding-left: 40px;
  padding-top: 10px;
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
  margin: 6px 8px;
  background-color: rgb(29, 161, 242);
`;

const UchueetModal = (props) => {
  const [account, setAccount] = useState(null);
  const [tweetText, setTweetText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showAttention, setShowAttension] = useState(false);
  const [numberOfWords, setNumberOfWords] = useState(0);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      const uchuitterRef = user && db.collection("uchuitter").doc(user.uid);
      if (user) {
        await uchuitterRef
          .get()
          .then((doc) => !account && setAccount(doc.data()))
          .catch((err) => console.log("Error getting documents", err));
      } else {
        props.history.push("login");
      }
    });
    return () => {
      unSub();
    };
  });

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
          <ModalTextField
            value={tweetText}
            placeholder={"宇宙空間にメッセージを送ろう！！"}
            onChange={(e) => {
              setTweetText(e.target.value);
              setNumberOfWords(e.target.value.length);
              setDisabled(numberOfWords > 140);
            }}
          />
        </ModalBody>
        <ModalFooter disabled={disabled}>
          <UchueetButton
            disabled={disabled}
            onClick={async () => {
              const ngWord = [
                "ばか",
                "あほ",
                "ごみかす",
                "しね",
                "くそやろう",
                "ﾀﾋね",
                "ころす",
                "きしょい",
                "バカ",
                "馬鹿",
                "死ね",
                "アホ",
                "気持ち悪い",
                "キモい",
                "ハゲ",
                "チビ",
                "デブ",
              ];
              for (let i = 0; i < ngWord.length; i++) {
                const result = tweetText.indexOf(ngWord[i]);
                if (result !== -1) {
                  setShowAttension(true);
                  return;
                }
              }
              const postData = {
                ...account,
                tweets: [
                  ...account.tweets,
                  {
                    autherId: account.id,
                    tweetId: generateUuid(),
                    content: tweetText,
                    createAt: new Date(),
                    like: [],
                  },
                ],
              };
              await db.collection("uchuitter").doc(account.id).set(postData);
              props.close();
            }}
          >
            うちゅいーとする
          </UchueetButton>
          <div id="counter">
            <h3>{numberOfWords} / 140</h3>
          </div>
        </ModalFooter>
        {showAttention && (
          <PopupAttention close={() => setShowAttension(false)} />
        )}
      </Modal>
    </ModalBack>
  );
};

export default UchueetModal;
