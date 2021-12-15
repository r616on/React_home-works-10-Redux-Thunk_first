import React, { useState } from "react";
import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import NewPost from "./components/NewPost/NewPost";
import ListService from "./components/ListService/ListService";
import ViewPost from "./components/ViewPost/ViewPost";
import EditService from "./components/EditService/EditService";

// const adres = "https://react-home-works-router-crid.herokuapp.com";
const adres = "http://localhost";
const port = "7070";
const url = `${adres}:${port}/api/services`;
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* <Post /> */}
          <Routes>
            {/* <Route path="/posts/new" element={<NewPost url={url} />} />
          <Route
            path="/posts/:id"
            element={
              <ViewPost
                posts={posts}
                setPosts={setPosts}
                url={url}
                updatePosts={updatePosts}
              />
            }
          /> */}
            <Route
              path="/services"
              element={
                <EditService
                  // posts={posts}
                  // setPosts={setPosts}
                  url={url}
                  // updatePosts={updatePosts}
                />
              }
            />
            {/* <Route
              path="/services"
              element={
                <ListService
                  // posts={posts}
                  // setPosts={setPosts}
                  url={url}
                  // updatePosts={updatePosts}
                />
              }
            /> */}

            <Route path="/" element={<Navigate replace to="/services" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
