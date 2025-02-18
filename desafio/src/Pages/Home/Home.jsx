import React, { useState, useEffect, useContext, useRef } from "react";
import "./Home.css";
import "./List.css";
import axios from "axios";
import { FaPlay, FaStop, FaEdit, FaTrash, FaSearch, FaHeart } from "react-icons/fa";
import { RadioContext } from "../../Context/RadioContext";

const API_URL = "https://de1.api.radio-browser.info/json/stations/search";

const Home = () => {
  const { radios, addRadio, removeRadio, selectedTags } = useContext(RadioContext);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [stations, setStations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const radiosPerPage = 10;
  const [playingStation, setPlayingStation] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    axios
      .get(API_URL, { params: { limit: 100, order: "votes", reverse: true } })
      .then((response) => setStations(response.data))
      .catch((error) => console.error("Erro ao buscar estações:", error));
  }, []);

  const togglePlay = (streamUrl) => {
    if (playingStation === streamUrl) {
      audioRef.current.pause();
      setPlayingStation(null);
    } else {
      audioRef.current.src = streamUrl;
      audioRef.current.play();
      setPlayingStation(streamUrl);
    }
  };
  

  const isFavorite = (station) => radios.some((r) => r.id === station.stationuuid);

  const filteredStations = (stations || []).filter((station) => {
    const matchesSearch = station.name.toLowerCase().includes(search.toLowerCase());
    const matchesTags = (selectedTags || []).every(tag => station.tags && station.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const totalPages = Math.ceil(filteredStations.length / radiosPerPage);
  const paginatedRadios = filteredStations.slice(
    (currentPage - 1) * radiosPerPage,
    currentPage * radiosPerPage
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
          placeholder={`Buscar por ${filterBy}`}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilterBy(e.target.value)}>
          <option value="name">Nome</option>
          <option value="country">País</option>
          <option value="language">Idioma</option>
        </select>
      </div>

      <div className="lista">
        <div className="container">
          <div className="current-radio">
            {playingStation ? "Tocando agora..." : "Selecione uma rádio"}
          </div>
          <div className="radio-list">
            {paginatedRadios.map((station) => (
              <div key={station.stationuuid} className="radio-item">
                <div className="radio-info">
                  <button onClick={() => togglePlay(station.url_resolved)}>
                    {playingStation === station.url_resolved ? <FaStop /> : <FaPlay />}
                  </button>
                  <div>
                    <p>{station.name}</p>
                    <small>{station.country} - {station.language}</small>
                  </div>
                </div>
                <div className="radio-actions">
                  <button onClick={() => isFavorite(station) ? removeRadio(station.stationuuid) : addRadio({
                    id: station.stationuuid,
                    name: station.name,
                    country: station.country,
                    language: station.language,
                    streamUrl: station.url_resolved
                  })}>
                    <FaHeart color={isFavorite(station) ? "red" : "gray"} />
                  </button>
                  <button>
                    <FaEdit />
                  </button>
                  <button onClick={() => removeRadio(station.stationuuid)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            {paginatedRadios.length === 0 && <p>Nenhuma estação encontrada.</p>}
          </div>
        </div>
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Próxima</button>
      </div>
    </div>
  );
};

export default Home;