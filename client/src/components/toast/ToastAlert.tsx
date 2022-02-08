import React, { useEffect, useRef, useState } from "react";
import "./ToastAlert.scss";

interface IProps {
  msg: string | string[];
  heading: string;
  visible: boolean;
  timeout?: number;
  autoClose?: boolean;
}

const ToastAlert = ({
  msg,
  heading,
  autoClose,
  timeout = 5000,
  visible,
}: IProps) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log(visible);
  //   if (visible) notificationRef.current?.classList.add("notification--enter");
  // }, [visible]);

  function closeAlert(): void {
    notificationRef.current?.classList.remove("notification--enter");
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
          <h4 className="dc-text notification__header">{heading}</h4>$
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
