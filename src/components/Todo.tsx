import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
type todosTypes = {
  _id: string;
  user: string;
  todo: string;
  status: boolean;
};
type editTodoTypes = {
  todo: string;
  id: string;
};
const Todo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<editTodoTypes>({ id: "", todo: "" });
  const [todos, setTodos] = useState([]);
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/todo`;
      await axios.post(url, { todo }, { withCredentials: true });
      setTodo("");
      getTodos();
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdateTodo = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/todo/${editTodo.id}`;
      await axios.patch(
        url,
        { todo: editTodo.todo },
        { withCredentials: true }
      );
      setEditTodo({ id: "", todo: "" });
      getTodos();
      handleClosModal();
    } catch (e) {
      console.log(e);
    }
  };

  const getTodos = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/todo`;
      const res = await axios.get(url);
      setTodos(res.data.todos);
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalOpen = async (id: string, todo: string) => {
    setEditTodo({ id, todo });
    setIsModalOpen(true);
  };

  const handleDelteTodos = async (id: string) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/todo/${id}`;
      await axios.delete(url);
      getTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const handleTodoStauts = async (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/todo/${id}`;
      await axios.patch(
        url,
        { status: e.target.checked },
        { withCredentials: true }
      );

      getTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClosModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user/logout`;
      await axios.get(url);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      <div className="bg-[#0054a6] h-16">
        <div className="w-11/12 m-auto h-16 flex items-center justify-between">
          <p className="font-semibold text-2xl text-white">MagicMind</p>
          <button
            onClick={handleLogout}
            className="bg-white my-5 px-5 py-1  text-[#0054a6] font-semibold text-lg rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <form
          className="w-96 flex gap-2 justify-between"
          onSubmit={handleAddTodo}
        >
          <input
            type="text"
            placeholder="Add Todo..."
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="focus:outline-none border-b-2 w-64"
          />
          <button
            type="submit"
            className="bg-[#0054a6] text-white font-semibold px-5 py-2 rounded-full"
          >
            Add Todo
          </button>
        </form>
        <div className="w-96 my-5">
          {todos.length >= 1 &&
            todos.map((e: todosTypes) => {
              return (
                <div key={e._id} className="flex justify-between border-b my-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      onChange={(event) => handleTodoStauts(event, e._id)}
                    />
                    <p
                      className={`text-lg font-medium text-slate-600 ${
                        e.status && "line-through"
                      }`}
                    >
                      {e.todo}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit
                      className="cursor-pointer w-5 h-5 hover:text-green-600"
                      onClick={() => handleModalOpen(e._id, e.todo)}
                    />
                    <MdDeleteOutline
                      className="cursor-pointer w-5 h-5 hover:text-red-600"
                      onClick={() => handleDelteTodos(e._id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        {isModalOpen && (
          <Modal closable={false} closeModal={handleClosModal}>
            <p className="my-5 text-2xl font-semibold text-slate-600">
              Update Todo
            </p>
            <form
              className="flexgap-2 justify-between"
              onSubmit={handleUpdateTodo}
            >
              <input
                type="text"
                placeholder="Add Todo..."
                required
                value={editTodo.todo}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, todo: e.target.value })
                }
                className="focus:outline-none border-b-2"
              />
              <button
                type="submit"
                className="bg-[#0054a6] text-white font-semibold px-5 py-2 rounded-full"
              >
                Update Todo
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Todo;
