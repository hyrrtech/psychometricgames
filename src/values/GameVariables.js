import db from '../firebase/database';

let fetchedData = null;
const Ref = db.ref(`/currentGameVersions`);
const fetchData = async () => {
  if (fetchedData === null) {
    const snapshot = await Ref.once('value');
    fetchedData = snapshot.val();
  }

  return fetchedData;
};
fetchData();

export default fetchedData;
