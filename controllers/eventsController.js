const Events = require("../models/Events");


// identifies the users by the user id 
exports.getEventsOfUser = async (req, res) => {
  const { id } = req.params;
  const userEvents = await Events.find({ user: id });
  try {
    if (userEvents.length === 0) {
      return next(new ErrorResponse("User doesn't have events", 404));
    }
    return res.status(200).json(userEvents);
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
};
exports.createEventOfUser = async (req, res) => {
  const eventToCreate = await Events.create({
    title: req.body.title,
    start: req.body.start,
    color: req.body.color,
    url: req.body.url,
    uid: req.params.id
  });
  try {
    return res.status(201).json(eventToCreate);
  } catch (error) {
    return next(new ErrorResponse("Unauthorized route", 401));
  }
};

