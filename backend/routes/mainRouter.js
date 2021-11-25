const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

// Add user to the phonebook
router.post("/user/add", mainController.addUser);

// Edit the user and phone number
router.put("/user/:userId", mainController.editUser);

// Get all users and their phones
router.get("/user/list", mainController.getUsers);

// Delete the user
router.delete("/user/:userId", mainController.deleteUser);

// Connection status check
router.get("/status", mainController.healthCheck);

module.exports = router;
