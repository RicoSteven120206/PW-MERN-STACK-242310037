"use client";

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@/components/ui/button";

const states = {
  setState: null,
  changeState(data) {
    if (!this.setState) return;
    this.setState((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  },
};

const handleClose = () => {
  states.changeState({
    open: false,
  });
};

const Modals = () => {
  const [data, setData] = useState({
    open: false,
    header: "ini header",
    message: "ini message",
    size: "md",
    footer: "",
    onClose: handleClose,
    closable: true,
  });

  states.setState = setData;

  const styles = `
    .modal-backdrop-dark {
      opacity: 0.8 !important;
      background-color: #000;
    }`;

  return (
    <>
      <style>{styles}</style>
      <Modal
        show={data.open}
        onHide={data.closable ? data.onClose : undefined}
        size={data.size}
        backdrop="static"
        keyboard={false}
      >
        {data.header && (
          <Modal.Header closeButton={false}>
            <h3 className="modal-title">{data.header}</h3>
            <button
              onClick={data.onClose}
              className="btn-close btn-close-white"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </Modal.Header>
        )}
        <Modal.Body>
          {!data.header && data.closable ? (
            <div className="">
              <button
                onClick={data.onClose}
                className="btn btn-sm btn-light btn-icon rounded-circle position-absolute end-0 top-0 fw-bolder m-2 text-hover-danger"
              >
                <i className="bi bi-x-lg"></i>
              </button>
              {data.message}
            </div>
          ) : (
            data.message
          )}
        </Modal.Body>
        {data.footer && (
          <Modal.Footer>
            {data.closable && (
              <Button
                variant="secondary"
                outline
                className="px-5"
                onClick={() => handleEdit(book)}
                title="Edit"
              >
                No
              </Button>
            )}
            {data.footer}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

const ModalResponse = ({ title, message, variant = "success" }) => {
  return (
    <div className="text-center py-8">
      <div className="icon">
        <i
          className={`bi bi-${variant === "success" ? "check2-circle text-success" : "x-circle text-danger"}`}
          style={{ fontSize: "6em" }}
        ></i>
      </div>
      {title && (
        <h1 className={`text-${variant === "success" ? "success" : "danger"}`}>
          {title}
        </h1>
      )}
      {message && <p className="mb-10">{message}</p>}
      <div className="my-5">
        <Button
          className="btn-lg fw-bolder"
          onClick={() => openModal({ open: false })}
        >
          Ok, got it!
        </Button>
      </div>
    </div>
  );
};

const openModal = ({
  open = true,
  message,
  header,
  size,
  footer,
  onClose = () => {},
  closable = true,
}) => {
  states.changeState({
    message,
    header,
    size,
    open,
    footer,
    closable,
    onClose: closable
      ? () => {
          onClose();
          handleClose();
        }
      : undefined,
  });
};

export default Modals;
export { openModal, ModalResponse };