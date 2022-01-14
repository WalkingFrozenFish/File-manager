// Импортируем хуки
import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [parent, setParent] = useState("");
  const [data, setData] = useState({
    path: "",
    files: []
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(
        (result) => {
          setParent("");
          setData(result);
        },
        (error) => {
          console.log(error);
        })
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/?path=" + event.target.attributes.href.value)
      .then(res => res.json())
      .then((result) => {
        let linkArr = result.path.split("/");
        linkArr.pop();
        setParent(linkArr.join("/"));
        setData(result);
      },
        (error) => {

        })
  }

  return (
    <div className="file-manager">
      <div>
        <a href={parent} onClick={clickHandler}>
          level up
        </a>
      </div>
      <div className="current-level">
        current: {data.path === "" ? "/" : data.path
          // <a href={data.path}>
          //   {data.path}
          // </a>
        }
      </div>
      <ul className="folder-list">
        {data.files.map(item => {

          if (item.dir) {
            return <li key={item.name} className="folder">
              <a href={data.path + "/" + item.name} onClick={clickHandler}>
                {item.name.toUpperCase()}
              </a>
            </li>;
          } else {
            return <li key={item.name} className="file">{item.name}</li>;
          }

        })}
      </ul>
    </div>
  );
}

export default App;
