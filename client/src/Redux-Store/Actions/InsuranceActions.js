export const CreateClaim = (record) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //getting into firestore
        const firestore = getFirestore();
        //updating relevant patient details to add patient funds
        firestore.collection('Patients').doc(record.patientID).update({ 
            ...record,
            patientfunds: record.patientfunds,
            updatedAt: new Date() + " by Insurance" 
            

        }).then(() => {//dispatching the relevant Insurance actinon types
            dispatch({ type: 'CREATE_CLAIM_RECORD', record });
        }).catch((err) => {//handling dispatching errors
            dispatch({ type: 'CREATE_CLAIM_RECORD_ERROR', err })
        })
    }
}

export const insurance_signIn = (credential) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        //sigin according to given credentials
        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then(() => {//dispatching the relevant Insurance actinon types
            dispatch({ type: 'INSURANCE_LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'INSURANCE_LOGIN_FAILED', err })
        })

    }
}
export const insurance_signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        //signin out from auth
        firebase.auth().signOut().then(() => {
            dispatch({ type: "INSURANCE_SIGNOUT_SUCCESS" });
        });
    };
};

export const insurance_signUp = newAgent => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        //signup into firestore specified collection
        firebase.auth().createUserWithEmailAndPassword(newAgent.email, newAgent.password).then(resp => {
            return firestore.collection("Insurance").doc(resp.user.uid).set({
                firstName: newAgent.firstName,
                lastName: newAgent.lastName,                
                NIC: newAgent.nic,
                employee_ID: newAgent.employee_ID,
                InsuranceCompany: newAgent.InsuranceCompany,
                profession: newAgent.profession
            });
        })
            .then(() => {
                dispatch({ type: "INSURANCE_SIGNUP_SUCCESS" });
            })
            .catch(err => {
                dispatch({ type: "INSURANCE_SIGNUP_ERROR", err });
            });
    };
};