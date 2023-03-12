import { NavLink } from "react-router-dom";
import Layout from "../Layout/Layout";
import Carousel from "../components/Carousel";
import Common from "../Layout/Common";
import { useEffect, useState } from "react";

const HomePage = () => {

  const [deals, setDeals] = useState([])

  const getDeals = async() =>{
    try {
      let result = await fetch(`${process.env.REACT_APP_API}/deal`)
      let response = await result.json();
      if(response.success){
        console.log(response.data)
        setDeals(response.data)

      }

    } catch (error) {
      console.log(error)
    }

  }
  
  console.log(deals)

  useEffect(() => {
    getDeals()
  }, [])
  
  return (
    <Layout>
      <div className="category mb-3">
        <div className="row container-fluid py-2  mx-auto gx-auto">
          <NavLink to="/" className="col-2 top-category">
            <img
              src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
              alt="Grocery"
            />
            <p>Grocery</p>
          </NavLink>
          <NavLink to="/" className="col-2 top-category">
            <img
              src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
              alt="Mobile"
            />
            <p>Mobile</p>
          </NavLink>
          <NavLink to="/" className="col-2 top-category">
            <img
              src="https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100"
              alt="Fashion"
            />
            <p>Fashion</p>
          </NavLink>
          <NavLink to="/" className="col-2 top-category">
            <img
              src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
              alt="Electronics"
            />
            <p>Electronics</p>
          </NavLink>
          <NavLink to="/" className="col-2 top-category">
            <img
              src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100"
              alt="Home"
            />
            <p>Home</p>
          </NavLink>
          <NavLink to="/" className="col-2 top-category">
            <img
              src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
              alt="mobile"
            />
            <p>Appliances</p>
          </NavLink>
        </div>
      </div>

     <Carousel/>

     <Common deals={deals} title="Deal of the day"/>
     <Common deals={deals} title="Mens Clothing"/>
     <Common deals={deals} title="Beauty Products"/>
    </Layout>
  );
};
export default HomePage;
