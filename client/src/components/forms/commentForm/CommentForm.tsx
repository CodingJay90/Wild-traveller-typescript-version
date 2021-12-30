import React, { useEffect, useState, FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getSpecificComment,
  updateComment,
} from "../../../redux/action-creators/location.action";
import { Store } from "../../../redux/reducers";
import { ILocation } from "../../../utils/LocationInterface";

interface IProps {
  //   item: ILocation;
  populateForm: boolean;
  comment_id: string;
  location_id: string;
}

const CreateCommentForm: FC<IProps> = ({
  //   item: { _id },
  populateForm,
  comment_id,
  location_id,
}) => {
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const dispatch = useDispatch();
  const specificComment = useSelector(
    (state: Store) => state.location.specificComment
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createComment(location_id, { text }));
    // window.location.reload();
  };

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateComment(location_id, comment_id, { text: updateText }));
    // window.location.reload();
  };

  useEffect(() => {
    if (comment_id) dispatch(getSpecificComment(location_id, comment_id));
    if (populateForm) setUpdateText(specificComment.text);
  }, [populateForm, location_id, comment_id]);

  return (
    <div className="comment-input">
      {!populateForm ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Add comment"
          />
          <button className="btn btn-warning">Enter</button>
        </form>
      ) : (
        <form onSubmit={onUpdate}>
          <input
            type="text"
            placeholder="add comment"
            onChange={(e) => setUpdateText(e.target.value)}
            value={updateText}
          />
          <button className="btn btn-warning">Update Comment</button>
        </form>
      )}
    </div>
  );
};

export default CreateCommentForm;
