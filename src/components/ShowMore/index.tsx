import React, { useState } from "react";
import styles from "./styles.module.scss";

interface ShowMoreProps {
  title: string;
  content: JSX.Element;
}

function ShowMore({ title, content }: ShowMoreProps): JSX.Element {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = (): void => setShowMore(!showMore);
  const elements = content.props.children;
  const text =
    elements.length > 1 ? elements[0].props.children : elements.props.children;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {!showMore ? (
            <button className={styles.button} onClick={toggleShowMore}>More</button>
            ) : (
            <button className={styles.button} onClick={toggleShowMore}>Less</button>
        )}
      </div>
      <div className={styles.content}>
        {showMore ? (
          content
        ) : (
          <p >{text.length > 100 ? `${text.substring(0, 150)}...` : text}</p>
        )}
      </div>
    </div>
  );
}

export default ShowMore;
