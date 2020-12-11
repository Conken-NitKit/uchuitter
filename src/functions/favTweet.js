import { db } from "../firebase";

const favTweet = async (tweetId, autherId, judgeId) => {
  const UchuitterRef = db.collection("uchuitter").doc(autherId);
  await UchuitterRef.get().then(async (doc) => {
    // firestore上から最新のデータを取得
    const fetchData = doc.data();

    // firestoreに投稿するデータを生成
    const postData = {
      ...fetchData,
      tweets: (() => {
        // ファボされたユーザーのTLを格納した変数
        const replaceTweets = fetchData.tweets;

        // 置き換えるツイートのインデックス番号を格納する変数
        const replaceTweetIndex = replaceTweets.findIndex(
          (replaceTweet) => replaceTweet.tweetId === tweetId
        );

        if (replaceTweetIndex === -1) return fetchData;

        // 置き換えるツイートを格納する変数
        const replaceTweet = replaceTweets[replaceTweetIndex];

        // ファボったユーザーが過去にファボ済みなのかをチェック(ファボっていればそのインデックス番号)
        const judgeIndex = replaceTweet.like.indexOf(judgeId);

        replaceTweets.splice(replaceTweetIndex, 1, {
          ...replaceTweet,
          like:
            judgeIndex === -1
              ? [...replaceTweet.like, judgeId]
              : (() => {
                  const removedLikeList = replaceTweet.like;
                  removedLikeList.splice(judgeIndex, 1);
                  return removedLikeList;
                })(),
        });

        return replaceTweets;
      })(),
    };
    await UchuitterRef.set(postData);
  });
};
export default favTweet;
