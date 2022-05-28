import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import MainComponent, { Quotes } from "./components/MainComponent";

function App() {
  const [quotesiIems, setquotesItems] = useState<Array<Quotes>>([]);
  let [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getQuotes();
  }, [page]);

  const getQuotes = () => {
    axios
      .get<Quotes[]>("https://quotable.io/quotes?page=" + page)
      .then((responce: AxiosResponse) => {
        setquotesItems(responce.data.results);
      });
  };

  const filteredData = quotesiIems.filter((content) => {
    return content.content.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="App">
      <div className="container--header">
        <div>
          <input
            placeholder="search"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button onClick={() => setPage(page - 1)}>Back Page</button>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
      <div>
        {filteredData.length > 0 &&
          filteredData.map((item: Quotes, index: number) => {
            return <MainComponent character={item} key={index} />;
          })}
      </div>
    </div>
  );
}

export default App;
