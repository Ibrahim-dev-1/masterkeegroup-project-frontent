import React , { createContext , useReducer } from 'react';
import { createNotification } from '../myFonctions';

let AuthStateContext = createContext();
let AuthDispatchContext = createContext();


// resolver
const rootReducer = (state, action ) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...state, isAuthentication: action.payload.success, token : action.payload.token };
        default:
            return state;
    }
}


// provider 
const AuthenticationProvider = (props) => {
    const [authState, dispatch ] = useReducer(rootReducer, {
        isAuthentication: false,
        token: undefined,
        isLoading: false,
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

const login = (dispatch , AuthData) => {
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
            sessionStorage.removeItem("isAuthentication");
            sessionStorage.removeItem("token");
            throw data.message;
        }

        // si les informations sont correctes, alors 
        sessionStorage.setItem("isAuthentication", true);
        sessionStorage.setItem("token", data.token);
        return dispatch({ type: "LOGIN_SUCCESS" , payload: data })
    }).catch(function(err){
        sessionStorage.removeItem("isAuthentication");
        sessionStorage.removeItem("token");
        return createNotification("Erreur", "danger", err, "top-right");
    })
}

export {
    AuthenticationProvider,
    login,
    useAuthState,
    useAuthDispatch,
}