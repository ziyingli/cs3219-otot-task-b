const app = require("./index"); 
const supertest = require("supertest");
const request = supertest(app);

const Address = require("./addressModel"); // Link to your address model
const mongoose = require("mongoose");
const databaseName = "test";

//////////////////////
///    SET UP      ///
//////////////////////
beforeAll(async done => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  done();
});

const dummyAddresses = [
  {
    postal_code: "111",
    block: "1",
    street: "jurong",
    unit: "#01-01"
  }
]

beforeEach(async done => {
  for (const a of dummyAddresses) {
    const address = new Address(a);
    await address.save();
  }
  done();
});

//////////////////////
///     TESTS      ///
//////////////////////
describe("GET request", () => {
  it("Should get the default endpoint", async done => {
    // Sends GET Request to / endpoint
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello World with Express");
    done();
  });
  
  it("Should get the API endpoint", async done => {
    // Sends GET Request to /api endpoint
    const response = await request.get("/api");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Welcome to AddressHub crafted with love!");
    done();
  });
  
  it("Should get all addresses", async done => {
    // Sends GET Request to /api/addresses endpoint
    const response = await request.get("/api/addresses");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Addresses retrieved successfully");
    done();
  });

  it("Should get address by Id", async done => {
    // find the dummy address
    const address = await Address.findOne({ 
      postal_code: "111",
      block: "1",
      street: "jurong",
      unit: "#01-01"
    });

    const addressId = address._id;

    const res = await request.get(`/api/addresses/${addressId}`);
    const found = await Address.findOne({
      postal_code: "111"
    });

    expect(found).toStrictEqual(address);
    expect(res.body.message).toBe("Address details loading..");
    done();
  });
});

describe("POST request", () => {
  it("Should save address to database", async done => {
    const res = await request.post("/api/addresses/").send({
      postal_code: "222",
      block: "22",
      street: "jurong",
      unit: "#02-02"
    });
  
    // Searches the address in the database
    const address = await Address.findOne({ 
      postal_code: "222",
      block: "22",
      street: "jurong",
      unit: "#02-02"
    });
    expect(address.postal_code).toBeTruthy();
    expect(address.block).toBeTruthy();
    expect(address.street).toBeTruthy();
    expect(address.unit).toBeTruthy();
    expect(res.body.message).toBe("New address created!");

    done();
  });

  it("Should throw error when required fields are missing", async done => {
    const res = await request.post("/api/addresses/").send({
      postal_code: "222",
      block: "22",
      unit: "#02-02"
    });
    expect(res.status).toBe(500);
    expect(res.text).toBe("Required fields cannot be blank");
    done();
  });

  it("Should throw error when fields are of wrong type", async done => {
    const res = await request.post("/api/addresses/").send({
      postal_code: "222a",
      block: "22",
      street: "jurong",
      unit: "#02-02"
    });
    expect(res.status).toBe(500);
    expect(res.text).toBe("Postal code must be a number");
    done();
  });
});

describe("PUT request", () => {
  it("Should edit the address in database", async done => {
    // find the dummy address
    const address = await Address.findOne({ 
      postal_code: "111",
      block: "1",
      street: "jurong",
      unit: "#01-01"
    });

    const addressId = address._id;

    const res = await request.put(`/api/addresses/${addressId}`).send({
      postal_code: "456",
      block: "45",
      street: "pasir ris"
    });
  
    // Searches the address in the database
    const edited = await Address.findOne({ 
      postal_code: "456",
      block: "45",
      street: "pasir ris"
    });

    expect(edited.postal_code).toBeTruthy();
    expect(edited.block).toBeTruthy();
    expect(edited.street).toBeTruthy();
    expect(res.body.message).toBe("Address Info updated");
    done();
  });

  it("Should throw error when required fields are missing", async done => {
    // find the dummy address
    const address = await Address.findOne({ 
      postal_code: "111",
      block: "1",
      street: "jurong",
      unit: "#01-01"
    });

    const addressId = address._id;

    const res = await request.put(`/api/addresses/${addressId}`).send({
      postal_code: "222",
      block: "22",
      unit: "#02-02"
    });
    expect(res.status).toBe(500);
    expect(res.text).toBe("Required fields cannot be blank");
    done();
  });

  it("Should throw error when fields are of wrong type", async done => {
    // find the dummy address
    const address = await Address.findOne({ 
      postal_code: "111",
      block: "1",
      street: "jurong",
      unit: "#01-01"
    });

    const addressId = address._id;

    const res = await request.put(`/api/addresses/${addressId}`).send({
      postal_code: "222a",
      block: "22",
      street: "jurong",
      unit: "#02-02"
    });
    expect(res.status).toBe(500);
    expect(res.text).toBe("Postal code must be a number");
    done();
  });
});

describe("DELETE request", () => {
  it("Should delete the address in database", async done => {
    // find the dummy address
    const address = await Address.findOne({ 
      postal_code: "111",
      block: "1",
      street: "jurong",
      unit: "#01-01"
    });

    const addressId = address._id;

    const res = await request.delete(`/api/addresses/${addressId}`);
    const deleted = await Address.findOne({
      postal_code: "111"
    });
    expect(deleted).toBeNull();
    expect(res.body.message).toBe("Address deleted");

    done();
  });
});


//////////////////////
///   TEAR DOWN    ///
//////////////////////
async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

afterEach(async done => {
  await removeAllCollections();
  done();
});

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.deleteMany({});
    } catch (error) {
      // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
      // Safe to ignore.
      if (error.message === "ns not found") return;

      // This error happens when you use it.todo.
      // Safe to ignore.
      if (error.message.includes("a background operation is currently running"))
        return;

      console.log(error.message);
    }
  }
}

// Disconnect Mongoose
afterAll(async done => {
  await dropAllCollections();
  // Closes the Mongoose connection
  await mongoose.connection.close();
  done();
});