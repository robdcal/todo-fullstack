import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch("https://rc-pern-todo.herokuapp.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h1" align="center">
          PERN Todo List
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={onSubmitForm}
        sx={{
          mt: 4,
          display: "flex",
          width: 500,
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        <TextField
          label="Add new todo"
          variant="outlined"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button variant="contained" type="submit">
                Add
              </Button>
            ),
          }}
        />
      </Box>
    </Fragment>
  );
};

export default InputTodo;
