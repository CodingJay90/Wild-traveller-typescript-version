import React from "react";
import { useNavigate } from "react-router-dom";
import "./ConfirmModal.scss";
interface IProps {
  message: string;
  callback: () => void;
}
const ConfirmModal = ({ message, callback }: IProps) => {
  const navigate = useNavigate();

  const handleClose = (): void => {
    navigate(-1);
    callback();
  };
  return (
    <div className="confirm__modal">
      <div className="wrap">
        <div className="overlay" id="show">
          <div id="myModal" className="modal fade">
            <div className="modal__container modal-dialog modal-confirm">
              <div className="modal__content modal-content">
                <div className="modal__header modal-header flex-column">
                  <div className="modal__icon">
                    <i className="material-icons">&#xE5CD;</i>
                  </div>
                  <h4 className="modal__header-title w-100">Are you sure?</h4>
                  <a type="button" href="#" className="modal__close">
                    &times;
                  </a>
                </div>
                <div className="modal__message">
                  <p>{message}</p>
                </div>
                <div className="modal__footer">
                  <a
                    href="#"
                    type="button"
                    className="modal__button modal__button-close"
                  >
                    Cancel
                  </a>
                  <button
                    type="button"
                    className="modal__button modal__button-proceed"
                    onClick={handleClose}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
