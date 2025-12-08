import {test,expect} from "@playwright/test"

test("Verify page URL", async ({page})=> {

    await page.goto("http://www.automationpractice.pl/index.php");
    let url:string = await page.title();
    console.log("URL :",url);
    await expect(page).toHaveURL(/automationpractice/);


})
