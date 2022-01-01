import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

function App() {
  const [loading, setLoading] = useState(true);
  const [dollars, setDollars] = useState(0);
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setDollars(e.target.value);
  };
  const onSelect = (e) => {
    setIndex(e.target.value);
  };
  const onClick = () => {
    setDollars("");
  };
  // const exchange = ()=> {
  //   setDollars()
  // }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Dollar -> coin"
          value={dollars}
        ></input>
        <button onClick={onClick}>Reset</button>
      </form>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select value={index} onChange={onSelect}>
          {coins.map((coin) => (
            <option value={coin.rank}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      {`${dollars} dollars -> 
        ${dollars / Math.round(coins[index - 1].quotes.USD.price)}${
        coins[index - 1].symbol
      }`}
    </div>
  );
}
export default App;
