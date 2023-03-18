import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import Loader2 from "../pages/Loader2";

const Common = ({deals, title}) => {


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  
  return (
    <div className="my-2 container-fluid common-file">
 

      <div className="container-fluid">
        
 <h1 style={{fontSize:'32px', padding:'10px 0'}}>{title}</h1>
      
            <Carousel responsive={responsive}
             removeArrowOnDeviceType={["tablet", "mobile"]}
             containerClass="none"
             itemClass="carousel-item-padding-10-px">

{
  deals.length > 0 ? (
  deals.map((d) => (
    <NavLink className="my-2 card py-2" key='d._id'  to={`products/${d.category}`}>
      <img  style={{height:"160px", padding:"10px"}}  src={d.image} alt="i" />
      <p style={{color:"#212121"}} className="fw-bold text-center m-0 p-1">{d.name}</p>
      <p className="text-success text-center m-0 p-1">Starts : ₹{d.starting_price}</p>
      <p style={{color:"#212121", opacity:'0.7'}} className="text-center m-0 py-1">{d.model_name}</p>
    </NavLink>
  ))
  )
  :
  (<Loader2/>)
}

</Carousel>
              

              
              
            </div>
    </div>
  )
}
export default Common