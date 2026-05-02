const { CPFHub } = require('cpfhub');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const cpfhub = new CPFHub(process.env.CPFHUB_API_KEY);

app.post('/api/onboarding/verify', async (req, res) => {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ error: 'CPF is required' });
  }

  try {
    // 1. Lookup identity data using CPFHub
    const identityData = await cpfhub.lookup(cpf);

    // 2. Perform business logic (e.g., check age, save to database)
    const isAdult = identityData.year <= new Date().getFullYear() - 18;

    if (!isAdult) {
       return res.status(403).json({ error: 'User must be 18 or older' });
    }

    // 3. Return successful verification
    res.json({
      success: true,
      message: 'Identity verified successfully',
      user: {
        name: identityData.name,
        gender: identityData.gender,
        birthDate: identityData.birthDate
      }
    });

  } catch (error) {
    console.error('Verification failed:', error.message);
    res.status(error.statusCode || 500).json({ error: 'Failed to verify identity' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
