import firebase from 'firebase';

export const inicializeFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyA5Jgwl-hhKEqtwgDck5X7Gp7rMshP47Wg",
        authDomain: "tattoostudio-c7482.firebaseapp.com",
        databaseURL: "https://tattoostudio-c7482.firebaseio.com",
        projectId: "tattoostudio-c7482",
        storageBucket: "tattoostudio-c7482.appspot.com",
        messagingSenderId: "840973630968",
        appId: "1:840973630968:web:0ec029c426450fbaebaa0d"
    });
}

export const askForNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        return token;
    } catch (error) {
        console.error(error);
    }
}