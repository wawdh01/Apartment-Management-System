import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import "./Chat.css";

const pubnub = new PubNub({
  publishKey: 'pub-c-bb8c5518-e3d7-4e6b-933b-f8d7a6694437',
  subscribeKey: 'sub-c-c4e5a604-a199-11eb-8dfb-c2cb28a4a163',
  uuid: '123'
});

function Chat() {
  const [getEmail, setGetEmail] = useState("");
  async function getUser() {
    const user = await axios.get('http://localhost:5000/auth/logintype');
    setGetEmail(user.data.email);
  }
  useEffect(()=>{
      getUser();
  }, []);

  return (
    <PubNubProvider client={pubnub}>
      <ScrollToBottom>
      <ChatSub email={getEmail}/>
      </ScrollToBottom>
    </PubNubProvider>
  );
}

function ChatSub({email}) {
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

    useEffect(() => {

        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    return (
        <div style={{margin:"100px", position:"fixed"}}>
            <div style={chatStyles}>
              <div style={headerStyles}>Apartment's Chat Panel</div>

              <div style={listStyles} className="newImg">


                <ScrollToBottom >
                {

                   getmessage.map((message, index) => {
                      return(

                        <div key={`message-${index}`} style={messageStyles}>
                          {
                            (message.email === email) ?
                            (
                              <div className="messageContainer justifyEnd">
                                <p className="sentText pr-10">you</p>
                                <div className="messageBox backgroundBlue">
                                  <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
                                </div>
                              </div>
                              )
                              : (
                                <div className="messageContainer justifyStart">
                                  <div className="messageBox backgroundLight">
                                    <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                                  </div>
                                  <p className="sentText pl-10 ">{email}</p>
                                </div>
                              )
                          }

                        </div>

                      );
                    }

                  )
                }
                </ ScrollToBottom >

              </div>

            <div style={footerStyles}>
            <input
              type="text"
              style={inputStyles}
              placeholder="Type your message"
              value={message}
              onKeyPress={e => {
                if (e.key !== 'Enter') return;
                sendMessage(message);
              }}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              style={buttonStyles}
              onClick={e => {
                e.preventDefault();
                sendMessage(message);
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
  );
}


const pageStyles = {
    /*alignItems: 'center',
    //background: '#282c34',
    display: 'flex',
    position:'fixed',
    width: "100%",
    justifyContent: 'center',
    minHeight: '100vh',*/
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "100px"
  };

  const chatStyles = {
    display: 'flex',
    overflow:"scroll",
    flexDirection: 'column',
    backgroundColor: 'blue',
    height: '70vh',
    width: '100%',
  };

  const headerStyles = {
    background: '#323742',
    color: 'white',
    fontSize: '1.4rem',
    padding: '10px 15px',
  };

  const listStyles = {
    alignItems: 'flex-start',
    // backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    // flex:'auto',
    padding: '10px',
  };

  const messageStyles = {
    // backgroundColor: 'black',
    borderRadius: '5px',
    color: '#333',
    fontSize: '1.1rem',
    margin: '5px',
    padding: '8px 15px',
  };

  const footerStyles = {
    display: 'flex',
  };
  const inputStyles = {
    flexGrow: 1,
    fontSize: '1.1rem',
    padding: '10px 15px',
  };

  const buttonStyles = {
    fontSize: '1.1rem',
    padding: '10px 15px',
  };

export default Chat;
