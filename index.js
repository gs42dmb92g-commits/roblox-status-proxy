const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/game", async (req, res) => {
  const placeId = req.query.placeId;

  if (!placeId) {
    return res.json({ error: "missing placeId" });
  }

  try {
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${placeId}`
    );

    const data = await response.json();
    const game = data.data && data.data[0];

    res.json({
      name: game ? game.name : "Unknown",
      players: game ? game.playing : 0
    });

  } catch (err) {
    res.json({
      name: "Error",
      players: 0
    });
  }
});

app.listen(3000, () => {
  console.log("Roblox proxy API running");
});