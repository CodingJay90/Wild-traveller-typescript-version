import React, { useEffect, useState, FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getSpecificComment,
  updateComment,
} from "../../../redux/action-creators/location.action";
import { Store } from "../../../redux/reducers";
import { ILocation } from "../../../services/utils/interfaces/LocationInterface";

interface IProps {
  setPopulateForm(val: boolean): void;
  populateForm: boolean;
  comment_id: string;
  location_id: string;
  commentUpdateText: string;
}

const CreateCommentForm: FC<IProps> = ({
  //   item: { _id },
  populateForm,
  comment_id,
  location_id,
  commentUpdateText,
  setPopulateForm,
}) => {
  const [text, setText] = useState(commentUpdateText);
  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (populateForm) {
      dispatch(updateComment(location_id, comment_id, { text }));
    } else dispatch(createComment(location_id, { text }));

    setText("");
    setPopulateForm(false);
  };

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateComment(location_id, comment_id, { text: text }));
    setText("");
  };

  useEffect(() => {
    // if (comment_id) dispatch(getSpecificComment(location_id, comment_id));
    // if (populateForm) setUpdateText(specificComment.text);
    if (populateForm) setText(commentUpdateText);
  }, [populateForm, location_id, comment_id]);

  return (
    // <div className="comment-input">
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
          {/* <button disabled={!text} className="btn btn-warning">
            {populateForm ? "Update Comment" : "Enter"}
          </button> */}
        </form>
      </div>
    </li>
    // <form onSubmit={onSubmit}>
    //   <input
    //     type="text"
    //     onChange={(e) => setText(e.target.value)}
    //     value={text}
    //     placeholder="Add comment"
    //   />
    // <button disabled={!text} className="btn btn-warning">
    //   {populateForm ? "Update Comment" : "Enter"}
    // </button>
    // </form>
    // </div>
  );
};

export default CreateCommentForm;
