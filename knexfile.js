// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite' // Change this to the path where you want to store the SQLite database
    },
    useNullAsDefault: true // Required for SQLite
  }
};
