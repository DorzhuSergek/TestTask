import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import "./MainComponent.css";

interface PropTypes {
  character: Quotes;
}

export interface Quotes {
  tags: [string, string];
  author: string;
  content: string;
  dateAdded: string;
}

function MainComponent(props: PropTypes) {
  const [like, setLike] = useState(0);
  localStorage.setItem("like", like.toString());
  let likeSave = localStorage.getItem("like");
  return (
    <div className="container">
      <div>
        <div className="quote">
          <a className="author"> {props.character.author}</a>
          <div className="content"> {props.character.content}</div>
          <div className="tag">
            <div>{props.character.tags[0]}</div>
            <div>{props.character.tags[1]}</div>
          </div>
          <div>{likeSave}</div>
          <button onClick={() => setLike(like + 1)}>Like</button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;