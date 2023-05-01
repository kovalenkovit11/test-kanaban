import React from "react";

import { Board } from "../common/types";
interface props {
    items: Board
}
const Todos: React.FC<props> = () => {
  const onDragStartHandler = (event: any) => {
    const currentElement = event.target as HTMLDivElement;
    event.dataTransfer.setData("text/plain", "Hello, World!" );
    // console.log("draggin started" + stories.id);

    setTimeout(() => {
      currentElement.classList.add("hide");
    }, 0);
  };
  const onDragEndHandler = (e: any) => {
    // console.log("draggin ended" + stories.id);
    const currentElement = e.target as HTMLDivElement;
    currentElement.classList.remove("hide");
  };

  return (
    <div>
      <div
        className="draggble-items"
        draggable={true}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
      >
        <div className="title">tiytle</div>
        <div className="subtitle">subtitle</div>
        <div className="author">
        subtitle | subtitle
        </div>
      </div>
    </div>
  );
};

export default Todos;
