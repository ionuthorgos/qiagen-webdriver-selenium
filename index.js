// Import necessary modules from Selenium WebDriver and Chai for testing
import { Builder, By } from "selenium-webdriver"
import { expect } from 'chai'

// Describe a suite of tests for the Login Page functionality
describe('Login Page Tests', function () {
    // Set a timeout of 5 seconds for each test, as operations may be asynchronous
    this.timeout(5000);
    let driver;

    // Before any tests run, asynchronously initialize the WebDriver
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // After all tests have run, asynchronously quit the WebDriver
    after(async function () {
        await driver.quit();
    });

    // Test case: Attempt to log in with invalid credentials
    it('should display an error for invalid login attempt', async function () {
        // Navigate to the login page
        await driver.get("https://the-internet.herokuapp.com/login");
        // Enter an invalid username
        await driver.findElement(By.css("[name='username']")).sendKeys("invalid user name");
        // Enter an invalid password
        await driver.findElement(By.css("[name='password']")).sendKeys("invalid password");
        // Submit the login form
        await driver.findElement(By.css("[type='submit']")).click();

        // Fetch the error message and assert that it contains the expected text
        let errorMessage = await driver.findElement(By.css("#flash")).getText();
        expect(errorMessage).to.include('Your username is invalid!');
    });

    // Test case: Log in with valid credentials and then log out
    it('should log in and out successfully with valid credentials', async function () {
        // Navigate to the login page
        await driver.get("https://the-internet.herokuapp.com/login");
        // Enter a valid username
        await driver.findElement(By.css("[name='username']")).sendKeys("tomsmith");
        // Enter a valid password
        await driver.findElement(By.css("[name='password']")).sendKeys("SuperSecretPassword!");
        // Submit the login form
        await driver.findElement(By.css("[type='submit']")).click();

        // Fetch the success message and assert that it contains the expected text
        let successfullyLoggedInMessage = await driver.findElement(By.css("#flash")).getText();
        expect(successfullyLoggedInMessage).to.include('You logged into a secure area!');

        // Click the logout button
        await driver.findElement(By.css("[class='button secondary radius']")).click();
        // Fetch the logout message and assert that it contains the expected text
        let loggedOutMessage  = await driver.findElement(By.css("#flash")).getText();
        expect(loggedOutMessage ).to.include('You logged out of the secure area!');

    });

})


/*
1. Open https://the-internet.herokuapp.com/login -done
2. Login using invalid credentials -         
3. Validate unsuccessfull login              
4. Login using the reccomented username and password
5. Validate succesfull login
6. Logout
7. Validate succesfull logout**/