import db from '../firebase/database';

export let fetchedData = null;
const Ref = db.ref(`/currentGameVersions`);
const fetchData = async () => {
  if (fetchedData === null) {
    const snapshot = await Ref.once('value');
    fetchedData = snapshot.val();
    console.log('fetched data');
    return fetchedData;
  }
};

export default fetchData;
