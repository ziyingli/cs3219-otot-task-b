const app = require("./index"); 
const supertest = require("supertest");
const request = supertest(app);
const apiRoutes = require("./api-routes");

const Address = require("./addressModel"); // Link to your address model
const mongoose = require("mongoose");
const databaseName = "test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.createConnection(url, { useNewUrlParser: true });
});

it("Gets the default endpoint", async done => {
  // Sends GET Request to / endpoint
  const response = await request.get("/");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Hello World with Express");
  done();
});

it("Gets the API endpoint", async done => {
  // Sends GET Request to /api endpoint
  const response = await request.get("/api");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Welcome to AddressHub crafted with love!");
  done();
});

it("Gets all addresses", async done => {
  // Sends GET Request to /api/addresses endpoint
  const response = await request.get("/api/addresses");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Addresses retrieved successfully");
  done();
});

// it("Should save address to database", done => {
//   const res = request.post("/api/addresses/").send({
//     postal_code:"120",
//     block:"42",
//     street:"jurong",
//     unit:"#03-03"
//   });

  // Searches the address in the database
//   const address = Address.findOne({ 
//     postal_code:"120",
//     block:"42",
//     street:"jurong",
//     unit:"#03-03"
//   });
//   // expect(address.postal_code).toBeTruthy();
//   // expect(address.block).toBeTruthy();

//   console.log(address);

//   done();
// });

// async function removeAllCollections() {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName];
//     await collection.deleteMany();
//   }
// }

// afterEach(async () => {
//   await removeAllCollections();
// });