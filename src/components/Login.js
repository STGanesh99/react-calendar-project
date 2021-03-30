import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
const Login = () => {
  let [email, setEmail] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    history.replace({
      pathname: "/",
      state: { email: email },
    });
  };

  return (
    <div className="login" style={{ margin: "20%", fontSize: "20px" }}>
      <h3>Please enter your login credentials</h3>
      <form onSubmit={(e) => submitHandler(e)}>
        <TextField
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "200px", height: "20px", marginBottom: "20px" }}
          value={email}
          className="emailinput"
          required={true}
          placeholder="Email Address"
        />
        <br />
        <TextField
          type="text"
          style={{ width: "200px", height: "20px", marginBottom: "20px" }}
          className="emailinput"
          placeholder="Password"
        />
        <br />
        <Button type="submit" style={{ margin: "20px" }}>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
