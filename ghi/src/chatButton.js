import React from 'react';
import './chatButton.css';

function ChatButton(props) {
  return (
    <button className="chat-button" onClick={props.onClick}>
      ?
      {/* <img src="question-mark.png" alt="Chat with us" /> */}
    </button>
  );
}

export default ChatButton;
