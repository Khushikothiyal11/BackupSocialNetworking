const Group = require('../models/groupModel');
const HttpError = require('../models/errorModel');


// GET ALL GROUPS
const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find().populate('members', 'fullName profilePhoto');
    res.json(groups);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// GET SINGLE GROUP
const getGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', 'fullName profilePhoto');
    if (!group) return next(new HttpError('Group not found', 404));
    res.json(group);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// CREATE GROUP
const createGroup = async (req, res, next) => {
    try {
    const { name, description,members,createdBy } = req.body;
    const group = new Group({ name, description, members: members, createdBy: createdBy });
    await group.save();
    res.json(group);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// JOIN GROUP
const joinGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return next(new HttpError('Group not found', 404));
    if (!group.members.includes(req.user._id)) {
      group.members.push(req.user._id);
      await group.save();
    }
    res.json(group);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = { getGroups, getGroup, createGroup, joinGroup };