import {test,expect,Locator} from "@playwright/test";

test("Single select dropdwon", async({page}) =>{

    await page.goto("https://testautomationpractice.blogspot.com");

    // Select option from the dropdown
    await page.locator('#country').selectOption('India'); // Using visible Text
    await page.locator('#country').selectOption({value:'uk'}); // By using value attribute
    await page.locator('#country').selectOption({label:'India'}); // By using label
    await page.locator('#country').selectOption({index:3}); // By index

    // Check number of options in the dropdwon (count)
    const dropdownOptions:Locator = await page.locator('#country>option');
    await expect(dropdownOptions).toHaveCount(10);

    // Check an option present in the dropdown
    // const optionsText:string[] = await dropdownOptions.allTextContents(); // we have to trim. so adding new code lines
    // console.log(optionsText);   

    const optionsText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
    console.log(optionsText);  
    expect(optionsText).toContain('Japan') 

    // Printing options from the dropdown
    for(const option of optionsText){
        console.log(option);
    }


    await page.waitForTimeout(3000);

})