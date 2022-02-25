import React, { useEffect, useState, FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getSpecificComment,
  updateComment,
} from "../../../redux/action-creators/location.action";
import { Store } from "../../../redux/reducers";
import { ILocation } from "../../../services/utils/interfaces/LocationInterface";
import AuthModal from "../../Extras/modals/authModal/AuthModal";

interface IProps {
  setPopulateForm(val: boolean): void;
  populateForm: boolean;
  comment_id: string;
  location_id: string;
  commentUpdateText: string;
}

const CreateCommentForm: FC<IProps> = ({
  populateForm,
  comment_id,
  location_id,
  commentUpdateText,
  setPopulateForm,
}) => {
  const { token } = useSelector((state: Store) => state.auth);
  const [text, setText] = useState(commentUpdateText);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return setShowAuthModal(true);
    if (populateForm) {
      dispatch(updateComment(location_id, comment_id, { text }));
    } else dispatch(createComment(location_id, { text }));

    setText("");
    setPopulateForm(false);
  };

  useEffect(() => {
    if (populateForm) setText(commentUpdateText);
  }, [populateForm, location_id, comment_id]);

  return (
    <>
      <li className="timeline-item">
        <span className="timeline-item-icon | avatar-icon">
          <i className="avatar">
            <img src="https://assets.codepen.io/285131/hat-man.png" />
          </i>
        </span>
        <div className="new-comment">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Add comment"
            />
          </form>
        </div>
      </li>
      <AuthModal visible={showAuthModal} setVisible={setShowAuthModal} />
    </>
  );
};

export default CreateCommentForm;
