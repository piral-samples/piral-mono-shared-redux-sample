import * as React from "react";
import { render } from "react-dom";

const style = {
    display: "grid",
    height: "70vh",
    justifyContent: "center",
    alignContent: "center",
    gap: "20px",
};

const handleLoginSuccessful = () => {
    import("./renderPiral");
};
const Login = () => (
    <div {...{ style }}>
        <div>
            <div>name</div>
            <input></input>
        </div>
        <div>
            <div>password</div>
            <input type="password"></input>
        </div>

        <button onClick={handleLoginSuccessful}>login</button>
    </div>
);

render(<Login />, document.getElementById("app"));
