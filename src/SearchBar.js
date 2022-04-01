import React from 'react'

function SearchBar({searchTerm, setSearchTerm}) {
  return (
    <div id="search-div">
    {" "}
    <input
      id="search"
      value={searchTerm}
      type="text"
      placeholder="Search City, Craft Shape, and Key Word"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <i className=""></i>
  </div>
  )
}

export default SearchBar