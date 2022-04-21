const initState = {
    authError: null,
    isPatient: false
};
//Initializing the Patient Actions
const PatientReducer = (state = initState, action) => {
    switch (action.type) {
        case "PATIENT_LOGIN_ERROR":
            console.log("login as Patient error");
            return {
                ...state,
                authError: "Login failed"
            };

        case "PATIENT_LOGIN_SUCCESS":
            console.log("login as Patient success");
            return {
                ...state,
                authError: null,
                isPatient: true
            };

        case "PATIENT_SIGNOUT_SUCCESS":
            console.log("signout as Patient success");
            return state;

        case "PATIENT_SIGNUP_SUCCESS":
            console.log("signup as Patient success");
            return {
                ...state,
                authError: null,
                isPatient: true
            };

        case "PATIENT_SIGNUP_ERROR":
            console.log("signup as Patient error");
            return {
                ...state,
                authError: action.err.message
            };

        default:
            return state;
    }
};

export default PatientReducer;