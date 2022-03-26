import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './Redux-Store/Reducers/RootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from './Config/fbConfig';
import 'materialize-css/dist/css/materialize.min.css'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      userProfile: "Doctors",
      useFirestoreForProfile: true,
      attachAuthIsReady: true
    },
    )
  ));

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(

    <Provider store={store}>
      <App />
    </Provider>,


    document.getElementById("root")
  );
});
serviceWorker.register()