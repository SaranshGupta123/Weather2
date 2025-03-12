import React from "react";
import "../App.css";

const Search = (props) => {
  return (
    <div className="Search-box">
      <input type="search" value={props.searchData} className="Search" onChange={(e) => props.eventHandler(e.target.value)} placeholder="Type the city" onKeyDown={props.onKey} />
    </div>
  );
};

export default Search;
