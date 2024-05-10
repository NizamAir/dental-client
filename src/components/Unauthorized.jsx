import { useNavigate } from "react-router-dom";
import React from "react";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="row vh-100 d-flex align-items-center justify-content-center">
      <div>
        <section className="mx-auto text-start d-flex flex-column justify-content-start p-3 text-white fs-5 rounded-3">
          <h1>Unauthorized</h1>
          <br />
          <p>You do not have access to the requested page.</p>
          <div className="flexGrow">
            <button onClick={goBack}>Go Back</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Unauthorized;
