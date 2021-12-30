import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import "./CreateForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../footer/Footer";
import { MdPhotoSizeSelectActual, MdSubject } from "react-icons/md";
import { Store } from "../../../redux/reducers";
import {
  addLocation,
  getSpecificLocation,
  updateLocation,
} from "../../../redux/action-creators/location.action";
import NoContent from "../../Extras/NoContent";

const CreateForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    location: "",
    image: "",
    description: "",
  });
  const editFormValues = useSelector(
    (state: Store) => state.location.specificLocation
  );
  const error = useSelector((state: Store) => state.location.error);

  useEffect(() => {
    if (params.id) dispatch(getSpecificLocation(params.id));
  }, []);
  useEffect(() => {
    if (editFormValues)
      setValue({
        location: editFormValues.location,
        image: editFormValues.image,
        description: editFormValues.description,
      });
  }, [editFormValues]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValue({ ...value, [e.target.id]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.id) dispatch(updateLocation(params.id, value));
    if (!params.id) dispatch(addLocation(value));

    if (
      value.location !== "" &&
      value.image !== "" &&
      value.description !== ""
    ) {
      navigate("/explore");
    } else {
      toast.error("All fields are required", { theme: "dark" });
    }
  };

  if (error !== null) {
    return <NoContent />;
  }

  return (
    <React.Fragment>
      <div className="CreateForm">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          bodyClassName="white"
          progressClassName="Toastify__progress-bar--dark"
        />
        <div className="container">
          <h1>{params.id ? "Edit" : "Create"} Location</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Location Name</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location Name"
                value={value.location}
                onChange={onChange}
              />
            </div>
            <div className="form group">
              <label htmlFor="image">
                Image <MdPhotoSizeSelectActual />
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={value.image}
                  onChange={onChange}
                  placeholder="Image Url"
                />
                OR
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }: { base64: string }) =>
                    setValue({ ...value, image: base64 })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">
                Description <MdSubject />
              </label>
              <textarea
                name="description"
                id="description"
                cols={30}
                rows={10}
                value={value.description}
                onChange={onChange}
              ></textarea>
            </div>
            <button className="btn btn-default w-38">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default CreateForm;
