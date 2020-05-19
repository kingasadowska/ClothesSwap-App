import React from 'react';
import ReactDOM from 'react-dom';
import BackDrop from './BackDrop';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const ModalLayer = props => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal_header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form 
            onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}>
                <div className={`modal_content ${props.contentClass}`}>
                {props.children}
                </div>
                <footer className={`modal_footer ${props.footerClass}`}>
                {props.footer}
                </footer>
            </form>
        </div>  
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <>
    {props.open && <BackDrop onClick={props.onClose}/>}
    <CSSTransition
        className="modal"
        in={props.open}
        mountOnEnter
        unmountOnExit
        timeout={100}>
            <ModalLayer {...props} />
    </CSSTransition>
    </>
  );
};

export default Modal;
