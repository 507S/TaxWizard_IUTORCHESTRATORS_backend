const mongoose = require("mongoose");

const taxBrochureSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  inputAmount: {
    type: Number,
    required: true,
  },
  taxAmounts: {
    type: [Number],
    required: true,
  },
  taxPercentages: {
    type: [Number],
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const TaxBrochure = mongoose.model("TaxBrochure", taxBrochureSchema);

module.exports = TaxBrochure;
