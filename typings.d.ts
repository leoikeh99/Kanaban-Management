type AuthDetails = {
  email: string;
  password: string;
};

interface RegDetails extends AuthDetails {
  username: string;
}

type SubTask = {
  id: string;
  name: string;
  completed?: boolean;
  order: number;
  taskId: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  rank: number;
  statusId: string;
  subtask: SubTask[] | [];
};

type Status = {
  id: string;
  name: string;
  boardId: string;
  order: nunmber;
  Task: Task[] | [];
};

type Board = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  Status: Status[] | [];
};
