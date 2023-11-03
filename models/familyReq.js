const mongoose = require("mongoose");

const familyReqSchema = new mongoose.Schema({

    from_id: {
        type: String,
        required: true,
    },
    from_name: { type: String, required: true },
    from_email: { type: String, required: true },
    to_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    }

});

const FamilyReq = mongoose.model("FamilyReq", familyReqSchema);

module.exports = FamilyReq;