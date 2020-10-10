import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SubjectScreen from "./screens/SubjectsScreen";
import "./index.css";
import SingleSubjectScreen from "./screens/SingleSubjectScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout>
          <Switch>
            {/* <Route exact path="/" component={HomePage} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/search" component={SearchScreen}  />
            <Route exact path="/subjects" component={SubjectScreen}  />
            <Route exact path="/subjects/:subjectId" component={SingleSubjectScreen}  />


            {/* <ProtectedRoute exact path="/app" component={AppLayout} /> */}
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
