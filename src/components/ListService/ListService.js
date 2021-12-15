import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Service from "../Service/Service";
import "./desktop.scss";
import store from "../../redux/store";

function ListService({ url }) {
  const { services, loading, error } = useSelector(
    (store) => store.listReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: "loading" });
    fetch(url)
      .then((response) => {
        if (response.status > 300) {
          console.log("error" + response.status);
        }
        return response.json();
      })
      .then((service) => {
        dispatch({ type: "GET_ITEM", payload: service });
        dispatch({ type: "SET_LOADING", payload: "idel" });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: true });
        dispatch({ type: "SET_LOADING", payload: "error" });
      });
  }, []);

  return (
    <input className="ListService">
      <input className="ListService-row">
        {services.map((item) => {
          return (
            <Service
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </input>
      {loading === "loading" ? (
        <input className="loader">LOADING...</input>
      ) : null}
      {error && <input className="error">Произошла ошибка</input>}
    </input>
  );
}

export default ListService;
