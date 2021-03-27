import React,{useState} from 'react'
import {
    useHistory
  } from "react-router-dom";
import BigCalendar from "./BigCalendar.scss"

const Login = ()=>{
    
    let [email,setemail]  = useState("")
    const history = useHistory()
const submit = ()=>{
       history.replace({
           pathname:"/calendar",
           state:{email:email}
       })
}

    return(
      <div className="login" style={{margin:"10%"}}>
      <h3>Please Enter your email Id to Proceed</h3>
      <form onSubmit={submit}>
      <input type="email" onChange={(e)=>setemail(e.target.value)} style={{width:"200px",height:"20px",borderRadius:"20px"}} value = {email}
          className="emailinput"
      />
      </form>
      </div>)
}

export default Login