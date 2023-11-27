"use client";

import { useEffect, useState } from "react";
import { Bar, DataFromApi } from "../utils/type";
import CardBar from "./CardBar";

export default function BarList(datas: DataFromApi) {
  const originList = datas.data;
  const [list, setList] = useState(datas.data);
  const [rating, setRating] = useState(3);
  

  useEffect(() => {
    const newList = [...originList].filter(
      (item) => parseInt(item.rating) >= rating
    );
    setList(newList);
  }, [rating, originList]);

  function changeRating(e: any) {
    setRating(e.target.value);
  }

  return (
    <div>
      <div> Nombres de bars : {list.length}</div>
      <div className="flex align-center items-center">
        <label className="mr-1">Filtrer par note</label>
        <input
          type="range"
          onChange={changeRating}
          className=""
          min="1"
          max="5"
          step="0.1"
        />
        <span className="ml-4">{rating}</span>
      </div>

      {list.map((item: Bar) => (
        <CardBar key={item.id} {...item} />
      ))}
    </div>
  );
}

