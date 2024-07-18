import React, { ReactNode, useEffect, useRef } from 'react'
import ReactDom from'react-dom'


interface ModalProps {
    openModal: boolean;
    children?: ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ openModal, children }) => {

    const modalOptionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
		if (modalOptionRef.current != null) {
			const rect = modalOptionRef.current.getBoundingClientRect();



			if (rect.right > (window.innerWidth - 5)) {
				console.log("lp1 outOfBound")
				const overflow = rect.right - window.innerWidth;
				modalOptionRef.current.style.right = `0`;
				modalOptionRef.current.style.left = `auto`;
			}
		};
	}, [openModal]);

	if(!openModal) return null

	return (
        <div className="modal-option-container" ref={modalOptionRef}>
            {children}
        </div>

      );
}

export default Modal
