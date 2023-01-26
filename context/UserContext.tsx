"use client";
import React, { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import ModalContext from "./ModalContext";

type _Board = {
  id: string;
  name: string;
};

type _response = {
  type: string | null;
  error: string | null;
  loading: boolean;
};

type UserContextState = {
  boards: _Board[] | [];
  initializeData: Function;
  currentBoard: Board | null;
  addBoard: Function;
  getBoardList: Function;
  changeCurrentBoard: Function;
  changeBoardName: Function;
  addTask: Function;
  editTask: Function;
  changeStatus: Function;
  toggleSubtask: Function;
  deleteTask: Function;
  deleteBoard: Function;
  response: _response;
  dropTask: Function;
};

const contextDefaultValues: UserContextState = {
  boards: [],
  response: { type: null, error: null, loading: false },
  currentBoard: null,
  initializeData: () => {},
  addBoard: () => {},
  getBoardList: () => {},
  changeCurrentBoard: () => {},
  changeBoardName: () => {},
  changeStatus: () => {},
  addTask: () => {},
  editTask: () => {},
  toggleSubtask: () => {},
  deleteTask: () => {},
  deleteBoard: () => {},
  dropTask: () => {},
};

const UserContext = createContext<UserContextState>(contextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toggleModal, activeModal } = useContext(ModalContext);
  const [boards, setBoards] = useState(contextDefaultValues.boards);
  const [response, setResponse] = useState(contextDefaultValues.response);
  const [currentBoard, setCurrentBoard] = useState(
    contextDefaultValues.currentBoard
  );

  const initializeData = (boards: Board[] | []) => {
    setBoards(boards);
  };

  const addBoard = async (data: {
    name: string;
    status: { name: string }[] | [];
  }) => {
    setResponse({ ...response, type: "addBoard", loading: true });
    await fetch("/api/boards/addBoard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }
        await res.json().then((_res) => {
          setResponse({ ...response, loading: false });
          setBoards([...boards, { name: _res.board.name, id: _res.board.id }]);
          toggleModal(null);
          router.push(`/${_res.board.id}`);
        });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setResponse({ ...response, loading: false, error: error.message });
        setTimeout(() => setResponse({ ...response, error: null }), 3000);
      });
  };

  const getBoardList = async () => {
    setResponse({ ...response, type: "boardList", loading: true });
    await fetch("/api/boards/boardList", {
      method: "GET",
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }
        await res.json().then((_res) => {
          setResponse({ ...response, type: null, loading: false });
          setBoards(_res.boardList);
        });
      })
      .catch((err) => console.error(err));
  };

  const changeCurrentBoard = (board: Board) => setCurrentBoard(board);

  const changeBoardName = (id: string, newName: string) =>
    setBoards(
      boards.map((val) => (val.id === id ? { ...val, name: newName } : val))
    );

  const addTask = (task: Task) => {
    currentBoard &&
      setCurrentBoard({
        ...currentBoard,
        Status: currentBoard.Status.map((val) =>
          val.id === task.statusId ? { ...val, Task: [...val.Task, task] } : val
        ),
      });
  };

  const editTask = async (
    task: Task,
    oldStatusId: string,
    change: boolean = true
  ) => {
    setResponse({ ...response, loading: true });
    await fetch(`/api/tasks/edit/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: task }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }

        await res.json().then((_response) => {
          setResponse({ ...response, loading: false });
          if (!currentBoard) return;
          if (!change) return;
          setCurrentBoard({ ...currentBoard, Status: _response.status });
          toggleModal(null);
        });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setResponse({ ...response, loading: false, error: error.message });
        setTimeout(() => setResponse({ ...response, error: null }), 3000);
      });
  };

  const changeStatus = (task: Task, oldStatusId: string) => {
    if (!currentBoard) return;
    const oldTaskRank = currentBoard.Status.find(
      (val) => val.id === oldStatusId
    )?.Task.find((val) => val.id === task.id)?.rank;

    const filteredBoard: Board = {
      ...currentBoard,
      Status: currentBoard.Status.map((val) =>
        val.id === oldStatusId
          ? {
              ...val,
              Task: val.Task.map((_val) =>
                oldTaskRank && _val.rank > oldTaskRank
                  ? { ..._val, rank: _val.rank - 1 }
                  : _val
              ).filter((_val) => _val.id !== task.id),
            }
          : val
      ),
    };

    const newBoard = {
      ...filteredBoard,
      Status: filteredBoard.Status.map((val) =>
        val.id === task.statusId ? { ...val, Task: [...val.Task, task] } : val
      ),
    };
    editTask(task, oldStatusId, false);
    toggleModal(activeModal, task);
    setCurrentBoard(newBoard);
  };

  const toggleSubtask = async (
    data: { taskId: string; subtaskId: string },
    statusId: string
  ) => {
    if (!currentBoard) return;
    setCurrentBoard({
      ...currentBoard,
      Status: currentBoard.Status.map((val) =>
        val.id === statusId
          ? {
              ...val,
              Task: val.Task.map((_val) =>
                _val.id === data.taskId
                  ? {
                      ..._val,
                      subtask: _val.subtask.map((__val) =>
                        __val.id === data.subtaskId
                          ? { ...__val, completed: !__val.completed }
                          : __val
                      ),
                    }
                  : _val
              ),
            }
          : val
      ),
    });

    await fetch("/api/tasks/edit/toggleSubtask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }
      })
      .catch((err: any) => {});
  };

  const deleteTask = async (task: Task) => {
    setResponse({ ...response, loading: true });
    await fetch(`/api/tasks/deleteTask`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { taskId: task.id } }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }
        if (!currentBoard) return;
        setResponse({ ...response, loading: false });

        setCurrentBoard({
          ...currentBoard,
          Status: currentBoard.Status.map((val) =>
            val.id === task.statusId
              ? {
                  ...val,
                  Task: val.Task.filter((_val) => _val.id !== task.id).map(
                    (_val) =>
                      _val.rank > task.rank
                        ? { ..._val, rank: _val.rank - 1 }
                        : _val
                  ),
                }
              : val
          ),
        });

        toggleModal(null);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setResponse({ ...response, loading: false });
      });
  };

  const deleteBoard = async () => {
    setResponse({ ...response, loading: true });
    if (!currentBoard) return;
    await fetch(`/api/boards/deleteBoard`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { boardId: currentBoard.id } }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }
        if (!currentBoard) return;
        setResponse({ ...response, loading: false });
        const newBoards = boards.filter((val) => val.id !== currentBoard.id);
        setBoards(newBoards);
        router.push(newBoards[0] ? `/${newBoards[0].id}` : "/");
        toggleModal(null);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setResponse({ ...response, loading: false });
      });
  };

  const dropTask = async (
    initTask: Task,
    destinationTask: Task | null,
    bottom: { statusId: string } | null
  ) => {
    if (
      (destinationTask && initTask.id === destinationTask.id) ||
      !currentBoard
    )
      return;

    if (destinationTask && initTask.statusId === destinationTask.statusId) {
      setCurrentBoard({
        ...currentBoard,
        Status: currentBoard.Status.map((val) =>
          val.id === initTask.statusId
            ? {
                ...val,
                Task: val.Task.map((_val) =>
                  _val.id === initTask.id
                    ? { ..._val, rank: destinationTask.rank }
                    : _val.id === destinationTask.id
                    ? { ..._val, rank: initTask.rank }
                    : _val
                ),
              }
            : val
        ),
      });
    } else if (
      destinationTask &&
      initTask.statusId !== destinationTask.statusId
    ) {
      setCurrentBoard({
        ...currentBoard,
        Status: currentBoard.Status.map((val) =>
          val.id === destinationTask.statusId
            ? {
                ...val,
                Task: [
                  ...val.Task.map((_val) =>
                    _val.rank >= destinationTask.rank
                      ? { ..._val, rank: _val.rank + 1 }
                      : _val
                  ),
                  { ...initTask, rank: destinationTask.rank, statusId: val.id },
                ],
              }
            : val.id === initTask.statusId
            ? {
                ...val,
                Task: val.Task.filter((_val) => _val.id !== initTask.id),
              }
            : val
        ),
      });
    } else if (bottom) {
      if (initTask.statusId === bottom.statusId) {
        setCurrentBoard({
          ...currentBoard,
          Status: currentBoard.Status.map((val) =>
            val.id === initTask.statusId
              ? {
                  ...val,
                  Task: val.Task.map((_val) =>
                    _val.id === initTask.id
                      ? {
                          ..._val,
                          rank: val.Task[val.Task.length - 1]
                            ? val.Task[val.Task.length - 1].rank
                            : 1,
                        }
                      : _val.rank > initTask.rank
                      ? { ..._val, rank: _val.rank - 1 }
                      : _val
                  ),
                }
              : val
          ),
        });
      } else {
        setCurrentBoard({
          ...currentBoard,
          Status: currentBoard.Status.map((val) =>
            val.id === bottom.statusId
              ? {
                  ...val,
                  Task: [
                    ...val.Task,
                    {
                      ...initTask,
                      rank: val.Task[val.Task.length - 1]
                        ? val.Task[val.Task.length - 1].rank + 1
                        : 1,
                      statusId: val.id,
                    },
                  ],
                }
              : val.id === initTask.statusId
              ? {
                  ...val,
                  Task: val.Task.filter((_val) => _val.id !== initTask.id),
                }
              : val
          ),
        });
      }
    }

    await fetch(`/api/tasks/dropTask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          initTaskId: initTask.id,
          destinationTaskId: destinationTask?.id,
          bottomStatusId: bottom?.statusId,
        },
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw Error(text);
        }

        await res.json().then((response) => {});
      })
      .catch((err) => {});
  };

  return (
    <UserContext.Provider
      value={{
        boards,
        response,
        currentBoard,
        initializeData,
        addBoard,
        getBoardList,
        changeCurrentBoard,
        changeBoardName,
        changeStatus,
        addTask,
        editTask,
        toggleSubtask,
        deleteTask,
        deleteBoard,
        dropTask,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
