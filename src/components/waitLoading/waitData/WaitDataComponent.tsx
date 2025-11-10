
import React from "react";

interface WaterLoadingProps {
  isLoading: boolean;
}

const WaitDataComponent: React.FC<WaterLoadingProps> = ({isLoading}) => {
  if (!isLoading) return null;

  return (
    <>
        <div className="text-center">
            <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button>
        </div>
    </>
  );
};

export default WaitDataComponent;
