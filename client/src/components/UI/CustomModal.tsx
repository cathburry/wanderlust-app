import React, { FC, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

interface PropsType {
  handleClose: () => void;
  show: boolean;
  size: 'sm' | 'lg' | 'xl' | undefined;
  modalHeading: string | null;
  children: ReactNode;
}

const CustomModal: FC<PropsType> = ({
  handleClose,
  show,
  size,
  modalHeading,
  children,
}: PropsType) => (
  <>
    <Modal show={show} size={size} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  </>
);

export default CustomModal;
