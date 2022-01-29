const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");

const EventsSchema = new Schema({
  title: { type: String, required: [true, "Please provide a name"] },
  start: { type: String, required: [true, "Please provide a date"] },
  color: { type: String, required: [true, "Please provide a color"] },
  url: { type: String },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Events", EventsSchema);
