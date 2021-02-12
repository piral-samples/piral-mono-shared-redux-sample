import "piral/polyfills";
import * as React from "react";
import { render } from "react-dom";

const style = {
  display: "grid",
  height: "70vh",
  justifyContent: "center",
  alignContent: "center",
  gap: "20px",
};

const Piral = React.lazy(() => import("./renderPiral"));

interface LoginProps {
  onLogin(user: any): void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div {...{ style }}>
      <div>
        <div>Name</div>
        <input type="text" name="name" />
      </div>
      <div>
        <div>Password</div>
        <input type="password" name="password" />
      </div>

      <button onClick={() => onLogin({})}>login</button>
    </div>
  );
};

const App = () => {
  const [user, setUser] = React.useState<any>();
  
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {user ? <Piral /> : <Login onLogin={setUser} />}
    </React.Suspense>
  );
};

render(<App />, document.getElementById("app"));
