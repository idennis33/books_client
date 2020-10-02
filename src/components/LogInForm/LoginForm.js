import React from "react";
import styled from 'styled-components'; 
const Div = styled.div`
  text-align: center;
  background-color: grey; 
  font-size: 20px; 
  `  
export default function LogInForm(props) {
  return (
    <Div>
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
    </Div>
  );
}


