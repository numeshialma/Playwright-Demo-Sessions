import {test,expect,Locator} from "@playwright/test"

test("Verify Playwright Locators", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");

    // getByTitle
    const link:Locator = page.getByTitle("Home page link");
    await expect(link).toHaveText("Home");

    await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");

    // getByTestId
    await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
    await expect(page.getByTestId("profile-name")).toHaveText("John Doe");

})