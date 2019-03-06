import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingReducer from "./reducers/settingReducer";

const firebaseConfig = {
  apiKey: "AIzaSyAigiPuBqocYst9ZYJROSBxnHEe4wo9XRY",
  authDomain: "reactclientpanel-f78f0.firebaseapp.com",
  databaseURL: "https://reactclientpanel-f78f0.firebaseio.com",
  projectId: "reactclientpanel-f78f0",
  storageBucket: "reactclientpanel-f78f0.appspot.com",
  messagingSenderId: "867987140027"
};

// reatc-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// firebase init
firebase.initializeApp(firebaseConfig);
//init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingReducer
});
//check for local storage
if (localStorage.getItem("settings") == null) {
  const defaultState = {
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true,
    allowRegistration: false
  };
  localStorage.setItem("settings", JSON.stringify(defaultState));
}

const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
