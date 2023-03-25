import React, { useState, useEffect } from "react";
import Definition from "../Definitions";
import OffCanvas from "../OffCanvas";

/**
@fileoverview This component renders a term and its definition in a tooltip.
The component takes in a term and a text which contains the term. If the term 
is in the dictionary of definitions, the component renders the term with a 
tooltip pops up when the term is clicked. If the term is not in the
dictionary of definitions, the component renders the text as is.
@module Terminology
*/

interface Props {
  term: string | null;
  text: string | null;
}

const Terminology: React.FC<Props> = ({ term, text }: Props) => {
  const [definition, setDefinition] = useState<React.ReactNode>(null);
  const definitions = Definition();
  useEffect(() => {
    if (term && term in definitions) {
      setDefinition(definitions[term]);
    }
  }, [term]);

  const regex = new RegExp(`(${term})`, "gi");
  const parts = text ? text.split(regex) : [];

  return (
    <>
      {definition ? (
        <>
          {parts.length > 1 ? (
            <span>
              {parts.map((part) =>
                part.toLowerCase() === term?.toLowerCase() ? (
                  <OffCanvas terminology={part}/> 
                ) : (
                  part
                )
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