import React from "react";
import { definitions } from "../Definitions";

class Terminology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: props.term,
            question: props.question,
            defintion: null,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        if (this.state.term in definitions) {
            this.setState({ defintion: definitions[this.state.term] })
        }
    }

    render() {
        const term = this.state.term;
        const regex = new RegExp(`(${term})`, "gi");
        const parts = this.state.question.split(regex);
        return (
            <>
                {this.state.defintion ?
                    // add Offcanvas/Tooltip component when ready
                    <>
                        {parts.length > 1 ?
                        <span>{parts.map(part => part.toLowerCase() === term.toLowerCase() ? <u>{part}</u> : part)}</span>
                        : <u>{this.state.question}</u>
                        }
                    </>
                    : <> {this.state.question} </>
                }
            </>
        )
    }
}

export default Terminology;