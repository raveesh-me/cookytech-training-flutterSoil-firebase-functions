import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onCall((data, context) => {
    console.log(data);
    console.log(context.auth);
    return {
        name: "Raveesh",
        message: "some message",
    };
});

export const logDeletedUserDetails = functions.auth.user().onDelete((user, context) => {
    console.log(user.email)
    console.log('just deleted his account')
    return;
});

export const addUserToDatabase = functions.auth.user().onCreate((user) => {
    console.log('we got a new user!!');
    console.log(user);
    return admin.firestore().doc(`soil_app/beta/users/${user.uid}`).set({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
    });

});


export const onUserNameChange = functions.firestore.document('soil_app/beta/users/{userID}').onUpdate(async (change, context) => {
    console.log(change.after.data());
    console.log(change.before.data());
    return;
});