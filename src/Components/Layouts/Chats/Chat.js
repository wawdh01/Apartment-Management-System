import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import "./Chat.css";
//import { Button } from 'bootstrap';
import {Dropdown} from 'react-bootstrap';
import {HashLoader} from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';

const pubnub = new PubNub({
  publishKey: 'pub-c-bb8c5518-e3d7-4e6b-933b-f8d7a6694437',
  subscribeKey: 'sub-c-c4e5a604-a199-11eb-8dfb-c2cb28a4a163',
  uuid: '123'
});

function Chat() {
  const [getEmail, setGetEmail] = useState("");
  const [loginType, setLoginType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getUser() {
    setIsLoading(true);
    const user = await axios.get('http://localhost:5000/auth/logintype');
    setGetEmail(user.data.email);
    setLoginType(user.data.login_type);
    // console.log("hi this is logintype", loginType);
    // console.log(user.data.email);
    setIsLoading(false);
  }

  useEffect(()=>{
   getUser();
  }, []);
  // console.log("hi this is logintype",loginType);
  if (isLoading === false)
  return (
    <div>
      <PubNubProvider client={pubnub}>
        <ScrollToBottom>
        <ChatSub email={getEmail} loginType={loginType}/>
        </ScrollToBottom>
      </PubNubProvider>
    </div>
  );
  else {
    return(
    <div style={{position:"fixed", textAlign:"center", marginLeft:"30%"}}>
      <div style={{marginTop: "100px", textAlign:"center", marginBottom:"40%"}}>
        <h1>Apartment Management System</h1>
      </div>
      <div style={{marginTop: "15%", marginLeft:"5%", textAlign:"center"}}>
        <HashLoader loading size="70"/>
      </div>
    </div>
    );
  }
}

function ChatSub({email, loginType}) {
    const pubnub = usePubNub();
    const [channels] = useState(['awesome-channel']);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [getmessage, setGetmessage] = useState([]);

    async function getMessage() {
      const chatData = await axios.get('http://localhost:5000/chats/getMessage');
      setGetmessage(chatData.data);
    }


    getMessage();

    //console.log(loginType);

    const handleMessage = event => {
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
            const text = message.text || message;
            setMessages(messages => [...messages, text]);
        }
    };



    const sendMessage = async (message) => {
      if (message) {
        pubnub
            .publish({ channel: channels[0],message})
            .then(() => setMessage(''));
        }
        const messageData = {
          email,
          message
        };
        setGetmessage([...getmessage, messageData]);
        await axios.post('http://localhost:5000/chats/addMessage', messageData);
    };

    async function deleteChat() {
      try {
        await axios.get('http://localhost:5000/chats/delete');
      }
      catch(e) {
        console.log(e);
      }
    }

    useEffect(() => {

        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    return (

        <div className="outerContainer">
          <div className="container">

            <div className="infoBar">
                <div className="leftInnerContainer">

                  <h3>Apartment Chat System</h3>
                </div>
                {
                  loginType === 1 ?
                    <div className="rightInnerContainer">
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Menu
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                          <Dropdown.Item><button className="btn btn-light" onClick={deleteChat}>Clear Chat</button></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                    </div> :
                    <></>
                }
            </div>
            <ScrollToBottom className="messages">
                {getmessage.map((message, index) =>

                  <div>
                    {
                      (message.email === email) ?
                      (
                        <div className="messageContainer justifyEnd">
                          <p className="sentText pr-10">you</p>
                          <div className="messageBox ">
                            <p className="messageText ">{ReactEmoji.emojify(message.message)}</p>
                          </div>
                        </div>
                        )
                        : (
                          <div className="messageContainer justifyStart">
                            <div className="messageBox backgroundLight">
                              <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                            </div>
                            <p className="sentText pl-10 ">{message.email}</p>
                          </div>
                        )
                    }

                  </div>


              )}
            </ScrollToBottom>
            <form className="form">
            <input
              type="text"
              className="input"
              placeholder="Type your message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              className="sendButton"
              onClick={e => {
                e.preventDefault();
                sendMessage(message);
              }}
            >
              Send Message
            </button>
        </form>
      </div>
      </div>
  );
}

export default Chat;
