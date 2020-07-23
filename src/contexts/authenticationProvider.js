import React , { createContext , useReducer } from 'react';

let AuthStateContext = createContext();
let AuthDispatchContext = createContext();


// resolver
const rootReducer = (state, action ) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...state, isAuthentication: action.payload.success, token : action.payload.token };
        case "LOGIN_FAILURE":
            console.log("Erreur : " + action.payload)
            return {error: true, message: action.payload, isAuthentication: false };
        default:
            return state;
    }
}


// provider 
const AuthenticationProvider = (props) => {
    const [authState, dispatch ] = useReducer(rootReducer, {
        isAuthentication: false,
        token: undefined,
    });
    return (
        <AuthStateContext.Provider value={authState} >
            <AuthDispatchContext.Provider value={dispatch} >
                { props.children }
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

// cusumer
const useAuthState = () =>{
    let state = React.useContext(AuthStateContext);
    if(state === undefined){
        console.log("le authStateContext doit s'utiliser dans un consumer");
        throw new Error("le state doit s'utiliser dans le context ")
    }
    return state;
}

const useAuthDispatch = () => {
    let dispatch = React.useContext(AuthDispatchContext);

    if(dispatch === undefined){
        console.log("le authDispatchContext doit s'utiliser dans un consumer");
        throw new Error("le dispatch doit s'utiliser dans le context ")
    }

    return dispatch;
}

const login = (dispatch , AuthData, setErrors) => {
    fetch("/",{
        method: "POST",
        body: JSON.stringify(AuthData),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.errors){
            setErrors([data.errors.message]);
            sessionStorage.removeItem("isAuthentication");
            sessionStorage.removeItem("token");
            return dispatch({ type: "LOGIN_FAILURE", payload: data.message });
        }

        // si les informations sont correctes, alors 
        setErrors([])
        sessionStorage.setItem("isAuthentication", true);
        sessionStorage.setItem("token", data.token);
        return dispatch({ type: "LOGIN_SUCCESS" , payload: data })
    }).catch(function(err){
        sessionStorage.removeItem("isAuthentication");
        sessionStorage.removeItem("token");
        setErrors([err.message]);
        return console.log(err);
    })
}


export {
    AuthenticationProvider,
    login ,
    useAuthState,
    useAuthDispatch,
}