import { Button, Col, ListGroupItem, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../Context/AuthContext"
import { useCart } from "../Context/CartContext"
import { useSearch } from "../Context/Search"
import Layout from "../Layout/Layout"

const SearchPage = () => {
    const [cart, setCart] = useCart([])
    const [auth, setAuth] = useAuth()
    const [search, setSearch] = useSearch([])
    const navigate = useNavigate()
  return (
    <Layout>
     <div style={{background:"white"}}>
     
<div className="container mt-3" >
  <i
    className="fas fa-arrow-left mt-3"
    style={{ cursor: "pointer" }}
    onClick={() => navigate(-1)}
  />
  <div className="row">
    {
        search.result.length > 0 ? (
        search.result.map((p) => (
      <>
      
        <Row className="my-5" key={p._id}>
        <div className="col-md-3 col-6" style={{margin:"10px auto"}} >
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
              onClick={() => {setCart([...cart, p])
                localStorage.setItem('cart', JSON.stringify([...cart, p]))
              toast.success("Item Added To Cart")}}
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
        )

        : (<><h1 className="text-center">Sorry No Products found go back</h1></>)
    }

    
  </div>
</div>
</div>
    </Layout>
  )
}
export default SearchPage