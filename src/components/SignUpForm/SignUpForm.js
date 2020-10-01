import React from "react";

import "./SignUpForm.css";

export default function SignUpForm(props) {
  return (
    <div style={{textAlign:"center"}}>
      <h1>Sign Up</h1>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={props.handleInput} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" onChange={props.handleInput} />
        </div>
        <input value="Submit" type="submit" onClick={props.handleSignUp} />
      </form>
    </div>
  );
}

