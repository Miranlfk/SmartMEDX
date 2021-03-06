import PatientReducer from "./PatientReducer";
import InsuranceReducer from "./InsuranceReducer";
import MedicalReducer from "./MedicalReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

//Root Reducer to Combine all the Reducers
const rootReducer = combineReducers({
    Patient: PatientReducer,
    Medical: MedicalReducer,
    Insurance: InsuranceReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;