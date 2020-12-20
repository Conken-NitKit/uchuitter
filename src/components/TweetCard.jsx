import React from "react";
import styled from "styled-components";

const TweetCard = styled.div`
  width: 250px;
  height: 250px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 10px double rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  line-height: normal;
  transition: top 0.2s linear;
  background-color: rgba(18, 77, 174, ${(props) => props.opacity});
  padding: 10px 10px;
  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
    border: 10px solid rgba(239, 255, 167, 0.75);
  }
`;

const TweetText = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
  word-wrap: break-word;
`;

const AuthorText = styled.p`
  font-size: 15px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
  border: 1px double;
  color: rgba(244, 255, 95, 0.75);
`;

const DateText = styled.p`
  font-size: 10px;
  position: absolute;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
  color: rgba(244, 255, 95, 0.75);
  bottom: 0;
`;

const Tweet = (props) => (
  <TweetCard opacity={Math.random() * 0.55 + 0.3}>
    <AuthorText>
      {props.autherId}
    </AuthorText>
    <TweetText>
      {props.content}
    </TweetText>
    <DateText>
      {/* {new Date(props.createAt)} */}
    </DateText>
  </TweetCard>
);

export default Tweet;
