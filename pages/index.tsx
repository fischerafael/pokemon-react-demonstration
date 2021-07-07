import React, { useEffect, useState } from "react";

const index = () => {
  const [pokemonArray, setPokemonArray] = useState([
    { name: "Ditto", url: "" },
    { name: "Pikachu", url: "" },
    { name: "Bulbassaur", url: "" },
  ]);

  console.log("pokemonArray", pokemonArray);

  const [pokemonInput, setPokemonInput] = useState("");

  console.log("pokemonInput", pokemonInput);

  const handleAddPokemon = (pokemonName: string) => {
    setPokemonArray((prevState) => [
      ...prevState,
      { name: pokemonName, url: "" },
    ]);
  };

  const handleRemovePokemonn = (pokemonName: string) => {
    setPokemonArray(
      pokemonArray.filter((pokemon) => pokemon.name !== pokemonName)
    );
  };

  const fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    console.log("response", response);

    const data = await response.json();
    console.log("data", data);

    setPokemonArray(data.results);
  };

  // fetchPokemons();

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <main>
      <div>
        <h1>Pokemons</h1>

        <input
          type="text"
          placeholder="Type a pokemon name"
          value={pokemonInput}
          onChange={(e) => setPokemonInput(e.target.value)}
        />

        <button onClick={() => handleAddPokemon(pokemonInput)}>
          Add Pokemon
        </button>

        <li>
          {pokemonArray.map((pokemon, index) => (
            // <article key={index}>
            //   <h2>{pokemon.name}</h2>
            //   <button onClick={() => handleRemovePokemonn(pokemon.name)}>
            //     remove
            //   </button>
            // </article>
            <PokemonCard
              name={pokemon.name}
              onClick={() => handleRemovePokemonn(pokemon.name)}
            />
          ))}
        </li>
      </div>
    </main>
  );
};

export default index;

export const PokemonCard = ({ name, onClick }) => {
  return (
    <article>
      <h2>{name}</h2>
      <button onClick={() => onClick(name)}>remove</button>
    </article>
  );
};
