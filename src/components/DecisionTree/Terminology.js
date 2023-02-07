import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsInfoCircle} from 'react-icons/bs';
import Explainations from './Explainations';
import QuestionsCards from "./QuestionsCards";
//import "./styles.css";

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
      <b className='terminology' variant="primary" onClick={handleShow} style={{cursor:'pointer'}}>
        {word}
        <BsInfoCircle />
      </b>
      

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color:"#f5333f"}}>{word}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {Explainations[key]}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
