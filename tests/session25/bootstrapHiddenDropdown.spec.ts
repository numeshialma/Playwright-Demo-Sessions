import {test,expect,Locator} from "@playwright/test"

test('Bootstrap hidden dropdown', async({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Login
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // Click on the PM
    await page.getByText('PIM').click();;

    // Click on Job title dropdown
    await page.locator('form i').nth(2).click();

    await page.waitForTimeout(3000);

    // Capture all the options from dropdown and count
    const options = page.locator("div[role='listbox'] span");
    const count:number = await options.count();
    console.log("Number of options in a dropdown; ",count);

    // Print all options
    console.log("All the text contents: ", await options.allTextContents());
    console.log("Printing all options.....");
    for(let i=0; i<count; i++){
        console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }

    // Click on option
    for(let i=0; i<count; i++){
        const text = await options.nth(i).innerText();
        if(text=='Automaton Tester'){
            await options.nth(i).click();
            break;
        }
    }
        


    await page.waitForTimeout(3000);
})