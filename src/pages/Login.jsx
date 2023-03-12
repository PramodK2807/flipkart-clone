import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Register from "./Register"
import {toast} from 'react-toastify'
import { useAuth } from "../Context/AuthContext"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  
useEffect(()=>{

}, [navigate, auth])


  const loginHandle = async(e) => {
    if(!email || !password){
      setError(true)
      toast.error("Please enter email and password")
      return false
    }

    if(password.length < 8){
      setError(true)
      toast.error("Password must be at least 8 characters")
      return false
    }

    try {
      let result = await fetch(`${process.env.REACT_APP_API}/login`,{method:"POST",
      body: JSON.stringify({email, password}),
      headers: { "Content-Type": "application/json" },
    })

    let res = await result.json()
    console.log(res)
    
    if(res.success){
      toast.success(res.message)
      setAuth({
        ...auth,
          user:res.user,
          token:res.token
      })
      localStorage.setItem('auth', JSON.stringify(res))
      navigate('/')
    }
    else{
      toast.error(res.message)
    }
    } 
    
    catch (error) {
      toast.error(error.message)
    }
    
  }


  return (
    <>
        <div
        style={{position:'absolute'}}
          className="modal fade my-auto"
          id="login"
          aria-labelledby="loginLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login </h5>
                <button
                style={{outline:"none"}}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                    <div className="login-cont">
                        <div className="floating-label-group">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value) }  id="email" autoComplete="off" autoFocus required />
                            <label className="floating-label">Enter Email</label>
                         </div>

                        <div className="floating-label-group">
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  autoComplete="off" autoFocus required />
                            <label className="floating-label">Enter Password</label>
                         </div>

                         
                    </div>

                    <button className="btn" onClick={loginHandle}>LOGIN</button>

                    <div className="mt-2">
                        <p>New user at Flipkart <NavLink type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#register" 
                            style={{color:'#2874f0', fontWeight:"bold"}}>Sign Up</NavLink> here </p>
                    </div>
                    <Register/>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
export default Login