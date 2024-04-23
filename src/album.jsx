import React, { useEffect, useState } from "react";
import "./album.css"
import Image from './components/image'

export function Album() {
  //   const data = [
  //     {
  //       id: 1,
  //       title: "Hi",
  //     },
  //     { id: 2, title: "Hello" },
  //   ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // setData([
    //   {
    //     id: 1,
    //     title: "Hi",
    //   },
    //   { id: 2, title: "Hello" },
    // ]);

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((albums) => setData(albums))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.map((item) => {
        return (
          <>
            <p key={item.id} >{item.title}</p>
           <Image path={item.url} size={100}/>
          </>
        );
      })}
    </div>
  );
}
