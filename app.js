// Require profile module from local file
const profile = require("./profile.js");

// Takes arguments passed in when running node app.js <username> <username#2>...
// The first 2 arguements are NOT arguements we passed in so we removed the first 2
const users = process.argv.slice(2);

profile.get(users);
