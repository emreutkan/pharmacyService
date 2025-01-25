const Pharmacy = require('../models/pharmacyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const pharmacyRegisterHandler = async (req, res) => {
    const { username, password, name } = req.body;

    try {
        const existingPharmacy = await Pharmacy.findOne({ username });
        if (existingPharmacy) {
            return res.status(400).json({ message: 'Pharmacy already exists' });
        }

        const pharmacy = new Pharmacy({ username, password, name });
        await pharmacy.save();

        res.status(201).json({ message: 'Pharmacy registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering pharmacy', error });
    }
};

const pharmacyLoginHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pharmacy = await Pharmacy.findOne({ username });
        if (!pharmacy) {
            return res.status(404).json({ message: 'Pharmacy not found' });
        }

        const isMatch = await bcrypt.compare(password, pharmacy.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { pharmacyId: pharmacy._id, role: 'pharmacy' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { pharmacyLoginHandler, pharmacyRegisterHandler };
