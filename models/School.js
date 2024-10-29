const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    fa_name: { type: String, required: true },
    en_name: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    storage_bucket: { type: String, required: true },
    mariadb_db_name: { type: String, required: true },
    mariadb_username: { type: String, required: true },
    mariadb_password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("School", schoolSchema);