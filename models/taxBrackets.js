const mongoose = require("mongoose");

const taxBracket = new mongoose.Schema({
  highPoint: { type: Number, required: true },
  lowPoint: { type: Number, required: true },
  percentage: {
    type: String,
    required: true,
  },
  genderRole: {
    type: String,
  },
  Division: {
    type: [String],
  },
  District: {
    type: [String],
  },
  CityCorporation: {
    type: [String],
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  LawReference: {
    type: String,
  },
  Occupation: {
    type: [String],
  },
});

const TaxBrackets = mongoose.model("TaxBrackets", taxBracket);

module.exports = TaxBrackets;
