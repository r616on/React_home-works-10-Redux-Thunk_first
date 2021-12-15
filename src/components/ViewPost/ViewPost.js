import React, { useEffect, useState } from "react";
import Post from "../Service/Service";
import { useParams, useNavigate } from "react-router-dom";
import "./desktop.scss";
import NewPost from "../NewPost/NewPost";

function ViewPost({ url, posts, updatePosts }) {
  const params = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (posts.length === 0) {
      updatePosts();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updatePosts();
    // eslint-disable-next-line
  }, [edit]);

  const handleDelite = (id) => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.status === 204) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <input className="ViewPost">
      {!edit &&
        posts &&
        posts.map((item) => {
          if (item.id === params.id) {
            return (
              <Post key={item.id} id={item.id} body={item.content}>
                <input className="ViewPost-controll">
                  <button
                    onClick={() => setEdit((prev) => !prev)}
                    className="btn edit"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelite(item.id)}
                    className="btn delite"
                  >
                    Удалить
                  </button>
                </input>
              </Post>
            );
          } else {
            return null;
          }
        })}
      {edit &&
        posts &&
        posts.map((item) => {
          if (item.id === params.id) {
            return (
              <NewPost
                edit
                key={item.id}
                id={item.id}
                body={item.content}
                url={url}
                setEdit={setEdit}
              />
            );
          } else {
            return null;
          }
        })}
    </input>
  );
}

export default ViewPost;
