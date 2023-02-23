import React, { useState, useEffect } from "react";
import { definitions } from "../Definitions";

const Terminology = ({ term, text }) => {
    const [definition, setDefinition] = useState(null);

    useEffect(() => {
        if (term in definitions) {
            setDefinition(definitions[term]);
        }
    }, [term]);

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {definition ? (
                // add Offcanvas/Tooltip component when ready
                <>
                    {parts.length > 1 ? (
                        <span>
                            {parts.map((part) =>
                                part.toLowerCase() === term.toLowerCase() ?
                                ( <u>{part}</u> ) : (part)
                            )}
                        </span>
                    ) : (
                        <u>{text}</u>
                    )}
                </>
            ) : (
                <> {text} </>
            )}
        </>
    );
};

export default Terminology;