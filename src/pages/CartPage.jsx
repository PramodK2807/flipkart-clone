import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { useCart } from "../Context/CartContext"
import Layout from "../Layout/Layout"
import '../style/Cart.css'

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart ] = useCart()
    const [grandTotal, setGrandTotal ] = useState(0)
    const [discount, setDiscount ] = useState(0)
    const [payable, setPayable ] = useState(0)
    const [qty, setQty] = useState(1);
    const [ delivery, setDelivery ] = useState(40)
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(cart);

    const removeCartItem = (itemId) => {
        console.log(itemId)
        try {
            let myCart = [...cart]
            // console.log(myCart)
            let index = myCart.findIndex(item => item._id == itemId )
            console.log(index)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
            // console.log(cart)
        } catch (error) {
            console.log(error)
        }
    }

    let totalPrice = () => {
        let price = 0;
        cart?.map((cartItem) => {
            price = price + cartItem.price *qty
            // console.log(cartItem.price)
        })
        setGrandTotal(price)
    }


    let totalDiscount = () => {
        let dis = 0;
        cart?.map((cartItem) => {
            dis +=  Math.floor(cartItem.price * cartItem.offer/100)*qty
            // console.log(dis)
        })
        setDiscount(dis)
    }

    const payingAmount = () => {
        let paying = grandTotal-discount
        if(paying < 499){
            paying = paying + 40
        }
        setPayable(paying)
    }

    

    // const increment = (id) => {
    //     // console.log(id)
    //     cart.map((cartItem) => {
    //         if(cartItem.id === id) {
    //             setQty(qty+1)
    //         }
    //     })
        
    // }

    // const decrement = (id) => {
    //     cart.map((cartItem) => {
    //         if(cartItem._id === id){
    //             setQty(qty > 1 ? qty - 1 : 1)
    //         }
    //         else(
    //             setQty(qty)
    //         )
    //     })
    // }

    useEffect(() => {
        totalPrice()
        totalDiscount()
        payingAmount()
    },[cart, qty, grandTotal, discount])
    

    
    
  return (




    <Layout>
        <div className="container my-3 cart-container" style={{width:'100%'}} >
        <i
          className="fas fa-arrow-left mt-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
            <div className="row gx-5">


                <div className="col-md-9 cart">
                    <div className="row my-3 justify-content-between  cart-shadow"  style={{background:"white"}}>
                        <div className="col-12 my-3" style={{fontWeight:'bold', fontSize:'27px', paddingLeft:'10px'}}>My Cart ({cart?.length} items)</div>
                        {/* <div className="col-3">From Saved Address</div>
                        <div className="col-3">Enter Delivery Pincode</div> */}

                    </div>
                    

                    {
                        cart?.length > 0 ? cart.map((cart) => (
<>
                        <div key={cart._id} className="row cart-shadow align-items-center justify-content-between p-3"  style={{background:"white"}}>
                        <div className="col-2">
                            <img style={{width:"100%"}} src={cart.img} alt="" />
                            
                        </div>
                        <div className="col-6">
                            <p className="fw-bold fs-5 text-center">{cart.name}</p>
                           
                            {
                                cart.offer ? (<>
                                <h2 style={{fontSize:'18px'}}>₹: {(Math.floor(cart.price - (cart.price * cart.offer/100))) * qty} &nbsp;
                                 <span style={{fontSize:'15px', color:"green"}}>{cart.offer}% Off</span> 
                                 </h2>
                                <p style={{textDecoration:"line-through"}}>₹ : {cart.price} </p>
                                </>) 
                                : 
                                (<p>{cart.price}</p>)
                            }
                        
                        </div>
                        <div className="col-3 onmobile">
                            <p>Delivery by Sat May 28 || <span style={{color:'#007500', fontWeight:'bold'}}>{cart.price > 499 ? "Free Delivery" : `Delivery Charge :${delivery}` }</span></p>
                            
                        </div>

                        <div className="row align-items-center justify-content-between">
                            {/* <div className="col-6 function-btn ">
                                <div className="row align-items-center">
                                <button className="col-4" onClick={() => decrement(cart._id)}><i className="fa-solid fa-minus"></i></button>

                                <button className="col-4" style={{fontWeight:'400', fontSize:'16px'}}>{qty}</button>

                                <button className="col-4" onClick={() => increment(cart._id)}><i className="fa-solid fa-plus"></i></button>
                                </div>
                            </div> */}
                            <div className="col-12 d-flex justify-content-end">
                                <button onClick={() => removeCartItem(cart._id)} className="px-3 py-2" style={{border:"none", background:'#f1c40f'}}>Remove</button>
                            </div>
                        
                        </div>
                       
                    </div>

                        </>
                        ))
                       
                        : 
                        (<><h1 className="text-center">No Items in your Cart</h1></>)
                    }


                </div>

                <div className="col-md-3 cart-shadow mt-3 total"  style={{background:"white"}}>
                    <p style={{fontWeight:'bold', fontSize:'27px'}} className='my-3'>PRICE DETAILS</p>
                    <hr />
                    
                    <div className="row justify-content-between ">
                        <div className="col-8">Total Price :</div>
                        <div className="col-4">₹ {grandTotal}</div>
                    </div>
                    
                    
                    <div className="row justify-content-between">
                        <div className="col-8">Discount ({cart.length} items)</div>
                        <div className="col-4">₹ -{discount}</div>
                    </div>
                    
                    
                    <div className="row justify-content-between " style={{fontSize:'15px', color:"green"}}>
                        <div className="col-8">Delivery Charges</div>
                        <div className="col-4">{cart.length > 0 ? payable > 499 ? "Free" : '₹ 40' : 0 }</div>
                    </div>
                    <hr />


                    <div className="row justify-content-between fw-bold fs-5">
                        <div className="col-8 ">Total Price </div>
                        <div className="col-4">₹ {cart.length > 0 ? payable : 0}</div>
                    </div>

                    <hr />

                    <p style={{color:'#007500', fontWeight:'bold'}}>You will save ₹ {discount} on this order</p>

                    <hr />

                    {
                        auth?.token ? (
                            <button className="pay" style={{width:"100%", fontWeight:"bold", border:'none', background:'#f1c40f', padding:'5px 0', borderRadius:'6px'}}>Proceed to Pay</button>
                        ) : (
                            <button className="pay" data-bs-toggle="modal" 
                            data-bs-target="#login"  style={{width:"100%", fontWeight:"bold", border:'none', background:'#f1c40f', padding:'5px 0', borderRadius:'6px'}}>Login to Pay</button>
                            )
                    }
                </div>
            

            </div>
        </div>
        
    </Layout>
  )
}
export default CartPage