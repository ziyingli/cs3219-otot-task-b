![CI testing](https://github.com/ziyingli/cs3219-otot-task-b/workflows/Node.js%20CI/badge.svg)

## Run API locally
Preqrequisites: ensure that MongoDB is installed and running (`brew services start mongodb-community` for macOS)
1. `cd` into `api` folder
2. run `npm run dev`

## Test endpoints on Postman

**LOCAL testing**
http://localhost:8080/

**DEPLOYED endpoint testing**
https://otot-address.vercel.app/

GET all addresses
- Request: GET
- Route: /api/addresses
- Params: None

CREATE new address
- Request: POST
- Route: /api/addresses
- Params: 
```js
{
    "postal_code":"120",    // integer, required
    "block":"42",           // string, required
    "street":"jurong",      // string, required
    "unit":"#03-03"           // string, optional
}
```

GET single address by id
- Request: GET
- Route: /api/addresses/:id
  
UPDATE single address by id
- Request: PUT
- Route: /api/addresses/:id
- Params: 
```js
{
    "postal_code":"120",
    "block":"42",
    "street":"jurong",
    "unit":"#3-3" // optional
}
```

DELETE single address by id
- Request: DELETE
- Route: /api/addresses/:id

## Continuous Deployment
Vercel is the serverless service used for automated deployment. The endpoints will be automatically deployed every time code is pushed to the repository.

## Continuous Integration
GitHub Actions is used for automated testing. The test suite written makes use of Jest and Supertest and will be run automatically every time code is pushed to the repository.

## Running tests locally
1. `npm test`
