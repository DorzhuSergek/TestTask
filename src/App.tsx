import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import MainComponent, { Quotes } from "./components/MainComponent";

function App() {
  const [quotesiIems, setquotesItems] = useState<Array<Quotes>>([]);
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Array<Quotes>>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getQuotes();
  }, [page]);

  console.clear();
  console.log(quotesiIems);
  console.log(page);
  const getQuotes = () => {
    axios
      .get<Quotes[]>("https://quotable.io/quotes?page=" + page)
      .then((responce: AxiosResponse) => {
        setquotesItems(responce.data.results);
        setFilteredData(responce.data.results);
      });
  };
  const searchFilter = (text: any) => {
    if (text) {
      const newData = quotesiIems.filter((item) => {
        const itemdata = item.content
          ? item.content.toLowerCase()
          : "".toLowerCase();
        const textdata = text.toString().toUpperCase();
        return itemdata.indexOf(textdata) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(quotesiIems);
      setSearch(text);
    }
  };
  return (
    <div className="App">
      <input
        className="search"
        placeholder="search"
        value={search}
        onChange={(text) => searchFilter(text)}
      />
      <div>
        {filteredData.length > 0 &&
          filteredData.map((item: Quotes, index: number) => {
            return <MainComponent character={item} key={index} />;
          })}
      </div>
      <button onClick={() => setPage(page - 1)}>Back</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default App;
