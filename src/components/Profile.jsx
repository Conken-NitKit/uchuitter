import React, { useState } from "react";
import styled from "styled-components";
import Create from "react-ionicons/lib/MdCreate";
import Close from "react-ionicons/lib/MdClose";
import Trash from "react-ionicons/lib/IosTrashOutline";

import TrashModal from "./TrashModal";

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
  font-size: 28px;
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

const DateSpan = styled.span`
  font-size: 14px;
  padding-left: 32px;
  color: rgba(127, 255, 255, 0.75);
`;

const TrashIconDiv = styled.div`
  position: absolute;
  top: 28px;
  right: 48px;
`;

const Profile = (props) => {
  const [userName, setUserName] = useState("kubo-hide-kun");
  const [canEdit, setCanEdit] = useState(false);
  const [canTrash, setCanTrash] = useState(false);

  return (
    <ProfileDiv>
      <CloseDiv>
        <Close
          fontSize="48px"
          color="rgba(127, 255, 255, 0.9)"
          onClick={() => props.close()}
        />
      </CloseDiv>
      <DefaultDiv>
        <UserNameDiv>
          <UserNameLabel for="name_input">ユーザーネーム</UserNameLabel>
          <UserNameInput
            id="name_input"
            value={userName}
            disabled={canEdit ? "" : "disabled"}
            onChange={(e) => canEdit && setUserName(e.target.value)}
          />
          <UserNameIcon>
            {canEdit ? (
              <Close
                onClick={() => setCanEdit(false)}
                fontSize="28px"
                color="rgba(127, 255, 255, 0.75)"
              />
            ) : (
              <Create
                onClick={() => setCanEdit(true)}
                fontSize="28px"
                color="rgba(127, 255, 255, 0.75)"
              />
            )}
          </UserNameIcon>
        </UserNameDiv>
      </DefaultDiv>
      {new Array(10).fill().map((_) => (
        <DefaultDiv>
          <TweetCard>
            <AuthorText>
              kubo-hide-kun
              <DateSpan>12月9日</DateSpan>
            </AuthorText>
            <TweetText>
              雪見だいふく、「一つ頂戴」と言わずに「半分頂戴」と自分の発言の罪深さを噛み締めながら分けてくれるように言ってほしい。
            </TweetText>
            <TrashIconDiv>
              <Trash
                onClick={() => setCanTrash(true)}
                fontSize="28px"
                backgroundcolor="rgba(153,195,153,0.75)"
                color="rgba(153, 195, 153, 0.75)"
              />
            </TrashIconDiv>
          </TweetCard>
        </DefaultDiv>
      ))}
      {canTrash && <TrashModal close={() => setCanTrash(false)}/>}
    </ProfileDiv>
  );
};

export default Profile;
