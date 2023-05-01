import React from "react";
import { Board } from "../common/types";
import Todos from "./Todos";

interface props {
  items: Board;
  refreshBoard: (
    targetId: string | undefined,
    currentDraggbleId: string
  ) => void;
}

const Container: React.FC<props> = ({items, refreshBoard}) => {
  const onDragEnterHandler = (e: any) => {
    e.preventDefault();
    // console.log("onDragEnterHandler");
    const currentElement = e.target as HTMLDivElement;
    currentElement.closest(".container")?.classList.add("drag-over");
  };
  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    const currentElement = e.target as HTMLDivElement;
    currentElement.closest(".container")?.classList.add("drag-over");

    // console.log("dragover");
  };
  const onDropHandler = (e: any) => {
    const currentElement = e.target as HTMLDivElement;
    const currentDraggbleId = e.dataTransfer.getData("text/plain") as string;
    currentElement.closest(".container")?.classList.remove("drag-over");
    // console.log("dropHandler");
    const targetId = currentElement.closest(".container")?.id;
    refreshBoard(targetId, currentDraggbleId);
  };
  const onDragLeaveHandler = (e: any) => {
    const currentElement = e.target as HTMLDivElement;
    currentElement.closest(".container")?.classList.remove("drag-over");
    // console.log("leaveHandler");
  };
  return (
    <div className="container">
      {items.title}

      <div
        className="areas container"
        id={items.id}
        onDragLeave={onDragLeaveHandler}
        onDrop={onDropHandler}
        onDragEnter={onDragEnterHandler}
        onDragOver={onDragOverHandler}
      >
        <div className="story-items">
            <Todos items={items} key={items.id} />
        </div>
      </div>
    </div>
    
  );
};

export default Container;
