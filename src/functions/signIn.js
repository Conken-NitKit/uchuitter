import { auth, db } from "../firebase";

const signIn = async (email, password, props) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    await auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uchuitterRef = db.collection("uchuitter").doc(user.uid);
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
};

export default signIn;
