import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type userTypes = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<userTypes>({
    email: "",
    password: "",
    name: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user/signup`;
      await axios.post(url, userData);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-[90vh] flex flex-col justify-center items-center">
        <form
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
          className="p-10 rounded"
          onSubmit={handleRegister}
        >
          <p className="font-semibold text-2xl text-slate-700 my-5">Register</p>
          <div>
            <label className="font-medium text-lg text-slate-600">Name</label>
            <br />
            <input
              name="name"
              type="text"
              required
              value={userData.name}
              onChange={handleChange}
              className="focus:outline-none border p-1 w-80 h-12 rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-slate-600">Email</label>
            <br />
            <input
              name="email"
              type="email"
              required
              value={userData.email}
              onChange={handleChange}
              className="focus:outline-none border p-1 w-80 h-12 rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-lg text-slate-600">
              Password
            </label>
            <br />
            <input
              name="password"
              type="text"
              value={userData.password}
              onChange={handleChange}
              className="focus:outline-none border p-1 w-80 h-12 rounded-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="border my-5 w-80 py-2 h-12 bg-[#0054a6] font-semibold text-white text-lg rounded"
            >
              Submit
            </button>
          </div>
          <p className="text-sm text-slate-600">
            If you already registered, Please click here to{" "}
            <Link to="/">
              <span className="text-sky-700">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
