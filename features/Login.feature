Feature: Create a new user

Scenario: Create a new user
  Given I have a valid bearer token
  When I send a POST request to "/public-api/users" with valid user data
  Then the response status code should be 201
  And the response should contain the user details
