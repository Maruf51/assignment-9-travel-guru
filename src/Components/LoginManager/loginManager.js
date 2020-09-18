import * as firebase from "firebase/app";
import firebaseConfig from "../../firebase.config"
import "firebase/auth";

    export const initializeLoginFrameworkFirebase = () => {
        firebase.initializeApp(firebaseConfig);
    }

    export const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
              };
            return signedInUser;
        })
        .catch(function(error) {
            const signedInUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                success: false,
                error: error.message
              };
            return signedInUser;
        });
    }

    export const facebookSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            };
            return signedInUser;
        })
        .catch(error => {
            const signedInUser ={
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                success: false,
                error: error.message
            }
            return signedInUser;
        })
    }

    export const createNewAccount = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(res => {
            const userInfo = {
                success: true,
                error: ''
            }
            return userInfo;
          })
          .catch(function(error) {
            const userInfo = {
                success: false,
                error: error.message
            }
            // console.log(error)
            return userInfo;
          });
    }

    export const createUserInfo = (firstName, lastName) => {
        var users = firebase.auth().currentUser;

        users.updateProfile({
        displayName: firstName + ' ' + lastName
        }).then(function() {
        
        }).catch(function(error) {
            
        });
    }

    export const handleLogin = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const {displayName, email} = res.user;
            const userInfo = {
                name: displayName,
                email: email,
                isSignedIn: true,
                error: '',
                success: true,
            }
            return userInfo;
        })
        .catch(function(error) {
            const userInfo = {
                isSignedIn: false,
                error: error.message,
                success: false,
            }
            return userInfo;
          });
    }

    export const userLoggedOut = () => {
        return firebase.auth().signOut()
        .then(res => {
            const signOut = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signOut;
          })
          .catch(function(error) {
            console.log(error.message)
          });
    }