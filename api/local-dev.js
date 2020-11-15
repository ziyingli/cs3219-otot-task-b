const app = require("./index"); 

// Setup server port
var port = process.env.PORT || 8080;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running AddressHub on port " + port);
});