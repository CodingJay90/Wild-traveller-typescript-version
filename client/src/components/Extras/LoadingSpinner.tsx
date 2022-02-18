import React from "react";
import "./LoadingSpinner.scss";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface IProps {
  color: string;
  loading: boolean;
  loadingText: string;
}

const LoadingSpinner = ({ color, loading, loadingText }: IProps) => {
  return (
    <>
      {loading && (
        <div>
          <div className="overlay">
            <div className="container">
              <BounceLoader
                color={color}
                loading={loading}
                css={override}
                size={150}
              />
              <h5>{loadingText}</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
