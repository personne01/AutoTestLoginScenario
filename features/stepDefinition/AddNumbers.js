const axios = require('axios');
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

const baseUrl = "https://gorest.co.in/rest-console"; // Replace with your actual API URL
let bearerToken;
let response;

Given('I have a valid bearer token', async function () {
  bearerToken = 'Bearer 8b14dca510f778041dae300f3c27b836edf60fb2eb214ab4a7e66f80da3a95aa'; // Replace with the actual token
});

When('I send a POST request to {string} with valid user data', async function (endpoint) {
  const userData = {
    name: 'Maheswar Ansan',
    gender: 'male',
    email: 'maheswar_ansan@hackett-schneider.test',
    status: 'inactive',
    // ...
  };

  const config = {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    },
  };

  try {
    response = await axios.post(`${baseUrl}${endpoint}`, userData, config);
  } catch (error) {
    response = error.response;
  }
});

Then('the response status code should be {int}', function (statusCode) {
});
assert.ifError(this.error);

Then('the response should contain the user details', function () {
  this.error = response ? response.data : error.message;
});
