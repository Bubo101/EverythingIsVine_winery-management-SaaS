import React from "react";
import './chat-window.css'

const questions = [
    'What are your hours of operation?',
    'What services do you offer?',
    'How much does your service cost?',
];

const answers = {
    'What are your hours of operation?': 'We are open Monday to Friday, 9am to 5pm.',
    'What services do you offer?': 'We offer a variety of services including web design, SEO, and social media marketing.',
    'How much does your service cost?': 'Our prices vary depending on the service. Please contact us for more information.',
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
            <h1>Chat with us!</h1>
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