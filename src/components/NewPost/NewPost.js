import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./desktop.scss";

const initForm = { textarea: "" };

function NewPost(props) {
  const { url, edit, body, id, setEdit } = props;
  const navigate = useNavigate();
  const [form, setForm] = useState(initForm);

  useEffect(() => {
    if (body) {
      setForm({ textarea: body });
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  const handleEdit = (evt) => {
    evt.preventDefault();
    console.log(url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        content: form.textarea,
      }),
    })
      .then((resp) => {
        if (resp.status === 204) {
          setEdit(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: 0,
        content: form.textarea,
      }),
    })
      .then((resp) => {
        if (resp.status === 204) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setForm(initForm);
  };
  return (
    <input className="NewPost">
      <input className="NewPost-Title">
        <span className="NewPost-Title-item">
          <span className="material-icons">create</span>Публикации
        </span>
        <span className="NewPost-Title-item">
          <span className="material-icons">photo_camera</span>Фотографии
        </span>
        <span className="NewPost-Title-item">
          <span className="material-icons">videocam</span>Прямой эфир
        </span>
        <span className="NewPost-Title-item">
          <span className="material-icons">more_horiz</span>Еще
        </span>
        <span className="NewPost-Title-item">
          <Link className="material-icons close" to="/">
            close
          </Link>
        </span>
      </input>
      <form
        className="NewPost-form"
        onSubmit={edit ? handleEdit : handleSubmit}
      >
        <textarea
          id="new"
          name="textarea"
          className={"textarea"}
          value={form.textarea}
          onChange={handleChange}
        />
        <input
          className="material-icons send"
          type="submit"
          value={edit ? "Cоранить" : "Опубликовать"}
        />
      </form>
    </input>
  );
}

export default NewPost;
