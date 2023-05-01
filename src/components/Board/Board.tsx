import React, { useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import Container from "../Container";
import { Board, Story } from "../../common/types";
import "./style.scss";

const initialBoards: Board[] = [
  {
    id: v4(),
    title: "ToDo",
    stories: [
      {
        id: v4(),
        title: "hello",
        subTitle: "merch",
        autor: "name",
        comments: 7,
      },
      {
        id: v4(),
        title: "hello",
        subTitle: "merch",
        autor: "name",
        comments: 18,
      },
    ],
  },
  {
    id: v4(),
    title: "In Progress",
    stories: [],
  },
  {
    id: v4(),
    title: "Done",
    stories: [],
  },
];

const Boards = () => {
  const [boards, setBoards] = useState(initialBoards);
  const [data, setData] = useState("");
  const [githubIssues, setGithubIssues] = useState<Story[]>([]);

  const fetchData = (inputdata: string) => {
    axios
      .get<Story[]>(`https://api.github.com/repos/${inputdata}/issues?state=all`)
      .then((response) => setGithubIssues(response.data))
      .catch((error) => console.error(error));
  };

  const refreshBoard = (targetId: string | undefined, currentDraggableId: string) => {
    if (!targetId || !currentDraggableId) {
      return;
    }

    setBoards((prevBoards) => {
      let currentStory: Story | null = null;
      const updatedBoards = prevBoards.map((board) => {
        const updatedStories = board.stories.filter((story) => {
          if (story.id === currentDraggableId) {
            currentStory = story;
            return false;
          }
          return true;
        });
        return { ...board, stories: updatedStories };
      });

      const targetBoardIndex = updatedBoards.findIndex((board) => board.id === targetId);
      if (currentStory && targetBoardIndex >= 0) {
        const targetBoard = updatedBoards[targetBoardIndex];
        const updatedTargetBoard = {
          ...targetBoard,
          stories: [...targetBoard.stories, currentStory],
        };
        return [
          ...updatedBoards.slice(0, targetBoardIndex),
          updatedTargetBoard,
          ...updatedBoards.slice(targetBoardIndex + 1),
        ];
      }
      return updatedBoards;
    });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchData(data);
    setData("");
  };

  return (
    <div className="container">
      <form className="group-input">
        <input
          value={data}
          onChange={onChangeInput}
          type="text"
          placeholder="facebook/react"
        />
        <button onClick={onClickHandler} type="submit">
          Search
        </button>
      </form>
      <label style={{ fontWeight: "700", color: "orangered" }}>
        Please enter owner/repo
      </label>

      <div className="items">
        {boards.map((board) => (
          <Container
            key={board.id}
            board={board}
            githubIssues={githubIssues}
            refreshBoard={refreshBoard}
          />
        ))}
      </div>
  </div>
  )
        }
        export default Boards