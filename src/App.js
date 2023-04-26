import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 10;

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`
      );
      setPokemonList(response.data.results);
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPokemonList.length / PER_PAGE);

  const displayPokemonList = filteredPokemonList.slice(
    currentPage * PER_PAGE,
    (currentPage + 1) * PER_PAGE
  );

  const maxPagesToShow = 10;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  const items = [];

  if (pageCount <= maxPagesToShow) {
    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage + 1}
          onClick={() => setCurrentPage(i - 1)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    let startPage = Math.max(currentPage - halfMaxPagesToShow, 0);
    let endPage = Math.min(startPage + maxPagesToShow - 1, pageCount - 1);

    if (startPage > 0) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    if (endPage < pageCount - 1) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
    }
  }

  return (
    <>
      <div className="App">
        <div className="content">
          <div className="search-container">
            <h1>Pokedex</h1>
            <input
              type="text"
              placeholder="Buscar pokemon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="pokemon-list">
            {displayPokemonList.map((pokemon) => (
              <div key={pokemon.name} className="pokemon-card">
                <div className="pokemon-image">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokemon.url.split("/")[6]
                    }.png`}
                    alt={pokemon.name}
                  />
                </div>
                <div className="pokemon-info">
                  <p className="pokemon-number">#{pokemon.url.split("/")[6]}</p>
                  <p
                    className="pokemon-name"
                    onClick={() => console.log(pokemon.url)}
                  >
                    {" "}
                    {pokemon.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Pagination size="sm">
            {currentPage > 0 && (
              <>
                <Pagination.First onClick={() => setCurrentPage(0)} />
                <Pagination.Prev
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              </>
            )}
            {items}
            {currentPage < pageCount - 1 && (
              <>
                <Pagination.Next
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(pageCount - 1)}
                />
              </>
            )}
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default App;
