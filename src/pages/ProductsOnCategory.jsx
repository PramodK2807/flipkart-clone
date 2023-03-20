import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../style/ProductDetail.css'
import Layout from "../Layout/Layout"
import {Button, Col, ListGroupItem, Row} from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import Loader from "./Loader";

const ProductsOnCategory = () => {

  const [catProducts, setCatProducts] = useState([])
  const [cart, setCart] = useCart()
  const navigate = useNavigate()


  const getCatProducts = async() => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API}/products/${params.id}`)
      let data = await response.json()
      
      setCatProducts(data.products)
    } catch (error) {
      console.log(error);
    }
  }

  const addToCart = async(product) => {
    const exist = await cart.find(p => p._id === product._id)
    if(!exist){
      // console.log(product);
      localStorage.setItem("cart", JSON.stringify([...cart, product ]))
      setCart([...cart, product])
      toast.success("Item added in Cart successfully")
    }

    else{
      // const newCart = cart.map((item) => 
      // item._id === product._id ? {...exist, } : item
      // );
      // setCart([...cart, newCart])

      toast.error("Item already in Cart")
    }
  
   
  }

  useEffect(() => {
    getCatProducts()
  }, [])
  

  const params = useParams()

  return (
    <Layout>
      <div style={{background:"white"}}>

     
      <div className="container mt-3" >
        <i
          className="fas fa-arrow-left mt-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <div className="row ">
          {catProducts.length > 0 ? (
            catProducts.map((p) => (
            <>
            
              <Row className="my-5 " >
              <div className="col-md-3 col-6 " style={{margin:"auto"}} >
                <img style={{ width: "100%" }} src={p.img} alt="s" />
              </div>
              <div className="col-md-6">
                <p className="fw-bold fs-5">{p.name}</p>
                <p>{p.description}</p>
              </div>
              <div className="col-md-3">
              <ListGroupItem>
                {
                  p.offer ? (<>
                  <h2 style={{fontSize:'18px'}}>₹: {Math.floor(p.price - (p.price * p.offer/100))} <span style={{fontSize:'15px', color:"green"}}>{p.offer}% Off</span> </h2>
                  <p style={{textDecoration:"line-through"}}>₹ : {p.price}</p>
                  </>) 
                  : 
                  (<h2 style={{fontSize:'18px'}}> ₹ {p.price}</h2>)
                }
                
                
              </ListGroupItem>


                <ListGroupItem>
                <Row
                  className={
                    p.countInStock > 0 ? "active" : "out-of-stock"
                  }
                >
                  <Col>Status:</Col>
                  <Col>
                    {p.countInStock > 0 ? "In Stock" : " Out Of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              

                <ListGroupItem className="mx-auto d-flex align-items-center justify-content-between">
                {p.countInStock > 0 ? (<>

                  <Button
                    className="btn-black"
                    type="button"
                    style={{padding:'5px '}}
                    // disabled={!auth?.token }

                    onClick={() => addToCart(p)}
                    // onClick={() => {setCart([...cart, p])
                    //   localStorage.setItem('cart', JSON.stringify([...cart, p]))
                    // toast.success("Item Added To Cart")}}
                  >
                    Add to cart
                  </Button>
                
                
                  <div style={{padding:'5px '}} className="btn btn-warning">Buy Now</div>
                </>
                  
                ) : (
                  " Out Of Stock"
                )}
              </ListGroupItem>

              </div>
              </Row>
              <hr />
            </>
          ))
          ) :(<Loader/>)
         
}


          
          
        </div>
      </div>
      </div>
    </Layout>
  );
}
export default ProductsOnCategory