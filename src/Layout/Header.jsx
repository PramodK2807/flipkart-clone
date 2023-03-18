import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { useCart } from "../Context/CartContext"
import { useSearch } from "../Context/Search"
import Login from "../pages/Login"
import '../style/Login.css'
// import Searc from "./Searc"

const Header = () => {

  const [menu, setMenu] = useState(false)
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart([])
  const [search, setSearch] = useSearch()
  const navigate = useNavigate()

  const searchPro = async(e) => {
    e.preventDefault()
      try {
        const result = await fetch(`${process.env.REACT_APP_API}/search/${search.keyword}`)
        let data = await result.json()
        console.log(data)
        setSearch({...search, result:data})
        navigate('/search')
      } 
      catch (error) {
        // console.log(error)
      }

  }



  useEffect(() => {

  }, [auth])

  const logout = () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("auth");
  };
      

  return (
    <div className="navbarContainer">
      <header className="container nav-cont">
        <div className="logo">
          <h2><NavLink style={{color:"white"}} to='/'>Flipkart</NavLink></h2>
        </div>

        <div
          className="d-flex align-items-center pl-5 w-30 mx-2 "
          style={{ position: "relative" }}
        >

          <input
            style={{ width: "100%" }}
            type="text"
            value={search.keywords}
            onChange={(e) => setSearch({...search, keyword: e.target.value})}
            placeholder="Search..."
          />
          <i
          onClick={searchPro}
            style={{
              position: "absolute",
              right: "10px",
              color: "#2874f0",
              background: "white",
              cursor: "pointer",
            }}
            className="fa-sharp fa-solid fa-magnifying-glass"
          ></i>
        </div>

        <div className={menu ? "mobile" : "nav-items"}>
          <ul>
            {
              auth?.user ? ('') 
              : 
              (<>
              <li>
                <NavLink
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                  className="loginbtn"
                >
                  Login
                </NavLink>
              </li>
              </>)
            }
            <li>
              <NavLink to="/">Become a Seller</NavLink>
            </li>
            <li>
              <NavLink to="/">More</NavLink>
            </li>

           {
            auth?.user ? (<li>
              <NavLink to="/" onClick={logout}>Logout</NavLink>
            </li>) : ('')
           }

            <li>
              <NavLink to="/cart">
                  <i className="fa-solid fa-cart-shopping" />({cart?.length})
              </NavLink>
            </li>
            
          </ul>
        </div>

        <Login/>

        <div className="main">
          
          <div
            style={{ color: "white" }}
            className={!menu ? "fa-solid fa-bars" : "fa-solid fa-x"}
            id="menu-icon"
            onClick={() => setMenu(!menu)}
          ></div>
        </div>
      </header>
    </div>
  );
}
export default Header