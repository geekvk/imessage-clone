import React, { useEffect, useState } from 'react';
import "./Chat.css";
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { selectUser  } from './features/userSlice';
import { selectChatID, selectChatName } from './features/chatSlice';
import { useSelector } from 'react-redux';
import db from './firebase';
import firebase from "firebase";
import FlipMove from 'react-flip-move';
function Chat() {
    const user = useSelector(selectUser);
    const[input, setInput] = useState("");
    const[messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatID = useSelector(selectChatID);
    useEffect(() => {
        if(chatID)
        {
            db.collection("chats").doc(chatID).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            });     // doc is going to be the chatID. go to the collection inside of the chat
        }
    }, [chatID])
    const sendMessage = (e) => {
      e.preventDefault();
      db.collection("chats").doc(chatID).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,

      });
      setInput(""); // after send message string must be empty
    }
    return (
        <div className="chat">
            <div className="chat__header">
                    <h4>To: <span className="chat__name">{chatName}</span></h4>
                    <strong>Details</strong>
            </div>
            <div className="chat__messages">
                <FlipMove>
                    {messages.map(({id, data}) => (
                            <Message key={id} contents={data}  />
                        ))}

                </FlipMove>
                        
            </div>
            <div className="chat__input">
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="iMessage" 
                        type="text" 
                    />
                    <button onClick={sendMessage}>Send Message </button> 
                </form>
                <IconButton>
                    <MicNoneIcon className="chat__mic" />
                </IconButton>
                
            </div>
        </div>
    )
}

export default Chat
