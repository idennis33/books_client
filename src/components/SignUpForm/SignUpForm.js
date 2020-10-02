import React from "react";

import styled from 'styled-components'; 

const Div = styled.div`
  text-align: center;
  background-color: grey; 
  font-size: 20px; 
  `  

export default function SignUpForm(props) {
  return (
    <Div >
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
    </Div>
  );
}

