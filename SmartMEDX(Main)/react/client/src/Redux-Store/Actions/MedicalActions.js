export const CreateRecord = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //getting into firestore
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        firestore.collection('Patients').doc(record.patientID).update({
            ...record,
            CurrentMedication: record.CurrentMedication,
            SurgeryCost: record.SurgeryCost,
            authorId: authorId,
            updatedAt: new Date()

        }).then(() => {//dispatching the relevant Medical actinon types
            dispatch({ type: 'CREATE_RECORD', record });
        }).catch((err) => {//handling Errors
            dispatch({ type: 'CREATE_RECORD_ERROR', err })
        })
    }
}
export const signIn = (credential) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        //sigin according to given credentials
        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then(() => {//dispatching the relevant Medical actinon types

            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_FAILED', err })
        })

    }
}
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        //signin out from auth
        firebase.auth().signOut().then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" });
        });
    };
};

export const signUp = newDoctor => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        //signup into firestore specified collection
        firebase.auth().createUserWithEmailAndPassword(newDoctor.email, newDoctor.password).then(resp => {
            return firestore.collection("Doctors").doc(resp.user.uid).set({
                firstName: newDoctor.firstName,
                lastName: newDoctor.lastName,
                initials: newDoctor.firstName[0] + newDoctor.lastName[0],
                email: newDoctor.email,
                NIC: newDoctor.nic,
                Qulification: newDoctor.Qulification,
                Address: newDoctor.Address,
                profession: newDoctor.profession
            });
        })
            .then(() => {
                dispatch({ type: "SIGNUP_SUCCESS" });
            })
            .catch(err => {
                dispatch({ type: "SIGNUP_ERROR", err });
            });
    };
};