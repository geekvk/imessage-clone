import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { selectUser, login, logout } from './features/userSlice';
import Imessage from "./Imessage";
import Login from "./Login";
import { auth } from "./firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch(); // fire action into reducer/ data layer
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log("login");
        dispatch(
          login({
             uid: authUser.uid,
             photo: authUser.photoURL,
             email: authUser.email,
             displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
        console.log("logout");
      }
    })
  }, [dispatch]);

  return (
    <div className="App">
      {user ? <Imessage /> : <Login />}
    </div>
  );
}

export default App; 
