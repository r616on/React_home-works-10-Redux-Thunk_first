import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./desktop.scss";

function EditService({ url }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store.listReducer);
  const form = useSelector((store) => store.formReducer);
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    dispatch({ type: "CHANGE_FORM_VALUES", payload: { fild: name, value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: "loading" });
    fetch(`${url}/services/`, {
      method: "POST",
      body: JSON.stringify({ ...form, id: +params.id }),
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: "SET_LOADING", payload: "idel" });
          navigate("/");
        }
      })
      .catch(() => {
        dispatch({ type: "SET_LOADING", payload: "idel" });
        dispatch({ type: "SET_ERROR", payload: true });
      });
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
          type: "CHANGE_FORM_IN_ITEM",
          payload: {
            name: item.name,
            price: item.price,
            content: item.content,
          },
        });
      })
      .catch(() => {
        dispatch({ type: "SET_LOADING", payload: "idel" });
        dispatch({ type: "SET_ERROR", payload: true });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="EditService">
      {loading === "loading" ? (
        <div className="EditService-Loading"></div>
      ) : null}
      {
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
            <Link to="/" className="form-item control ">
              Отмена
            </Link>
            <input
              className="form-item control"
              type="submit"
              value="Сохранить"
            />
          </div>
        </form>
      }
      {error && <div className="error">Произошла ошибка</div>}
    </div>
  );
}

export default EditService;
