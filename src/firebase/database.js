import {firebase} from '@react-native-firebase/database';

const db = firebase
  .app()
  .database(
    'https://hyra-720a2-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

export default db;
