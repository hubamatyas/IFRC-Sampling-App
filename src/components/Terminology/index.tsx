import React, { useState, useEffect } from "react";
import { definitions } from "../Definitions";

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
        // add Offcanvas/Tooltip component when ready
        <>
          {parts.length > 1 ? (
            <span>
              {parts.map((part) =>
                part.toLowerCase() === term?.toLowerCase() ? (
                  <u key={part}>{part}</u>
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