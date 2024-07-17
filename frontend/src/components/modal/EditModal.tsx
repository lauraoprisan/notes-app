import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ReactDom from'react-dom'
import useDetectClickInsideElement from '../../hooks/useDetectClickInsideElement';


interface ModalProps {
    openModal: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const EditModal: React.FC<ModalProps> = ({openModal, children, onClose}) => {

    const editModalRef = useRef<HTMLDivElement>(null);
    const isClickInside = useDetectClickInsideElement(editModalRef);

    useEffect(() => {
        if (isClickInside && openModal) {
            onClose();
        }
    }, [isClickInside]);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Clean up on component unmount
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [openModal]);



    if (!openModal) return null;

    return ReactDom.createPortal (
        <section className="edit-modal-container">
            <div className="overlay-outside-modal" ref={editModalRef}>
            </div>
            <div className="edit-modal-content" >
                {children}
            </div>
        </section>,
        document.getElementById('portal') as HTMLElement
    )
}

export default EditModal