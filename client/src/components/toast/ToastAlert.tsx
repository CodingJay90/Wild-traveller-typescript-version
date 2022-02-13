import React, { useEffect, useRef, useState } from "react";
import "./ToastAlert.scss";

interface IProps {
  msg: string | string[] | undefined;
  heading: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  timeout?: number;
  autoClose?: boolean;
}

const ToastAlert = ({
  msg,
  heading,
  autoClose,
  timeout = 5000,
  visible,
  setVisible,
}: IProps) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoClose) setTimeout(() => closeAlert(), timeout);
  }, [visible]);

  function closeAlert(): void {
    setVisible(false);
  }

  return (
    <>
      {/* {visible ? ( */}
      <div
        ref={notificationRef}
        className={`notification ${visible ? "notification--enter" : ""}`}
        id="notification"
      >
        <div className="notification__icon-background"></div>
        <div className="notification__icon">
          <img src="https://img.icons8.com/cotton/64/000000/info--v5.png" />
        </div>
        <div className="notification__text-container">
          <h4 className="dc-text notification__header">{heading}</h4>
          {typeof msg === "object" ? (
            msg.map((i: any) => (
              <li className="notification__text-body">{i}</li>
            ))
          ) : (
            <p className="notification__text-body">{msg}</p>
          )}
          <div className="notification__action"></div>
        </div>
        <button
          className="notification__close-button"
          type="button"
          aria-label="Close"
          onClick={closeAlert}
        ></button>
      </div>
      {/* ) : null} */}
    </>
  );
};

export default ToastAlert;
