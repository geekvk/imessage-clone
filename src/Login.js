import { Button } from '@material-ui/core';
import React from 'react';
import "./Login.css";
import { auth, provider } from "./firebase";
function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));

    }
    return (
        <div className="login">
            <div className="login__logo">
            <img  src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png" alt="" />
            </div>
            <h1> iMessage </h1>
            <Button onClick={signIn} > Sign In </Button>
            

            
        </div>
    )
}

export default Login
