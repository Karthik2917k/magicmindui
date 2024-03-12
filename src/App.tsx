import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Todo from "./components/Todo";
import UserPrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/todo" element={<UserPrivateRoute child={<Todo />} />} />
    </Routes>
  );
}

export default App;
