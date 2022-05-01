const initState = {
    authError: null,
    isInsurance: false
};
//Initializing the Insurance Actions
const InsuranceReducer = (state = initState, action) => {
    
    switch (action.type) {

        case "CREATE_PATIENT_CLAIM":
            console.log("Added Claim", action.patient);
            return state;


        case "CREATE_PATIENT_CLAIM_ERROR":
            console.log("error");
            return state;


        case "INSURANCE_LOGIN_FAILED":
            console.log("Login as Insurance Error");
            return {
                ...state,
                authError: 'Login Error'

            };

        case "INSURANCE_LOGIN_SUCCESS":
            console.log("login as Insurance success");
            return {
                ...state,
                authError: null,
                isInsurance: true
            };

        case "INSURANCE_SIGNOUT_SUCCESS":
            console.log("sign out as Insurance success");
            return {
                state
            };
        case "INSURANCE_SIGNUP_SUCCESS":
            console.log("signup as Insurance success");
            return {
                ...state,
                authError: null,
                isInsurance: true
            };
        case "SIGNUP_ERROR":
            console.log("signup as Insurance error");
            return {
                ...state,
                authError: action.err.message
            };

        default:
            return state;
    }
};

export default InsuranceReducer;