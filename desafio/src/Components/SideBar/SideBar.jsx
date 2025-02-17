import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./SideBar.css";
import axios from "axios";

const API_URL = "https://de1.api.radio-browser.info/json/tags";
const TAG_LIMIT = 12;

const SideBar = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/fechar a sidebar
  const [stations, setStations] = useState([]); // Lista de estações de rádio
  const [filteredStations, setFilteredStations] = useState([]); // Estações filtradas pelas tags

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

    // Buscar as estações de rádio
    axios
      .get("https://de1.api.radio-browser.info/json/stations")
      .then((response) => {
        setStations(response.data); // Salvando as estações
        setFilteredStations(response.data); // Inicialmente, todas as estações
      })
      .catch((error) => console.error("Erro ao buscar estações:", error));
  }, []);

  // Função para alternar a tag selecionada
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)  // Se a tag já foi selecionada, remove
        : [...prev, tag]                 // Se não foi selecionada, adiciona
    );
  };

  // Filtrando as estações com base nas tags selecionadas
  useEffect(() => {
    if (selectedTags.length > 0) {
      // Filtrando as estações de acordo com as tags selecionadas
      const filtered = stations.filter(station =>
        selectedTags.every(tag => station.tags && station.tags.includes(tag)) // Verificando se todas as tags estão presentes
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations(stations); // Se nenhuma tag for selecionada, mostrar todas as estações
    }
  }, [selectedTags, stations]);

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Botão para abrir/fechar */}
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu />
      </button>

      {/* Conteúdo da Sidebar */}
      {isOpen && (
        <div className="sidebar-content">
          <div className="psq">
            <input
              type="text"
              value={search}
              placeholder="Search here"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="tag-container">
            <div className="tag-list">
              {filteredTags.map((tag) => (
                <div
                  key={tag}
                  className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
                  onClick={() => toggleTag(tag)} // Chamando toggleTag ao clicar
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Mostrar estações filtradas pelas tags */}
          <div className="station-list">
            {filteredStations.map((station) => (
              <div key={station.stationuuid} className="station-item">
                <p>{station.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
