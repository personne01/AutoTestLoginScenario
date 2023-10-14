const { Given, When, Then } = require('cucumber');
const axios = require('axios');

// rest of your code...

const assert = require('assert');

let apiKey;
let userId;

Given('I have valid credentials', function () {
  // Replace 'YOUR_API_KEY' with the actual API key
  apiKey = '5cb22dce7db4a635c33734ec16f62c5ca49d2a52c3dece07598fad1c8a97ce3d';
});

When('I create a new user', async function () {
  const userData = {
    name: 'John Doe',
    gender: 'male',
    email: 'johndoe@example.com',
    status: 'active',
  };

  try {
    const response = await axios.post('https://gorest.co.in/rest-console', userData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    assert.strictEqual(response.status, 201);
    userId = response.data.data.id;
  } catch (error) {
    this.error = error.response ? error.response.data : error.message;
  }
});

Then('the user is created successfully', function () {
  assert.ifError(this.error);
  assert.ok(userId);
});

When('I get details for user with ID {string}', async function (userId) {
  try {
    const response = await axios.get(`https://gorest.co.in/rest-console${userId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    assert.strictEqual(response.status, 200);
  } catch (error) {
    this.error = error.response ? error.response.data : error.message;
  }
});

Then('the user details are retrieved successfully', function () {
  assert.ifError(this.error);
});

When('I update details for user with ID {string}', async function (userId) {
  const updatedUserData = {
    name: 'Updated Name',
  };

  try {
    const response = await axios.put(`https://gorest.co.in/rest-console${userId}`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    assert.strictEqual(response.status, 200);
  } catch (error) {
    this.error = error.response ? error.response.data : error.message;
  }
});

Then('the user details are updated successfully', function () {
  assert.ifError(this.error);
});

When('I delete user with ID {string}', async function (userId) {
  try {
    const response = await axios.delete(`https://gorest.co.in/rest-console${userId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    assert.strictEqual(response.status, 204);
  } catch (error) {
    this.error = error.response ? error.response.data : error.message;
  }
});

Then('the user is deleted successfully', function () {
  assert.ifError(this.error);
});
