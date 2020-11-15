const app = require("./index"); 

// Setup server port
const port = process.env.PORT || 8080;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running AddressBook on port " + port);
});