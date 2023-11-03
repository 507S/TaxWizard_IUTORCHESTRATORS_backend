const mongoose = require("mongoose");

const taxBrochureSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  description: {
    type: String,
  },
  applicableBracketsID: {
    type: [Number],
    required: true,
  },
  applicableTaxPerBrackets: {
    type: [Number],
    required: true,
  },
  totalTax: {
    type: Number,
    required: true,
  },
  cityFee: {
    type: String,
    required: true,
  },
    minimumTax: {
        type: String,
    
    },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const TaxBrochure = mongoose.model("TaxBrochure", taxBrochureSchema);

module.exports = TaxBrochure;
