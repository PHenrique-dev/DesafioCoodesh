import React, { useState, useEffect } from "react";
import "./Home.css";
import "./List.css";
import axios from "axios";
import { FaPlay, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const API_URL = "https://de1.api.radio-browser.info/json/stations/search";

const Home = () => {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL, {
        params: { limit: 8, order: "votes", reverse: true },
      })
      .then((response) => setStations(response.data))
      .catch((error) => console.error("Erro ao buscar estações:", error));
  }, []);

  // Filtra as estações com base no nome digitado na pesquisa
  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <div className="title">
        <h1>Radio Browser</h1>
      </div>
      <div className="filtros">
        <p>FAVORITE RADIOS</p>
        <button>
          <FaSearch />
        </button>
        <input
          type="text"
          value={search}
          placeholder="Search stations"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="lista">
        <div className="container">
          <div className="current-radio">NOME DA RÁDIO ATUAL</div>
          <div className="radio-list">
            {filteredStations.map((station) => (
              <div key={station.stationuuid} className="radio-item">
                <div className="radio-info">
                  <button>
                    <FaPlay />
                  </button>
                  <div>
                    <p>{station.name}</p>
                    <small>{station.country}</small>
                  </div>
                </div>
                <div className="radio-actions">
                  <button>
                    <FaEdit />
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            {filteredStations.length === 0 && <p>Nenhuma estação encontrada.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;