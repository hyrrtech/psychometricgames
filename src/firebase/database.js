import {firebase} from '@react-native-firebase/database';
const uid = firebase.auth().currentUser.uid;
const db = firebase
  .app()
  .database(
    'https://hyra-720a2-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

export const BARTRef = db.ref(`/users/${uid}/BART/`);
export default db;
