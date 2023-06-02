import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ScenarioForm = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/scenarios", {
        name,
        time,
      });
      history.push("/");
    } catch (error) {
      console.error("Error creating scenario:", error);
    }
  };

  return (
    <div>
      <h2>Create New Scenario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ScenarioForm;
