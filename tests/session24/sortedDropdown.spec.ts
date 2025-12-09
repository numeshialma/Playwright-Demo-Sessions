import {test,expect,Locator} from "@playwright/test";

test("Verify dropdown is sorted", async({page}) =>{

    await page.goto("https://testautomationpractice.blogspot.com");

    const dropdownOptions:Locator = page.locator('#animals>option'); // sorted
    // const dropdownOptions:Locator = await page.locator('#colors>option'); // not sorted
    console.log(await dropdownOptions.allTextContents()); // to check if specases are there

    const optionsText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
    const originalList:string[]=[...optionsText];
    const sortedList:string[]=[...optionsText].sort();

    console.log("Original list: ",originalList);
    console.log("Sorted list: ",sortedList);

    expect(originalList).toEqual(sortedList);


    await page.waitForTimeout(3000);

})