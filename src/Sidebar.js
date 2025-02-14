import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from "./firebase";

function Sidebar() {
    const user = useSelector(selectUser);
    const[chats, setChats] = useState([]);

    useEffect(() => {
       db.collection('chats').onSnapshot((snapshot) => 
       setChats(
           snapshot.docs.map((doc) => ({
               id: doc.id,
               data: doc.data(),
           }))
       ))
    }, []);
    const addChat = () => {
        const chatName = prompt('Please Enter Chat Name');
        
        if(chatName){
            db.collection('chats').add({
                chatName: chatName,
            })
        }
    };
    return (
        <div className="sidebar"> 
            <div className="sidebar__header">
                    <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar__avatar"/>
                    <div className="sidebar___input">
                    <SearchIcon  />
                    <input placeholder="Search" />
                    </div>
                    <IconButton variant='outlined' className="sidebar__inputButton">
                        <RateReviewIcon onClick={addChat} />
                    </IconButton>    
            </div>
            <div className="sidebar__chat">
               {chats.map(({id, data: { chatName }}) => (
                   <SidebarChat key={id} id={id} chatName={chatName} />
               ))}
            </div>
        </div>
    )
}

export default Sidebar
