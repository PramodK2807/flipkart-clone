import { useState } from "react"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"

const Register = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cpassword, setCPassword] = useState()
  const [mobile, setMobile] = useState()
  const [name, setName] = useState()
  const [error, setError] = useState()


  const signUpHandle = async() => {
    if(!email || !password || !cpassword || !mobile || !name) {
      setError(true)
      toast.error("Please fill all required fields")
      return false
    }

    if (password !== cpassword ) {
      setError(true);
      toast.error("Password doesn't match");
      return false;
    }

    if(password.length < 8 ){
      setError(true);
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if(mobile.length < 10 ){
      setError(true);
      toast.error("Enter Correct Mobile Number");
      return false;
    }

    try {
      let response = await fetch(`${process.env.REACT_APP_API}/register`, {method:"POST",
      body:JSON.stringify({name, email, password, cpassword, mobile}),
      headers: { "Content-Type" : "application/json" },
    })

    let data = await response.json();
      if (data.success) {
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } 
    catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
        <div
          className="modal fade my-auto"
          id="register"
          aria-labelledby="registerLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register </h5>
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
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" autoComplete="off" autoFocus required />
                            <label className="floating-label">Full Name</label>
                         </div>

                        <div className="floating-label-group">
                            <input type="email" value={email} onChange={(e) => setEmail
                              (e.target.value)} id="email" autoComplete="off" autoFocus required />
                            <label className="floating-label"> Email</label>
                         </div>

                        <div className="floating-label-group">
                            <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} id="mobile" autoComplete="off" autoFocus required />
                            <label className="floating-label"> Phone Number </label>
                         </div>

                        <div className="floating-label-group">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" autoComplete="off" autoFocus required />
                            <label className="floating-label"> Password </label>
                         </div>

                        <div className="floating-label-group">
                            <input type="password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} id="cpassword"  autoComplete="off" autoFocus required />
                            <label className="floating-label">Confirm Password</label>
                         </div>
                    </div>


                    <button className="btn" onClick={signUpHandle}>SIGN UP</button>

                    <p className="pt-2">Already User <NavLink type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#register" 
                            style={{color:'#2874f0', fontWeight:"bold"}}>Login</NavLink></p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
export default Register

