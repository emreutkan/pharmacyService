const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pharmacySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Changed to email
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'pharmacy' }, // Default role
});

// Hash the password before saving
pharmacySchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);
