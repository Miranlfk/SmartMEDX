export const patient_signIn = (credential) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then(() => {//dispatching the relevant Patient actinon types
            dispatch({ type: 'PATIENT_LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'PATIENT_LOGIN_FAILED', err })
        })

    }
}
export const patient_signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        //signin out from auth
        firebase.auth().signOut().then(() => {
            dispatch({ type: "PATIENT_SIGNOUT_SUCCESS" });
        });
    };
};

export const patient_signUp = newPatient => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        //signup into firestore specified collection
        firebase.auth().createUserWithEmailAndPassword(newPatient.email, newPatient.password).then(resp => {
            return firestore.collection("Patients").doc(newPatient.patientID).set({
                firstName: newPatient.firstName,
                lastName: newPatient.lastName,
                initials: newPatient.firstName[0] + newPatient.lastName[0],
                NIC: newPatient.nic,
                Career: newPatient.Career,
                Address: newPatient.Address,
                CurrentMedication: newPatient.CurrentMedication,
                patientID: newPatient.patientID,
                firebaseUID: resp.user.uid
            });
        })
            .then(() => {
                dispatch({ type: "PATIENT_SIGNUP_SUCCESS" });
            })
            .catch(err => {
                dispatch({ type: "PATIENT_SIGNUP_ERROR", err });
            });
    };
};