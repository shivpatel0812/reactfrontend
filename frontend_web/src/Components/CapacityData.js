import React, { useState, useEffect } from "react";
import LocationBox from "./LocationBox";
import "../styles/CapacityData.css";

// Import local images
import ClemonsImage from "../assets/Clemons-location.png";
import ShannonImage from "../assets/2f984490-663c-4515-b7e0-03acbfb328f2.sized-1000x1000.jpg";
import DarshImage from "../assets/Clemons-location.png";
import AFCImage from "../assets/Fitness Facilities.jpg";

function CapacityData() {
  const [capacities, setCapacities] = useState({});

  useEffect(() => {
    const fetchLatestCapacity = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/latest-capacities"
        );

        const data = await response.json();

        const clemonsCapacity =
          data.data.clemonslibrary?.capacity.final_capacity || 0;
        const shannonCapacity = data.data.shannon?.capacity.final_capacity || 0;
        const riceHallCapacity = data.data.ricehall?.current_capacity || 0;

        setCapacities({
          "Clemons Library": {
            current: clemonsCapacity,
            total: 1200,
          },
          "Shannon Library": {
            current: shannonCapacity,
            total: 1200,
          },
          "Rice Hall": {
            current: riceHallCapacity,
            total: 400,
          },
          "AFC Gym": {
            current: 300,
            total: 400,
          },
        });
      } catch (error) {
        console.error("Error fetching the latest capacity:", error);
      }
    };

    fetchLatestCapacity();
  }, []);

  const locations = [
    {
      name: "Clemons Library",
      image: ClemonsImage,
      totalCapacity: 2000,
    },
    {
      name: "Shannon Library",
      image: ShannonImage,
      totalCapacity: 2000,
    },
    {
      name: "Rice Hall",
      image: DarshImage,
      totalCapacity: 400,
    },
    {
      name: "AFC Gym",
      image: AFCImage,
      totalCapacity: 400,
    },
  ];

  return (
    <div className="capacity-data">
      <h1>Capacity at UVA</h1>
      <div className="location-container">
        {locations.map((location, index) => (
          <LocationBox
            key={index}
            name={location.name}
            image={location.image}
            capacity={capacities[location.name]?.current || 0}
            totalCapacity={location.totalCapacity}
          />
        ))}
      </div>
    </div>
  );
}

export default CapacityData;
