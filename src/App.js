import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ListService from "./components/ListService/ListService";
import EditService from "./components/EditService/EditService";

const adres = "https://react-home-works-redux-thunk.herokuapp.com";
// const adres = "http://localhost";
const port = "";
const url = `${adres}:${port}/api`;
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/services/:id" element={<EditService url={url} />} />
            <Route path="/services" element={<ListService url={url} />} />
            <Route path="/" element={<Navigate replace to="/services" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
