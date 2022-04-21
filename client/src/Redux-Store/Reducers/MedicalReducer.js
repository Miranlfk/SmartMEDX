const initState = {
    authError: null,
    isMedical: false

};
//Initializing the Medical Actions
const MedicalReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_RECORD":
            console.log("Added patient", action.record);
            return state;


        case "CREATE_RECORD_ERROR":
            console.log("error");
            return state;


        case "LOGIN_FAILED":
            console.log("Login Error");
            return {
                ...state,
                authError: 'Login Error'

            };

        case "LOGIN_SUCCESS":
            console.log("login success");
            return {
                ...state,
                authError: null,
                isMedical: true
            };

        case "SIGNOUT_SUCCESS":
            console.log("sign out success");
            return {
                state
            };
        case "SIGNUP_SUCCESS":
            console.log("signup success");
            return {
                ...state,
                authError: null
            };
        case "SIGNUP_ERROR":
            console.log("signup error");
            return {
                ...state,
                authError: action.err.message
            };

        default:
            return state;
    }
};

export default MedicalReducer;