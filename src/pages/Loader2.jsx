import React from "react";
import img from '../image/loading-gif.gif'

const Loader = () => {

  
  return (
    <>
      <div style={{display:'flex', alignItems:"center", justifyContent:'center'}}>
      <img
        style={{
            width:"100%",
         
          marginLeft: "auto",
          marginRight: "auto",
     
        }}
        src={img}
        alt="loading"
        className="img-fluid"
      />
      </div>
      
    </>
  );
};

export default Loader;
