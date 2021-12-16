import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./desktop.scss";

const Service = ({ id, name, price, handleDel }) => {
  return (
    <div className="Item" id={id}>
      <span className="Item-item operation">{name}</span>
      <span className="Item-item price"> {price}</span>
      <Link to={`/services/${id}`} className="Item-item  edit">
        <span className="material-icons edit">edit</span>
      </Link>
      <span onClick={() => handleDel(id)} className="Item-item del">
        <span className="material-icons del">clear</span>
      </span>
    </div>
  );
};

Service.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  handleDel: PropTypes.func,
};

export default Service;
