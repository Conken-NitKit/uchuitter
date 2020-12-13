import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";

const Login = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Register" : "Login"}
      </button>
      <br />
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  await auth.onAuthStateChanged(async (user) => {
                    if (user) {
                      const uchuitterRef = db
                        .collection("uchuitter")
                        .doc(user.uid);
                      !(await uchuitterRef.get()).exists &&
                        uchuitterRef.set({
                          id: user.uid,
                          email: user.email,
                          displayName: user.email,
                          follow: [],
                          follower: [],
                          tweets: [],
                        });
                    }
                  });
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  await auth.onAuthStateChanged(async (user) => {
                    if (user) {
                      const uchuitterRef = db
                        .collection("uchuitter")
                        .doc(user.uid);
                      !(await uchuitterRef.get()).exists &&
                        uchuitterRef.set({
                          id: user.uid,
                          email: user.email,
                          displayName: user.email,
                          follow: [],
                          follower: [],
                          tweets: [],
                        });
                    }
                  });
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        login
      </button>
    </div>
  );
};

export default Login;
