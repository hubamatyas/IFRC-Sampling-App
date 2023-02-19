import React from "react";
import { definitions } from "../Definitions";

class Terminology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: props.term,
            text: props.text,
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
        const text = this.state.text;
        const regex = new RegExp(`(${term})`, "gi");
        const parts = this.state.text.split(regex);
        return (
            <>
                {this.state.defintion ?
                    // add Offcanvas/Tooltip component when ready
                    <>
                        {parts.length > 1 ?
                        <span>{parts.map(part => part.toLowerCase() === term.toLowerCase() ? <u>{part}</u> : part)}</span>
                        : <u>{text}</u>
                        }
                    </>
                    : <> {text} </>
                }
            </>
        )
    }
}

export default Terminology;