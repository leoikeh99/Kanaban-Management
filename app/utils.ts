export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateBoard = (data: {
  name: string | undefined;
  status: { name: string; id: string }[] | [];
}) => {
  const { name, status } = data;
  let errors: ValidateBoardErrors = [];

  if (!name || name.trim() === "")
    errors = [{ name: "name", message: "Can't be empty" }];

  status.forEach((val) => {
    if (val.name.trim() === "")
      errors = [
        ...errors,
        { name: "status", message: "Can't be empty", id: val.id },
      ];
  });

  return errors;
};

export const validateTask = (data: {
  title: string;
  description: string;
  subtasks: { name: string; id: string }[] | [];
}) => {
  const { title, description, subtasks } = data;
  let errors: ValidateTaskErrors = [];

  if (title.trim() === "")
    errors = [{ name: "title", message: "Can't be empty" }];

  subtasks.forEach((val) => {
    if (val.name.trim() === "")
      errors = [
        ...errors,
        { name: "subtasks", message: "Can't be empty", id: val.id },
      ];
  });

  return errors;
};

export const validateRegister = (data: {
  username: string;
  email: string;
  password: string;
  password2: string;
}) => {
  const { username, email, password, password2 } = data;
  let errors: ValidateAuthErrors = [];

  if (!validateEmail(email))
    errors = [{ name: "email", message: "Invalid email" }];
  if (username.trim() === "")
    errors = [...errors, { name: "username", message: "Can't be empty" }];
  if (username.trim().split("").length < 2)
    errors = [...errors, { name: "username", message: "At least 2 letters" }];
  if (password.trim() === "")
    errors = [...errors, { name: "password", message: "Can't be empty" }];
  if (password.trim().split("").length < 6)
    errors = [
      ...errors,
      { name: "password", message: "At least 6 characters" },
    ];
  if (password !== password2)
    errors = [...errors, { name: "password2", message: "Incorrect password" }];

  return errors;
};
