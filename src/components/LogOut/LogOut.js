import React from "react";
import styled from 'styled-components'; 

const Div = styled.div`
  text-align: center;
  background-color: grey; 
  font-size: 20px; 
  `  
export default function LogOut(props) {
  return (
    <Div>
      <h1>Log Out</h1>

      <form>
        <input value="Log Out" type="submit" onClick={props.handleLogOut} />
      </form>
    </Div>
  );
}

