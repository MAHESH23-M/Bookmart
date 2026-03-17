const firebaseConfig = {
  apiKey: "AIzaSyAKRnRNofQrNS-18mOeNKmt17TkFD1iRdI",
  authDomain: "bookmart-b8a2e.firebaseapp.com",
  projectId: "bookmart-b8a2e",
  storageBucket: "bookmart-b8a2e.appspot.com", // ✅ FIXED
  messagingSenderId: "80032351127",
  appId: "1:80032351127:web:fb9e8c13e63a7262977ad2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();