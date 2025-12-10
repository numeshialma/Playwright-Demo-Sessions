import {test,expect,Locator} from "@playwright/test"

test('Auto suggest dropdown', async({page}) => {

    await page.goto("https://www.flipkart.com/");

    await page.locator("input[name='q']").fill("smart");  // search text

    await page.waitForTimeout(5000);

    // get all the suggested options --> Ctrl+Shift+P on DOM --> emulate focused
    const options:Locator = page.locator("ul>li>div>a");   // ul>li>div
    const count = await options.count();
    console.log("Number of suggested options: ",count);

    // Print single elemet in the console
    console.log("5th option: ", await options.nth(5).innerText());

    // printing all the sggested options in the console
    console.log("Printing all the auto suggesstions......");
    for(let i=0; i<count; i++){
        console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }

    // Click on the smart phone option
    for(let i=0; i<count; i++){
        const text = await options.nth(i).innerText();
        if(text=='smartphone'){
            options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(3000);
})