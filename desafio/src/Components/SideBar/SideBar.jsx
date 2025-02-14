import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import './SideBar.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://de1.api.radio-browser.info/json/tags";
const TAG_LIMIT = 12;

const SideBar = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");

  // Buscar os gêneros da API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const sortedTags = response.data
          .sort((a, b) => b.stationcount - a.stationcount) 
          .slice(0, TAG_LIMIT) 
          .map((tag) => tag.name); 

        setTags(sortedTags);
      })
      .catch((error) => console.error("Erro ao buscar tags:", error));
  }, []);

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className='sidebar'>
        <button><GiHamburgerMenu /></button>
        <div className="psq">
          <input type='text' value={search} placeholder='Search here' onChange={(e) => setSearch(e.target.value)}></input>
        </div>
    <div className="tag-container">
    <div className="tag-list">
      {filteredTags.map((tag) => (
        <div key={tag} className="tag" onClick={() => toggleTag(tag)}>
          {tag}
          {selectedTags.includes(tag)}
        </div>
      ))}
    </div>
  </div>
  </div>
);

}

export default SideBar
