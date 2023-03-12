import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loader = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue ) ;
    }, 1000);
    count === 0 && navigate("/", 
    {
      state: location.pathname
    });
    return () => clearInterval(interval);


  }, [count, navigate, location]);
  return (
    <>
      <img
        style={{
          display: "block",
          height: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          margin: "auto",
          width: "50%",
        }}
        src="https://tbphelps.com/skin/frontend/ultimo/default/images/wating.gif"
        alt="loading"
        className="img-fluid"
      />
      <h1 className="text-center">Redirecting to you {count}</h1>
    </>
  );
};

export default Loader;
