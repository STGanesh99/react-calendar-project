import React,{useState} from 'react'
import {
    useHistory
  } from "react-router-dom";
import BigCalendar from "./BigCalendar.scss"
import { Button } from "@material-ui/core";
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
      <div className="login" style={{margin:"20%",fontSize:"20px"}}>
      <h3>Please Enter your email Id to Proceed</h3>
      <form onSubmit={submit} >
      <input type="email" onChange={(e)=>setemail(e.target.value)} style={{width:"200px",height:"20px",borderRadius:"20px"}} value = {email}
          className="emailinput"
          required={true}
      />
      <br/>
      <Button type="submit" style={{margin:"20px"}}>Log in</Button>
      </form>
      </div>)
}

export default Login