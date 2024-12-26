import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LocationBox.css";

function LocationBox({ name, image, capacity, totalCapacity }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/building/${name}`);
  };

  const capacityPercentage = Math.min(
    Math.round((capacity / totalCapacity) * 100),
    100
  );

  return (
    <div className="location-box" onClick={handleClick}>
      {/* Image Section */}
      <div className="location-image">
        <img src={image} alt={name} />
      </div>

      {/* Info Section */}
      <div className="location-info">
        <h2>{name}</h2>
        <div className="capacity-details">
          {capacity}/{totalCapacity} ({capacityPercentage}%)
        </div>
        <div className="capacity-bar">
          <div
            className="capacity-bar-fill"
            style={{ width: `${capacityPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LocationBox;
