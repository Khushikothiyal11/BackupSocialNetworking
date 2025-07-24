const express = require('express');
const router = express.Router();
const { getGroups, getGroup, createGroup, joinGroup } = require('../controllers/groupController');


// Get all groups
router.get('/', getGroups);

// Get single group by ID
router.get('/:id', getGroup);

// Create group
router.post('/', createGroup);

// Join group
router.post('/:id/join', joinGroup);

module.exports = router;