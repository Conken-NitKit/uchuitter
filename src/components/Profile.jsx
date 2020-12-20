import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Create from "react-ionicons/lib/MdCreate";
import Close from "react-ionicons/lib/MdClose";
import Trash from "react-ionicons/lib/IosTrashOutline";

import TrashModal from "./TrashModal";
import { db, auth } from "../firebase";

const ProfileDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  padding-top: 3%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

const CloseDiv = styled.div`
  position: fixed;
  right: 36px;
`;

const DefaultDiv = styled.div`
  position: relative;
  width: 80%;
  max-width: 640px;
  margin: 44px auto 18px;
`;

const UserNameDiv = styled.div`
  position: relative;
  left: 50%;
  width: 80vw;
  max-width: 560px;
  transform: translateX(-50%);
  padding: 28px 6px 16px;
  border-radius: 12px;
  margin: 56px 0 48px;
  background: none;
  border: solid 1px rgba(61, 84, 102, 0.8);
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.2);
`;

const UserNameLabel = styled.label`
  font-size: 16px;
  line-height: 18px;
  color: rgba(127, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
  margin: 8px 0 16px 16px;
`;

const UserNameInput = styled.input`
  width: 100%;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
  text-align: center;
  margin: 12px 0;
  background: none;
  border: none;
  outline: none;
`;

const UserNameIcon = styled.div`
  position: absolute;
  bottom: 30px;
  right: 26px;
`;

const TweetCard = styled.div`
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  line-height: normal;
  transition: top 0.2s linear;
  background-color: rgba(18, 77, 174, ${(props) => props.opacity});
  padding: 16px 36px;
  &:hover {
    box-shadow: 0px 0px 30px rgba(133, 255, 248, 0.75);
    border: 1px solid rgba(133, 255, 248, 0.75);
  }
`;

const TweetText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
`;

const AuthorText = styled.p`
  font-size: 17px;
  color: rgba(127, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
`;

const TrashIconDiv = styled.div`
  position: absolute;
  top: 30px;
  right: 48px;
`;

const Profile = (props) => {
  const [userName, setUserName] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [canTrash, setCanTrash] = useState("");

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      const uchuitterRef = user && db.collection("uchuitter").doc(user.uid);
      if (user) {
        await uchuitterRef
          .get()
          .then((doc) => !account && setAccount(doc.data()))
          .catch((err) => console.log("Error getting documents", err));
        await uchuitterRef
          .get()
          .then((doc) => !account && setUserName(doc.data().displayName))
          .catch((err) => console.log("Error getting documents", err));
      } else {
        props.history.push("login");
      }
    });
    return () => {
      unSub();
    };
  });

  useEffect(() => {
    if (userName === "") return;
    const unSub = auth.onAuthStateChanged(async (user) => {
      const uchuitterRef = user && db.collection("uchuitter").doc(user.uid);
      if (user) {
        const postData = account;
        uchuitterRef.set({ ...postData, displayName: userName });
      } else {
        props.history.push("login");
      }
    });
    return () => {
      unSub();
    };
  }, [userName]);

  return (
    <ProfileDiv>
      {/* プロフィール画面 */}
      <CloseDiv>
        {/* プロフィール画面を閉じるボタン */}
        <Close
          fontSize="48px"
          color="rgba(127, 255, 255, 0.9)"
          onClick={() => props.close()}
        />
      </CloseDiv>
      <DefaultDiv>
        <UserNameDiv>
          {/* ユーザーネーム変更画面 */}
          <UserNameLabel for="name_input">ユーザーネーム</UserNameLabel>
          <UserNameInput
            id="name_input"
            value={userName}
            disabled={canEdit ? "" : "disabled"}
            onChange={(e) => canEdit && setUserName(e.target.value)}
          />
          {/* ユーザーネーム編集をする */}
          <UserNameIcon>
            {/* ユーザーネーム編集画面のボタン */}
            {canEdit ? (
              <Close
                onClick={() => setCanEdit(false)}
                fontSize="28px"
                color="rgba(127, 255, 255, 0.75)"
              /> /* ユーザーネーム編集終了ボタン */
            ) : (
              <Create
                onClick={() => setCanEdit(true)}
                fontSize="28px"
                color="rgba(127, 255, 255, 0.75)"
              /> /* ユーザーネーム編集開始ボタン */
            )}
          </UserNameIcon>
        </UserNameDiv>
      </DefaultDiv>
      {account !== null &&
        account.tweets.map((tweet) => (
          /* プロフィール画面に自分のツイートを表示する */
          <DefaultDiv>
            <TweetCard>
              <AuthorText>{account.displayName}</AuthorText>
              <TweetText>{tweet.content}</TweetText>
              <TrashIconDiv>
                <Trash
                  onClick={() => setCanTrash(tweet.tweetId)}
                  fontSize="28px"
                  backgroundcolor="rgba(153,195,153,0.75)"
                  color="rgba(153, 195, 153, 0.75)"
                />
              </TrashIconDiv>
            </TweetCard>
          </DefaultDiv>
        ))}
      {canTrash !== "" && (
        <TrashModal
          remove={() => {
            const unSub = auth.onAuthStateChanged(async (user) => {
              const uchuitterRef =
                user && db.collection("uchuitter").doc(user.uid);
              if (user) {
                const postData = account;
                const newTweets = account.tweets.filter(
                  (pastTweet) => pastTweet.tweetId !== canTrash
                );
                setAccount({...postData, tweet: newTweets});
                await uchuitterRef.set({ ...postData, tweets: newTweets });
                props.close();
              } else {
                props.history.push("login");
              }
            });
            unSub();
            setCanTrash("");
          }}
          close={() => setCanTrash("")}
        />
      )}
    </ProfileDiv>
  );
};

export default Profile;
