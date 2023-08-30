const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Handling Syncrouns errors
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION, The server is going to shut down!!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.ATLAS_DATABASE.replace(
  '<PASSWORD>',
  process.env.PASSWORD_DB,
);

const LocalDB = process.env.LOCAL_DB;

mongoose.connect(DB, { useUnifiedTopology: true }).then(() => {
  console.log('DB connection successful');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running at port ${port}...`);
});

//Handling Asyncrouns errors
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION, The server is going to shut down!!');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recieved, shutting down gracefully');
  server.close(() => console.log('Process Terminated'));
});
