import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, TextField } from "@material-ui/core";

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
    <div
      className="login"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        height: "100vh",
        background: "#6e2a8a",
      }}
    >
      <Card
        style={{
          padding: "50px",
          borderRadius: "15px",
          boxShadow: "10px 10px 10px #5f117f",
          margin: "15px",
        }}
      >
        <h3 style={{ marginBottom: "40px" }}>
          Please enter your login credentials
        </h3>
        <form onSubmit={(e) => submitHandler(e)}>
          <TextField
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "250px", height: "20px", marginBottom: "35px" }}
            value={email}
            className="emailinput"
            required={true}
            placeholder="Email Address"
          />
          <br />
          <TextField
            style={{ width: "250px", height: "20px", marginBottom: "20px" }}
            className="emailinput"
            placeholder="Password"
            type="password"
          />
          <br />
          <Button
            type="submit"
            style={{
              marginTop: "40px",
              background: "#84459e",
              color: "#fff",
              width: "35%",
            }}
          >
            Log in
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
