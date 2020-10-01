import React from "react";

export default function LogInForm(props) {
  return (
    <div style={{textAlign:"center"}}>
      <h1>Log In</h1>

      <form>
        <div >
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={props.handleInput} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={props.handleInput} />
        </div>
        <input value="Submit" type="submit" onClick={props.handleLogIn} />
      </form>
    </div>
  );
}


