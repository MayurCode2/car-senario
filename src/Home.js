import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [scenarios, setScenarios] = useState([]);

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

  return (
    <div>
      <h2>Scenarios</h2>
      <ul>
        {scenarios.map((scenario) => (
          <li key={scenario.id}>
            <Link to={`/scenarios/${scenario.id}/simulation`}>
              {scenario.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/scenarios/new">Create New Scenario</Link>
    </div>
  );
};

export default Home;
