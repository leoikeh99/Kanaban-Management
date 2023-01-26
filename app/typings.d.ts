type User =
  | {
      id: string | null;
      boards:
        | {
            id: string;
            name: string;
          }[]
        | [];
    }
  | null
  | undefined;

type BoardPage = {
  board: Board;
};
