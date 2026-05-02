const { CPFHub } = require('cpfhub');
require('dotenv').config();

const client = new CPFHub(process.env.CPFHUB_API_KEY);

async function main() {
  try {
    const result = await client.lookup('12345678900');
    console.log('Name:', result.name);
    console.log('Gender:', result.gender);
    console.log('Birth Date:', result.birthDate);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
