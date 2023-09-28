import React from "react";
import './chat-window.css'

const questions = [
    'What time is it now?',
    'If I see an entry level Software Dev job, what should I do?',
    'This chat thing is awesome, but what does it mean on a deeper level?',
];

const answers = {
    'What time is it now?': 'It is wine-O-clock, always!',
    'If I see an entry level Software Dev job, what should I do?': 'Let Boden know to apply and refer him!  Duh',
    'This chat thing is awesome, but what does it mean on a deeper level?': 'It means Boden would make a great team member and contributor to your company!',
};

class ChatWindow extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedQuestion: '',
        botResponse: '',
    };
    }

    handleQuestionClick = (question) => {
    const botResponse = answers[question];
    this.setState({ selectedQuestion: question, botResponse });
    };

    render() {
    return (
        <div className="chat-window">
            <h1>FAQ</h1>
            <div>
                {questions.map((question) => (
                <button key={question} onClick={() => this.handleQuestionClick(question)}>
                    {question}
                </button>
                ))}
            </div>
            <div>
                {this.state.selectedQuestion && (
                <div>
                    <p>You asked: {this.state.selectedQuestion}</p>
                    <p>Our answer: {this.state.botResponse}</p>
                </div>
                )}
            </div>
        </div>
    );
    }
}

export default ChatWindow