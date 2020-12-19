import React from "react";
import styled from "styled-components";

const TweetCard = styled.div`
  max-width: 300px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  line-height: normal;
  transition: top 0.2s linear;
  background-color: rgba(18, 77, 174, ${(props) => props.opacity});
  padding: 16px 56px;
  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
    border: 1px solid rgba(127, 255, 255, 0.75);
  }
`;

const TweetText = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
`;

const AuthorText = styled.p`
  font-size: 32px;
  color: rgba(127, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
`;

const DateSpan = styled.span`
  font-size: 24px;
  padding-left: 32px;
  color: rgba(127, 255, 255, 0.75);
`;

const Tweet = () => (
  <TweetCard opacity={Math.random() * 0.55 + 0.3}>
    <AuthorText>
      kubo-hide-kun
      <DateSpan>12月9日</DateSpan>
    </AuthorText>
    <TweetText>
      雪見だいふく、「一つ頂戴」と言わずに「半分頂戴」と自分の発言の罪深さを噛み締めながら分けてくれるように言ってほしい。
    </TweetText>
  </TweetCard>
);

export default Tweet;
