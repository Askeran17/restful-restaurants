const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const ALL_RESTAURANTS = require("./restaurants").restaurants;
const DATA_FILE = path.join(__dirname, "../starredRestaurants.json");

function loadStarredRestaurants() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    return [];
  }
}

function saveStarredRestaurants(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/**
 * A list of starred restaurants.
 * In a "real" application, this data would be maintained in a database.
 */
let STARRED_RESTAURANTS = loadStarredRestaurants();

/**
 * Feature 6: Getting the list of all starred restaurants.
 */
router.get("/", (req, res) => {
  /**
   * We need to join our starred data with the all restaurants data to get the names.
   * Normally this join would happen in the database.
   */
  const joinedStarredRestaurants = STARRED_RESTAURANTS.map(
    (starredRestaurant) => {
      const restaurant = ALL_RESTAURANTS.find(
        (restaurant) => restaurant.id === starredRestaurant.restaurantId
      );
      return {
        id: starredRestaurant.id,
        comment: starredRestaurant.comment,
        name: restaurant ? restaurant.name : null,
      };
    }
  );

  res.json(joinedStarredRestaurants);
});

/**
 * Feature 7: Getting a specific starred restaurant.
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Find starred restaurant by id
  const starredRestaurant = STARRED_RESTAURANTS.find((item) => item.id === id);
  if (!starredRestaurant) {
    return res.sendStatus(404);
  }
  // Find restaurant by restaurantId
  const restaurant = ALL_RESTAURANTS.find((r) => r.id === starredRestaurant.restaurantId);
  if (!restaurant) {
    return res.sendStatus(404);
  }
  // Return object with id, comment and name
  res.json({
    id: starredRestaurant.id,
    comment: starredRestaurant.comment,
    name: restaurant.name,
  });
});

/**
 * Feature 8: Adding to your list of starred restaurants.
 */
router.post("/", (req, res) => {
  console.log(req.body)
  const { restaurantId, comment } = req.body;
  // Check if restaurant exists with given restaurantId
  const restaurant = ALL_RESTAURANTS.find((r) => r.id === restaurantId);
  if (!restaurant) {
    return res.sendStatus(404);
  }
  // Create new starred restaurant entry
  const newStarred = {
    id: uuidv4(),
    restaurantId,
    comment: comment || "",
  };
  STARRED_RESTAURANTS.push(newStarred);
  saveStarredRestaurants(STARRED_RESTAURANTS);
  // Return added restaurant with name
  res.status(201).json({
    id: newStarred.id,
    comment: newStarred.comment,
    name: restaurant.name,
  });
});

/**
 * Feature 9: Deleting from your list of starred restaurants.
 */

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Check if starred restaurant exists
  const exists = STARRED_RESTAURANTS.some((item) => item.id === id);
  if (!exists) {
    return res.sendStatus(404);
  }
  // Remove restaurant from list
  STARRED_RESTAURANTS = STARRED_RESTAURANTS.filter((item) => item.id !== id);
  saveStarredRestaurants(STARRED_RESTAURANTS);
  res.sendStatus(204);
});


/**
 * Feature 10: Updating your comment of a starred restaurant.
 */

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  // Find starred restaurant by id
  const starredRestaurant = STARRED_RESTAURANTS.find((item) => item.id === id);
  if (!starredRestaurant) {
    return res.sendStatus(404);
  }
  // Update comment
  starredRestaurant.comment = comment || '';
  saveStarredRestaurants(STARRED_RESTAURANTS);
  res.sendStatus(200);
});



module.exports = router;