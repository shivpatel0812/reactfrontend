import React, { useEffect, useState } from "react";
import "../styles/afc.css"; // Styles specific to AFC

const AFCData = () => {
  const [floors, setFloors] = useState([]);

  // Static hours data for AFC (example hours, adjust as needed)
  const data = {
    days: [
      { day: "Mon", hours: "6:00 AM - 10:00 PM" },
      { day: "Tue", hours: "6:00 AM - 10:00 PM" },
      { day: "Wed", hours: "6:00 AM - 10:00 PM" },
      { day: "Thu", hours: "6:00 AM - 10:00 PM" },
      { day: "Fri", hours: "6:00 AM - 9:00 PM" },
      { day: "Sat", hours: "8:00 AM - 9:00 PM" },
      { day: "Sun", hours: "8:00 AM - 9:00 PM" },
    ],
  };

  const currentDay = new Date().toLocaleString("en-US", { weekday: "short" });

  useEffect(() => {
    fetch("http://localhost:3001/api/capacities")
      .then((response) => response.json())
      .then((result) => {
        // Check if AFC data exists
        // Assuming the API returns something like:
        // "afc": {
        //   ...
        //   "capacity": {
        //     "final_capacity": 300,
        //     "floor_results": {
        //        "floor_1_gym": 100,
        //        "floor_2_gym": 120,
        //        "basketball_court": 80
        //     }
        //   }
        // }
        if (
          result &&
          result.data &&
          result.data.afc &&
          result.data.afc.capacity &&
          result.data.afc.capacity.floor_results
        ) {
          const floorResults = result.data.afc.capacity.floor_results;
          const maxCapacityPerFloor = 100; // Adjust as needed per floor

          // You can create a map for images if needed:
          const floorImagePlaceholder = "https://via.placeholder.com/80";

          // Convert floor_results into an array
          // floor_1_gym -> "Floor 1 Gym"
          // floor_2_gym -> "Floor 2 Gym"
          // basketball_court -> "Basketball Court"
          const formattedFloors = Object.entries(floorResults).map(
            ([floorKey, capacity], index) => {
              let floorName = floorKey
                .replace(/_/g, " ") // replace underscores with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word

              // floorKey might be "floor_1_gym" -> after replacements: "Floor 1 Gym"
              return {
                id: index + 1,
                name: floorName,
                image: floorImagePlaceholder,
                capacity: capacity,
                total: maxCapacityPerFloor,
              };
            }
          );

          setFloors(formattedFloors);
        } else {
          console.warn("AFC floor results not found in API response.");
          setFloors([]);
        }
      })
      .catch((error) => console.error("Error fetching capacities:", error));
  }, []);

  return (
    <div className="building-detail-container">
      <h1 className="building-detail-header">AFC Gym</h1>

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
          No floor data available for AFC. Check console logs for details.
        </div>
      )}
    </div>
  );
};

export default AFCData;
