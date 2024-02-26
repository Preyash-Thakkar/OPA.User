// SearchComponent.js
import React from "react";

const SearchComponent = ({ searchList }) => {
  return (
    <div className="search-box abc">
      <input
        type="text"
        id="searchTaskList"
        className="form-control search anc"
        placeholder="Search"
        onKeyUp={(e) => searchList(e.target.value)}
      />
      <i className="ri-search-line search-icon"></i>
    </div>
  );
};

export default SearchComponent;