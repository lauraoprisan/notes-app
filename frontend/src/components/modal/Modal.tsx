import React, { ReactNode } from 'react'
import ReactDom from'react-dom'


interface ModalProps {
    openModal: boolean;
    children?: ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ openModal, children }) => {

    if(!openModal) return null

    return (
        <div className="modal-option-container">
            {children}
        </div>

      );
}

export default Modal
