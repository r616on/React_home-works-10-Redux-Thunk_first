import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./desktop.scss";

const Service = ({ id, name, price }) => {
  return (
    <input className="Item" id={id}>
      <span className="Item-item operation">{name}</span>
      <span className="Item-item price"> {price}</span>
      <span className="Item-item  edit">
        <span className="material-icons edit">edit</span>
      </span>
      <span className="Item-item del">
        <span className="material-icons del">clear</span>
      </span>
    </input>
  );
};

Service.propTypes = {};

export default Service;

// onClick={() => handleEdit(id)}
// onClick={() => handleDel(id)}
