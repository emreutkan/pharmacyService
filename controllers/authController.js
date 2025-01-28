const Pharmacy = require('../models/pharmacyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const pharmacyRegisterHandler = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingPharmacy = await Pharmacy.findOne({ email });
        if (existingPharmacy) {
            return res.status(400).json({ message: 'Pharmacy already exists' });
        }

        const pharmacy = new Pharmacy({ email, password, name });
        await pharmacy.save();

        res.status(201).json({
            message: 'Pharmacy registered successfully',
            role: pharmacy.role, // Return role
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering pharmacy', error });
    }
};
const pharmacyLoginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pharmacy = await Pharmacy.findOne({ email });
        if (!pharmacy) {
            return res.status(404).json({ message: 'Pharmacy not found' });
        }

        const isMatch = await bcrypt.compare(password, pharmacy.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { pharmacyId: pharmacy._id, role: pharmacy.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            role: pharmacy.role, // Return role
            name: pharmacy.name, // Return name
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


module.exports = { pharmacyLoginHandler, pharmacyRegisterHandler };
