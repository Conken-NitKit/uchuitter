import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import favTweet from "./functions/favTweet";
import createTimeLine from "./functions/createTimeLine";
import generateUuid from "./functions/generateUuid";

const App = (props) => {
  const [tweet, setTweet] = useState("");
  const [myAccount, setMyAccount] = useState(null);
  const [timeLine, setTimeLine] = useState([]);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (user) => {
      const uchuitterRef = user && db.collection("uchuitter").doc(user.uid);
      if (user) {
        await uchuitterRef
          .get()
          .then((doc) => !myAccount && setMyAccount(doc.data()))
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
    console.log({
      apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    })
    createTimeLine((newTimeLine) => setTimeLine(newTimeLine));
  }, []);

  return (
    <div>
      <h1>{myAccount && myAccount.displayName}</h1>
      <textarea value={tweet} onChange={(e) => setTweet(e.target.value)} />
      <button
        onClick={async () => {
          const postData = {
            ...myAccount,
            tweets: [
              ...myAccount.tweets,
              {
                autherId: myAccount.id,
                tweetId: generateUuid(),
                content: tweet,
                createAt: new Date(),
                like: [],
              },
            ],
          };
          await setMyAccount(postData);
          await db.collection("uchuitter").doc(myAccount.id).set(postData);
          await createTimeLine((newTimeLine) =>
            setTimeLine(newTimeLine)
          );
        }}
      >
        Tweet
      </button>
      <br />
      <button
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        logout
      </button>
      <br />
      <ul>
        {myAccount &&
          timeLine.map((tweet) => (
            <li key={tweet.tweetId}>
              <hr />
              <p>{tweet.autherId}</p>
              <p>
                {tweet.content}: (
                {tweet.autherId === myAccount.id ? "me" : "other"})
              </p>
              <p>{tweet.tweetId}</p>
              <button
                onClick={async () => {
                  await favTweet(tweet.tweetId, tweet.autherId, myAccount.id);
                  await createTimeLine((newTimeLine) =>
                    setTimeLine(newTimeLine)
                  );
                }}
              >
                いいね({tweet.like.indexOf(myAccount.id) === -1 ? "未" : "済"}){" "}
                {tweet.like.length}
              </button>
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
