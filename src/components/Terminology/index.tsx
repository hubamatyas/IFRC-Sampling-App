import React, { useState, useEffect } from "react";
import { definitions } from "../Definitions";
import OffCanvas from "../OffCanvas";

interface Props {
  term: string | null;
  text: string | null;
}

const Terminology: React.FC<Props> = ({ term, text }: Props) => {
  const [definition, setDefinition] = useState<React.ReactNode>(null);

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