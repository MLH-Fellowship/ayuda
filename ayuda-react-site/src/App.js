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
import SingleTopicScreen from "./screens/SingleTopicScreen";
import TopicScreen from "./screens/TopicsScreen";
import CreateSubjectScreen from "./screens/CreateSubjectScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTopicScreen from "./screens/CreateTopicScreen";
import CreateQuestionScreen from "./screens/CreateQuestionScreen";

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
            <Route exact path="/topics/:topicId" component={SingleTopicScreen}  />
            <Route exact path="/topics/" component={TopicScreen}  />            

            <ProtectedRoute exact path="/create-subject" component={CreateSubjectScreen} />
            <ProtectedRoute exact path="/create-topic" component={CreateTopicScreen} />
            <ProtectedRoute exact path="/create-question" component={CreateQuestionScreen} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
