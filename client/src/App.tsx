import React, { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authApiService from "./utilities/authApiService";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import { Collab } from "./components/Collab/Collab";
import NewCollab from "./components/NewCollab/NewCollab";
import Logout from "./components/Logout/Logout";
import Record from "./components/Record/Record";

interface iGlobalContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  username: string;
}

export const GlobalContext = createContext<iGlobalContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUserId: () => {},
  setUsername: () => {},
  userId: "",
  username: "",
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await authApiService.me();
      if (userInfo !== undefined) {
        setIsAuthenticated(true);
        setUserId(userInfo._id);
        setUsername(userInfo.username);
      } else {
        console.log("Couldn't retrieve user info");
      }
    };
    getProfile();
  }, []);

  const ctx = {
    isAuthenticated,
    setIsAuthenticated,
    setUserId,
    setUsername,
    userId,
    username,
  };

  return (
    <div className="App">
      <Router>
        <GlobalContext.Provider value={ctx}>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/collab/id/:id" element={<Collab />} />
            {isAuthenticated ? (
              <>
                <Route path="/collab/newCollab" element={<NewCollab />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/record/:id" element={<Record />} />
              </>
            ) : (
              <></>
            )}
          </Routes>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
