import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import db from './database';
GoogleSignin.configure({
  scopes: ['email'],
  webClientId:
    '998672992934-q0erdvpim3i5ku28jgnqf9n83858ist6.apps.googleusercontent.com',
});

const login = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log('There was an error logging in: ', error);
  }
};

const signup = async (name, email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    const user = res.user;

    db.ref(`/users/${user.uid}`).set({
      name: name,
      email: user.email,
    });
  } catch (error) {
    console.log('There was an error signing up: ', error);
  }
};

const signin_with_google = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);
    const res = await auth().signInWithCredential(credential);
    const user = res.user;
    db.ref(`/users/${user.uid}`).once('value', snapshot => {
      if (!snapshot.exists()) {
        db.ref(`/users/${user.uid}`).set({
          name: user.displayName,
          email: user.email,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const signout = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    await auth().signOut();
  } catch (error) {
    console.log('There was an error signing out:', error);
  }
};
export {login, signup, signin_with_google, signout};
