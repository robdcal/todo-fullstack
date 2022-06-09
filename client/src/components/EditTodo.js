import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (event) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#modal-id-${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`modal-id-${todo.todo_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div class="modal-header">
              <h5 className="modal-title">Edit Todo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => updateDescription(event)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
