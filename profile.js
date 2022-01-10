// Require HTTPS module
const https = require("https");
// Require HTTP module ( for http.STATUS_CODES[] )
const http = require("http");

/**
 * printError()
 *
 * The printError() function takes in an error and error message and logs them to the console.
 * @param {string} error
 * @param {string} message
 */
function printError(error, message) {
  console.log(message, error.message);
}
/**
 * get()
 *
 * The get() function takes an array of usernames and makes an api request for each username passing the data to the printMessageFunction() to print out data retrieved
 * @param {string[]} usernames
 */
function get(usernames) {
  // Loops through each username
  for (let user of usernames) {
    try {
      // Get requests from api
      const request = https.get(
        `https://teamtreehouse.com/${user}.json`,
        (res) => {
          if (res.statusCode === 200) {
            let body = "";
            res.on("data", (data) => {
              // converting the response "buffer" to a string
              body += data.toString();
            });

            // When the response is finished being retrieved
            // Responses are sent in parts and node does not wait until recieving the whole response before running other code
            res.on("end", () => {
              try {
                // Parsing the response "buffer" string to a json object
                const profile = JSON.parse(body);
                // console.dir(profile);
                printMessage(
                  profile.name,
                  profile.badges.length,
                  profile.points.JavaScript
                );
              } catch (error) {
                printError(error, "Error parsing JSON data.");
              }
            });

            request.on("error", (error) => {
              printError(error, "request.on(error)");
            });
          } else {
            const message = `There was an error getting the username ${user}`;
            const statusCodeError = new Error(message);
            printError(statusCodeError, http.STATUS_CODES[res.statusCode]);
          } // end statusCode 200{}
        } // end .get callback()
      ); // end .get
    } catch (error) {
      console.error(error, ".get error caught");
    }
  } // end for loop
} // end get()

/**
 * printMessage()
 *
 * The printMessage() function takes three arguements and prints them to the console
 * @param {string} username
 * @param {number} badgeCount
 * @param {number} points
 */
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} total number of points in JavaScript.`;

  console.log(message);
}

// Exports the get function
module.exports.get = get;
