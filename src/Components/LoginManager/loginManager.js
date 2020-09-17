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
            console.log(error.message)
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
        .catch(function(error) {
            console.log(error.message)
        })
    }

    export const createNewAccount = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(res => {
            const userInfo = {
                isSignedIn: false,
                displayName: '',
                email: '',
                photo: '',
                success: true,
                error: ''
            }
            return userInfo;
          })
          .catch(function(error) {
            const userInfo = {
                isSignedIn: false,
                displayName: '',
                email: '',
                photo: '',
                success: false,
                error: error.message
            }
            return userInfo;
          });
    }

    export const createUserInfo = (firstName, lastName, password) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: firstName + ' ' + lastName,
        password: password
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
                error: error.message,
                success: false,
            }
            return userInfo;
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // const newUser = {...user};
            // newUser.error = error.message;
            // newUser.success = false;
            // setUser(newUser);
          });
    }

    // export const updateUserinfo = (userInfo) => {
    //     var user = firebase.auth().currentUser;

    //     user.updateProfile({
    //     displayName: userInfo.firstName + ' ' + userInfo.lastName,
    //     firstName: userInfo.firstName,
    //     lastName: userInfo.lastName,
    //     password: userInfo.password
    //     }).then(function() {
        
    //     }
    //     ).catch(function(error) {

    //     });
    // }

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