const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    contactInfo: { type: String },
    jobPreferences: [{ type: String }],
    skills: [{ type: String }],
},{
    timestamps:true
});

const UserProfiles = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfiles;