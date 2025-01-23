const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurants-data");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  const restaurants = resData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

// :(콜론)을 이용한 동적경로
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const restaurants = resData.getStoredRestaurants();

  for (const restaurant of restaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", {
        rid: restaurantId,
        restaurant: restaurant,
      });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const restaurants = resData.getStoredRestaurants();
  restaurants.push(restaurant);
  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
