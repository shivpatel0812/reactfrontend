import React, { useEffect, useState } from "react";
import "../styles/shannon.css"; // Styles for Shannon Library

import Shannon2 from "../assets/shannon2.jpg";
import Shannon4 from "../assets/Shannon4.jpeg";
import Shannon5 from "../assets/Shannon5.jpeg";

const ShannonData = () => {
  const [floors, setFloors] = useState([]);

  const data = {
    days: [
      { day: "Mon", hours: "8:00 AM - 12:00 AM" },
      { day: "Tue", hours: "8:00 AM - 12:00 AM" },
      { day: "Wed", hours: "8:00 AM - 12:00 AM" },
      { day: "Thu", hours: "8:00 AM - 12:00 AM" },
      { day: "Fri", hours: "8:00 AM - 9:00 PM" },
      { day: "Sat", hours: "9:00 AM - 9:00 PM" },
      { day: "Sun", hours: "9:00 AM - 11:00 PM" },
    ],
  };

  const currentDay = new Date().toLocaleString("en-US", { weekday: "short" });

  useEffect(() => {
    fetch("http://localhost:3001/api/latest-capacities")
      .then((response) => response.json())
      .then((result) => {
        if (
          result &&
          result.data &&
          result.data.shannon &&
          result.data.shannon.capacity &&
          result.data.shannon.capacity.floor_results
        ) {
          const floorResults = result.data.shannon.capacity.floor_results;
          const maxCapacityPerFloor = 100;

          const formattedFloors = Object.entries(floorResults).map(
            ([floorKey, capacity], index) => {
              const floorNumber = floorKey.split("_")[1]; // "floor_1" -> "1"
              const floorName = `Floor ${floorNumber}`;
              let image;

              if (floorNumber === "2") {
                image = Shannon2;
              } else if (floorNumber === "4") {
                image = Shannon4;
              } else if (floorNumber === "5") {
                image = Shannon5;
              } else {
                image = "https://via.placeholder.com/80";
              }

              return {
                id: index + 1,
                name: floorName,
                image,
                capacity,
                total: maxCapacityPerFloor,
              };
            }
          );

          setFloors(formattedFloors);
        } else {
          console.warn("Shannon floor results not found in API response.");
          setFloors([]);
        }
      })
      .catch((error) => console.error("Error fetching capacities:", error));
  }, []);

  return (
    <div className="building-detail-container">
      <h1 className="building-detail-header">Shannon Library</h1>
      <div className="library-hours-container">
        <div className="library-hours-header">OPEN HOURS</div>
        <div className="library-hours-week">
          {data.days.map((day) => (
            <div
              key={day.day}
              className={`library-hours-day ${
                day.day === currentDay ? "active" : ""
              }`}
            >
              <span>{day.day}</span>
              <span>{day.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {floors.length > 0 ? (
        <div className="location-container">
          {floors.map((floor) => (
            <div key={floor.id} className="location-box">
              <div className="location-image">
                <img src={floor.image} alt={floor.name} />
              </div>
              <div className="location-info">
                <h2>{floor.name}</h2>
                <div className="capacity-details">
                  {floor.capacity}/{floor.total} (
                  {Math.round((floor.capacity / floor.total) * 100)}%)
                </div>
                <div className="capacity-bar">
                  <div
                    className="capacity-bar-fill"
                    style={{
                      width: `${(floor.capacity / floor.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          No floor data available for Shannon. Check console logs for details.
        </div>
      )}
    </div>
  );
};

export default ShannonData;
