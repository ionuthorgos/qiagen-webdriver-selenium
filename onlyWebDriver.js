const { Builder, By, Key, until } = require("selenium-webdriver")

async function loginPage() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Set a global implicit wait on the driver
        await driver.manage().setTimeouts({ implicit: 5000 })

        await driver.get("https://the-internet.herokuapp.com/login");
        // Set an invalid user name
        await driver.findElement(By.css("[name='username']")).sendKeys("invalid user name");
        // Set an invalid password
        await driver.findElement(By.css("[name='password']")).sendKeys("invalid password");
        // Set valid user name
        await driver.findElement(By.css("[name='username']")).sendKeys("invalid user name");
        // Set valid password
        await driver.findElement(By.css("[name='password']")).sendKeys("invalid password");

        // ...
    } finally {
        // It's a good practice to quit the driver after execution
        await driver.quit();
    }
}

loginPage();