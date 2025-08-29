const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FILE = path.join(__dirname, "../restaurants.json");

function loadRestaurants() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    return [];
  }
}

function saveRestaurants(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let ALL_RESTAURANTS = loadRestaurants();

/**
 * Feature 1: Getting a list of restaurants
 */
router.get("/", (req, res) => {
  res.json(ALL_RESTAURANTS);
});

/**
 * Feature 2: Getting a specific restaurant
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // Find the restaurant with the matching id.
  const restaurant = ALL_RESTAURANTS.find((restaurant) => restaurant.id === id);

  // If the restaurant doesn't exist, let the client know.
  if (!restaurant) {
    res.sendStatus(404);
    return;
  }

  res.json(restaurant);
});

/**
 * Feature 3: Adding a new restaurant
 */
router.post("/", (req, res) => {
  const { body } = req;
  const { name } = body;

  // Generate a unique ID for the new restaurant.
  const newId = uuidv4();
  const newRestaurant = {
    id: newId,
    name,
  };

  // Add the new restaurant to the list of restaurants.
  ALL_RESTAURANTS.push(newRestaurant);
  saveRestaurants(ALL_RESTAURANTS);
  res.json(newRestaurant);
});

/**
 * Feature 4: Deleting a restaurant.
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const newListOfRestaurants = ALL_RESTAURANTS.filter(
    (restaurant) => restaurant.id !== id
  );

  // The user tried to delete a restaurant that doesn't exist.
  if (ALL_RESTAURANTS.length === newListOfRestaurants.length) {
    res.sendStatus(404);
    return;
  }

  ALL_RESTAURANTS = newListOfRestaurants;
  saveRestaurants(ALL_RESTAURANTS);
  res.sendStatus(200);
});

/**
 * Feature 5: Updating the name of a restaurant.
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  const restaurant = ALL_RESTAURANTS.find((restaurant) => restaurant.id === id);

  if (!restaurant) {
    res.sendStatus(404);
    return;
  }

  restaurant.name = newName;
  saveRestaurants(ALL_RESTAURANTS);
  res.sendStatus(200);
});


exports.router = router;
exports.restaurants = ALL_RESTAURANTS;
