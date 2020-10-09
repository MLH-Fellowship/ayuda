import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import "./index.css";
import AppLayoutWithSidebar from "./components/AppLayoutWithSidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppLayout>
            {/* <Route exact path="/" component={HomePage} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
            {/* <ProtectedRoute exact path="/app" component={AppLayout} /> */}
          </AppLayout>
          <AppLayoutWithSidebar>
            <Route exact path="/home" component={HomeScreen} />
          </AppLayoutWithSidebar>

          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
