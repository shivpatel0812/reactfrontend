import React, { useEffect, useState } from "react";
import "../styles/clemons.css"; // Styles for Clemons Library

import Clem1 from "../assets/clem1.jpg";
import Clem2 from "../assets/clem2.png";
import Clem3 from "../assets/clem3.jpg";
import Clem4 from "../assets/clem4.png";

const ClemonsData = () => {
  const [floors, setFloors] = useState([]);

  // Static hours data (unchanged)
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
        // Check if clemons data exists
        if (
          result &&
          result.data &&
          result.data.clemonslibrary &&
          result.data.clemonslibrary.capacity &&
          result.data.clemonslibrary.capacity.floor_results
        ) {
          const floorResults =
            result.data.clemonslibrary.capacity.floor_results;

          const maxCapacityPerFloor = 100;
          const floorImageMap = {
            floor_1: Clem1,
            floor_2: Clem2,
            floor_3: Clem3,
            floor_4: Clem4,
          };

          // Convert floor_results object into an array
          const formattedFloors = Object.entries(floorResults).map(
            ([floorKey, capacity], index) => {
              const floorNumber = floorKey.split("_")[1]; // "floor_1" -> "1"
              const floorName = `Floor ${floorNumber}`;
              const floorImage = floorImageMap[floorKey] || Clem1;
              return {
                id: index + 1,
                name: floorName,
                image: floorImage,
                capacity: capacity,
                total: maxCapacityPerFloor,
              };
            }
          );

          setFloors(formattedFloors);
        } else {
          console.warn("Clemons floor results not found in API response.");
          setFloors([]);
        }
      })
      .catch((error) => console.error("Error fetching capacities:", error));
  }, []);

  return (
    <div className="building-detail-container">
      <h1 className="building-detail-header">Clemons Library</h1>

      {/* Library Hours Section */}
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

      {/* Floor Capacity Section */}
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
          No floor data available for Clemons. Check console logs for details.
        </div>
      )}
    </div>
  );
};

export default ClemonsData;
