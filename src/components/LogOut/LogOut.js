import React from "react";

export default function LogOut(props) {
  return (
    <div style={{textAlign:"center"}}>
      <h1>Log Out</h1>

      <form>
        <input value="Log Out" type="submit" onClick={props.handleLogOut} />
      </form>
    </div>
  );
}

