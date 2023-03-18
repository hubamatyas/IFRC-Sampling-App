import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

/**
 * A component that displays content with a "show more" / "show less" button.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the content.
 * @param {JSX.Element} props.content - The content to display.
 * @returns {JSX.Element} - The ShowMore component.
 * @example <ShowMore title="Example Title" content={<div>Example content</div>} />
*/

interface ShowMoreProps {
  title: string;
  content: JSX.Element;
}

function ShowMore({ title, content }: ShowMoreProps): JSX.Element {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = (): void => setShowMore(!showMore);
  
  const elements = content.props.children;
  const text = elements.length > 1 ? elements[0].props.children : elements.props.children;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {!showMore ? (
            <button className={styles.button} onClick={toggleShowMore}>{t('more')}</button>
            ) : (
            <button className={styles.button} onClick={toggleShowMore}>{t('less')}</button>
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
