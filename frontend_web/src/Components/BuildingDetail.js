import React from "react";
import { useParams } from "react-router-dom";
import ClemonsData from "../Components/ClemonsData";
import ShannonData from "../Components/ShannonData";
import AFCData from "./afcdata"; // Make sure this path is correct

function BuildingDetail() {
  const { name } = useParams(); // Get building name from the URL params

  // Dynamically render the correct library/gym component
  if (name === "Clemons Library") {
    return <ClemonsData />;
  } else if (name === "Shannon Library") {
    return <ShannonData />;
  } else if (name === "AFC") {
    return <AFCData />;
  } else {
    return <h2>Building not found</h2>;
  }
}

export default BuildingDetail;
