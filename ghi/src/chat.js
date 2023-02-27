import React from 'react';
import ChatButton from './chatButton';
import ChatWindow from './chatWindow';

function Chat() {
const [isChatOpen, setIsChatOpen] = React.useState(false);

const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
};

return (
    <div className="App">
    <ChatButton onClick={handleChatButtonClick} />
    {isChatOpen && <ChatWindow />}
    </div>
);
}

export default Chat;
