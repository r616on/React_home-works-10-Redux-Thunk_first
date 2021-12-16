import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Service from "../Service/Service";
import "./desktop.scss";
import preloadGif from "../img/Preload.gif";

function EditService({ url }) {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(
    (store) => store.listReducer
  );
  const form = useSelector((store) => store.formReducer);
  const params = useParams();
  console.log(params.id);

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    dispatch({ type: "CHANGE_FORM_VALUES", payload: { fild: name, value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("11");
    // if (editАFlag) {
    //   setEditАFlag(false);
    //   dispatch({
    //     type: "EDIT_ITEM",
    //     payload: {
    //       idItem: idEditEl,
    //       itemEdit: { operation: form.operation, price: form.price },
    //     },
    //   });
    //   dispatch({ type: "CHANGE_FORM_INIT" });
    // } else {
    //   if (form.operation && form.price > 0) {
    //     dispatch({
    //       type: "ADD_ITEM",
    //       payload: { operation: form.operation, price: form.price },
    //     });
    //     dispatch({ type: "CHANGE_FORM_INIT" });
    //   }
    // }
  };

  useEffect(() => {
    dispatch({ type: "SET_ERROR", payload: false });
    dispatch({ type: "SET_LOADING", payload: "loading" });
    fetch(`${url}/services/${params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        dispatch({ type: "SET_LOADING", payload: "idel" });
        dispatch({
          type: "CHANGE_FORM_VALUES",
          payload: { fild: "name", value: item.name },
        });
        dispatch({
          type: "CHANGE_FORM_VALUES",
          payload: { fild: "price", value: item.price },
        });
        dispatch({
          type: "CHANGE_FORM_VALUES",
          payload: { fild: "content", value: item.content },
        });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: true });
      });
  }, []);

  console.log(preloadGif);
  return (
    <div
      className="EditService"
      style={{
        backgroundImage: preloadGif,
      }}
    >
      {loading === "idel" && (
        <form className="Editing-form-row" onSubmit={handleSubmit}>
          <label className="EditService-lablel">
            Название
            <input
              className="form-item"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label className="EditService-lablel">
            Стоимость
            <input
              className="form-item"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </label>

          <label className="EditService-lablel">
            Описание
            <input
              className="form-item"
              name="content"
              type="text"
              value={form.content}
              onChange={handleChange}
            />
          </label>
          <div className="EditService-control">
            <div className="form-item control "> Отмена</div>
            <input
              className="form-item control"
              type="submit"
              value="Сохранить"
            />
          </div>
        </form>
      )}
      {error && <div className="error">Произошла ошибка</div>}
    </div>
  );
}

export default EditService;
