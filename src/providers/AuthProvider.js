import React, {createContext, useEffect, useState} from 'react';
// import {
//   login,
//   signin_with_google,
//   signout,
//   signup,
// } from '../firebase/authFunctions';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import db from '../firebase/database';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '998672992934-q0erdvpim3i5ku28jgnqf9n83858ist6.apps.googleusercontent.com',
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => {
          return new Promise(async (resolve, reject) => {
            try {
              await auth().signInWithEmailAndPassword(email, password);
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        },
        signup: (name, email, password) => {
          return new Promise(async (resolve, reject) => {
            try {
              const res = await auth().createUserWithEmailAndPassword(
                email,
                password,
              );
              const user = res.user;
              db.ref(`/users/${user.uid}`)
                .set({
                  name: name,
                  email: user.email,
                })
                .then(() => {
                  resolve(user);
                });
            } catch (error) {
              reject(error);
            }
          });
        },
        signout: () => {
          return new Promise(async (resolve, reject) => {
            try {
              const isSignedIn = await GoogleSignin.isSignedIn();
              if (isSignedIn) {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
              }
              await auth().signOut();
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        },
        signin_with_google: () => {
          return new Promise(async (resolve, reject) => {
            try {
              await GoogleSignin.hasPlayServices();
              const {accessToken, idToken} = await GoogleSignin.signIn();
              const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
              );
              const res = await auth().signInWithCredential(credential);
              const user = res.user;
              const onValueChange = db
                .ref(`/users/${user.uid}`)
                .on('value', snapshot => {
                  if (!snapshot.exists()) {
                    db.ref(`/users/${user.uid}`).set({
                      name: user.displayName,
                      email: user.email,
                    });
                  }
                });
              const unsubscribe = () =>
                db.ref(`/users/${user.uid}`).off('value', onValueChange);
              resolve(unsubscribe);
            } catch (error) {
              reject(error);
            }
          });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
