import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Service from "../Service/Service";
import "./desktop.scss";

function ListService({ url }) {
  const { services, loading, error } = useSelector(
    (store) => store.listReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_ERROR", payload: false });
    dispatch({ type: "SET_LOADING", payload: "loading" });
    fetch(`${url}/services`)
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
      .catch(() => {
        dispatch({ type: "SET_ERROR", payload: true });
      });
    // eslint-disable-next-line
  }, []);

  const handleDel = (id) => {
    dispatch({ type: "SET_ERROR", payload: false });
    dispatch({ type: "SET_LOADING", payload: "loading" });
    fetch(`${url}/services/:${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: "DELETE_ITEM", payload: id });
          dispatch({ type: "SET_LOADING", payload: "idel" });
        }
      })
      .catch(() => {
        dispatch({ type: "SET_ERROR", payload: true });
        dispatch({ type: "SET_LOADING", payload: "idel" });
      });
  };
  return (
    <div className="ListService">
      <div className="ListService-row">
        {services.map((item) => {
          return (
            <Service
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              handleDel={handleDel}
            />
          );
        })}
      </div>
      {loading === "loading" ? <div className="loader">LOADING...</div> : null}
      {error && <div className="error">Произошла ошибка</div>}
    </div>
  );
}

export default ListService;
