import {test,expect,Locator} from "@playwright/test";

test("Multiple select dropdwon", async({page}) =>{

    await page.goto("https://testautomationpractice.blogspot.com");

    // Select option from the dropdown
    // await page.locator('#colors').selectOption(['Red','Blue','Green']); // Using visible Text
    // await page.locator('#colors').selectOption(['red','Blue','green']); // Using value attribute
    // await page.locator('#colors').selectOption([{label:'Yellow'},{label:'White'},{label:'Green'}]) // Using label
    await page.locator('#colors').selectOption([{index:0},{index:2},{index:4}]) // Using index
    

    // Check number of options in the dropdwon (count)
    const dropdownOptions:Locator = await page.locator('#colors>option');
    await expect(dropdownOptions).toHaveCount(7);

    // Check an option present in the dropdown
    const optionsText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
    console.log(optionsText);  
    expect(optionsText).toContain('White') 

    // Printing options from the dropdown
    for(const option of optionsText){
        console.log(option);
    }


    await page.waitForTimeout(3000);

})