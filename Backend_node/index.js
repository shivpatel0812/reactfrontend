const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const uri = "mongastring";
const client = new MongoClient(uri);

let db;

// Helper to connect to the database
async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("CAPUVA");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }
  return db;
}

// Route: Get latest capacities
app.get("/api/latest-capacities", async (req, res) => {
  try {
    // Ensure database connection
    const database = await connectToDatabase();

    // Fetch data from each collection
    const ricehallCollection = database.collection("ricehall");
    const clemonsCollection = database.collection("clemonslibrary");
    const shannonCollection = database.collection("shannon");

    const [ricehallData] = await ricehallCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    const [clemonsData] = await clemonsCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    const [shannonData] = await shannonCollection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    // Construct response
    const result = {
      ricehall: ricehallData || null,
      clemonslibrary: clemonsData || null,
      shannon: shannonData || null,
    };

    // Send the response
    res.json({
      message: "Latest capacities fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching capacities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
  process.exit(0);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
