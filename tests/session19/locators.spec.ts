import {test,expect,Locator} from "@playwright/test"

test("Verify Playwright Locators", async({page})=>{

    await page.goto("https://demo.nopcommerce.com/");

    // getByAltText
    const logo:Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();


    // getByText
    const text:Locator = page.getByText("Welcome to our store");
    await expect(text).toBeVisible();

    await expect(page.getByText("Welcome to our store")).toBeVisible();

    await expect(page.getByText("Welcome to our store")).toBeVisible(); // full string
    await expect(page.getByText("Welcome to")).toBeVisible(); // substring - will pass
    await expect(page.getByText(/welcome to our store/i)).toBeVisible(); // ignore case sensitive

    // getByRole
    await page.getByRole("link", {name:'Register'}).click();
    await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();

    // getByLabel
    await page.getByLabel('Frist name:').fill("John");
    await page.getByLabel('Last name:').fill("Kenedy");
    await page.getByLabel('Email:').fill("abc@gamil.com");

    // getByPlaceholder
    page.getByPlaceholder('Search store').fill('Apple MacBook Pro');


})