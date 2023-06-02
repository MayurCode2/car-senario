import React, { useEffect, useRef } from "react";

const Simulation = () => {
  const canvasRef = useRef(null);
  const scenario = {
    id: 1,
    name: "Scenario 1",
    time: 60,
    vehicles: [
      {
        id: 1,
        name: "Vehicle 1",
        initialPositionX: 100,
        initialPositionY: 100,
        speed: 10,
        direction: "Towards",
      },
      {
        id: 2,
        name: "Vehicle 2",
        initialPositionX: 200,
        initialPositionY: 100,
        speed: 5,
        direction: "Backwards",
      },
      {
        id: 3,
        name: "Vehicle 3",
        initialPositionX: 150,
        initialPositionY: 200,
        speed: 15,
        direction: "Upwards",
      },
      {
        id: 4,
        name: "Vehicle 4",
        initialPositionX: 250,
        initialPositionY: 200,
        speed: 10,
        direction: "Downwards",
      },
    ],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const drawVehicle = (x, y) => {
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 20, 20);
    };

    const updateVehiclePositions = (animationStartTime) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "black";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const elapsedTime = (currentTime - animationStartTime) / 1000;

      scenario.vehicles.forEach((vehicle) => {
        const { speed, direction, initialPositionX, initialPositionY } = vehicle;
        let newPositionX = initialPositionX;
        let newPositionY = initialPositionY;

        if (direction === "Towards") {
          newPositionX += speed * elapsedTime;
        } else if (direction === "Backwards") {
          newPositionX -= speed * elapsedTime;
        } else if (direction === "Upwards") {
          newPositionY -= speed * elapsedTime;
        } else if (direction === "Downwards") {
          newPositionY += speed * elapsedTime;
        }

        drawVehicle(newPositionX, newPositionY);
      });

      if (elapsedTime < 10) {
        animationFrameId = requestAnimationFrame(() =>
          updateVehiclePositions(animationStartTime)
        );
      }
    };

    const animationStartTime = Date.now();
    updateVehiclePositions(animationStartTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div>
      <h2>{scenario.name} Simulation</h2>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  );
};

export default Simulation;
