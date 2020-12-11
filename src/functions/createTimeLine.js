import { db } from "../firebase";

const createTimeLine = async (setTimeLine) => {
  const createdTimeLine = [];
  const UchuitterRef = db.collection("uchuitter")
  await UchuitterRef.get().then((querySnapshot) => {
    querySnapshot.forEach((docs) => {
      createdTimeLine.push(...docs.data().tweets)
    });
    createdTimeLine.sort((a, b) => {
      return a.createAt < b.createAt ? 1 : -1;
    });
  })
  await setTimeLine(createdTimeLine)
};

export default createTimeLine