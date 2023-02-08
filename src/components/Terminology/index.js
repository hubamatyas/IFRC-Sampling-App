import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {BsInfoCircle} from 'react-icons/bs';
import Explainations from './explainations';
import QuestionsCards from "../DecisionTree/qn-cards";
import styles from "./styles.module.scss";



export default function Terminology({word}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // if word is UserAnswers e.g. "f010", 
  // then find the question in QuestionsCards dictionary
  let key = word
  if (Object.keys(QuestionsCards).includes(word)){
    word = QuestionsCards[word][0]
  }

  return (
    <>
      <b className={styles.term} variant="primary" onClick={handleShow} style={{cursor:'pointer'}}>
        {word}
        <BsInfoCircle />
      </b>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={styles.offcanvasTitle}>{word}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.offcanvasBody}>
            {Explainations[key]}
            <br></br>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
