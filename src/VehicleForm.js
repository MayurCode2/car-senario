import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const VehicleForm = () => {
  const [scenarios, setScenarios] = useState([]);
  const [scenarioId, setScenarioId] = useState("");
  const [name, setName] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/scenarios");
        setScenarios(response.data);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      }
    };

    fetchScenarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/vehicles", {
        scenarioId,
        name,
        positionX,
        positionY,
        speed,
        direction,
      });
      history.push("/");
    } catch (error) {
      console.error("Error creating vehicle:", error);
    }
  };

  return (
    <div>
      <h2>Create New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Scenario:</label>
          <select
            value={scenarioId}
            onChange={(e) => setScenarioId(e.target.value)}
          >
            <option value="">Select Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Position X:</label>
          <input
            type="text"
            value={positionX}
            onChange={(e) => setPositionX(e.target.value)}
          />
        </div>
        <div>
          <label>Position Y:</label>
          <input
            type="text"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="text"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div>
          <label>Direction:</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="">Select Direction</option>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default VehicleForm;
