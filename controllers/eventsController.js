const Events = require("../models/Events");
const ErrorResponse = require('../utils/errorResponse')

// identifies the users by the user id
exports.getEventsOfUser = async (req, res, next) => {
  const { id } = req.params;
  const userEvents = await Events.find({ uid: id })
  try {
    if (userEvents.length === 0) {
      return next(new ErrorResponse("User doesn't have events", 404));
    }
    return res.status(200).json(userEvents);
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
};
exports.createEventOfUser = async (req, res, next) => {
  const eventToCreate = await Events.create({
    title: req.body.title,
    start: req.body.start,
    color: req.body.color,
    url: req.body.url,
    uid: req.params.id,
  });
  try {
    return res.status(201).json(eventToCreate);
  } catch (error) {
    return next(new ErrorResponse("Unauthorized route", 401));
  }
};

exports.updateEventsOfUser = async (req, res, next) => {
  const eventToUpdate = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true}) 
  try{
    return res.status(202).json(eventToUpdate)
  }catch(error){
    return next(new ErrorResponse("Unauthorized route", 401));
  }
};
exports.deleteEventOfUser = async (req, res) => {
  const { id } = req.params;
  await Events.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Succesfully Deleted" });
  } catch (error) {
    return next(new ErrorResponse("Couldn't delete event", 401));
  }
};
