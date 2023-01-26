type ValidateBoardErrors =
  | {
      name?: string;
      message: string;
      id?: string;
    }[]
  | [];

type ValidateTaskErrors =
  | {
      name: string;
      message: string;
      id?: string;
    }[]
  | [];

type ValidateAuthErrors = {
  name: string;
  message: string;
}[];
