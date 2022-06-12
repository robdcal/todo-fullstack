import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

export interface ToDo {
  todo_id: string;
  description: string;
  completed: boolean;
}

interface ToDoContainer extends Array<ToDo> {}

const ListTodos = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const completeTodo = async (id: string) => {
    try {
      const body = { completed: true };
      const completeTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setTodos(
        todos.map((todo) => {
          return todo.todo_id === id ? { ...todo, completed: true } : todo;
        })
      );
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {todos
            .sort((a, b) => +a.completed - +b.completed)
            .map((todo) => {
              return (
                <tr key={todo.todo_id}>
                  <td
                    style={
                      todo.completed ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {todo.description}
                  </td>
                  <td>
                    <EditTodo todo={todo} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTodo(todo.todo_id)}
                      disabled={todo.completed}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => completeTodo(todo.todo_id)}
                      disabled={todo.completed}
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
