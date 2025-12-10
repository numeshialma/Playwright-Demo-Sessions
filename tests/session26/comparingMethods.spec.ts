import {test,expect,Locator} from "@playwright/test"

test('Text input actions', async({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator('.product-title');

    // innerText() vs textContent()
    console.log(await products.nth(1).innerText());
    console.log(await products.nth(1).textContent());

    const count = await products.count();
    for(let i=0; i<count; i++){
        const productName1:string = await products.nth(i).innerText(); // Extract plain text.Eliminates whitespaces and line breaks
        console.log(productName1);

        const productName2:null|string = await products.nth(i).textContent(); // Extracts text including hidden elements. Includes extra whitespaces,line breaks etc
        console.log(productName2);

        console.log(productName2?.trim());
    }

    await page.waitForTimeout(3000);
})