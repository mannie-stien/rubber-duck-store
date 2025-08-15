const dotenv = require('dotenv');
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Loading environment varriables 
dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();