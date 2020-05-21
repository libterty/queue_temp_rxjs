const mongoose = require('mongoose');
const databaseUrl = 'mongodb://127.0.0.1/test_queue';

const nosqlConnect = () => {
  return mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('DB connecting'))
    .catch(err => console.log(err.message));
};

module.exports = nosqlConnect;