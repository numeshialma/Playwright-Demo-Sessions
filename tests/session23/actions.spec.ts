import {test,expect,Locator} from "@playwright/test"

test('Text input actions', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    // Input Box
    const testBox:Locator = page.locator('#name');
    await expect(testBox).toBeVisible();
    await expect(testBox).toBeEnabled();

    const maxlength:string|null = await testBox.getAttribute('maxlength') // Returns value of maxlength attribute of the element
    expect(maxlength).toBe('15');

    await testBox.fill("John Kenedy");
    const enteredValue:string = await testBox.inputValue();
    console.log("Input value of FirstName :", await testBox.textContent()); // Returns empty
    console.log("Input value of FirstName :", enteredValue); // returns the input value of text
    expect(enteredValue).toBe("John Kenedy");

    await page.waitForTimeout(3000);
})

test('Radio button actions', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    // Radio Buttons
    const maleRadtio:Locator = page.locator('#male');
    await expect(maleRadtio).toBeVisible();
    await expect(maleRadtio).toBeEnabled();   
    expect(await maleRadtio.isChecked()).toBe(false);

    await maleRadtio.check();
    expect(await maleRadtio.isChecked()).toBe(true); // Assertion 1
    await expect(maleRadtio).toBeChecked(); // Assertion 2 - preferable

    await page.waitForTimeout(3000);
})

test.only('Check box actions', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    // Check BOx

    // 1. Select specific checkbox using getByLabel & assert
    const sundayCheckBox:Locator = page.getByLabel('Sunday');
    await sundayCheckBox.check();
    await expect(sundayCheckBox).toBeChecked();
    
    // 2. Capture all check boxes & assert each is checked
    const days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const checkBoxes:Locator[] = days.map(index => page.getByLabel(index));
    expect(checkBoxes.length).toBe(7);

    for(const checkBox of checkBoxes ){
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }

    // 3. Select last 3 checkboxes
    for(const checkBox of checkBoxes.slice(-3)){
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }

    // uncheck last 3 checkboxes
    for(const checkBox of checkBoxes.slice(-3)){
        await checkBox.uncheck();
        await expect(checkBox).not.toBeChecked();
    }

    // 5. Toggle checkboxes: If checked,uncheck; If unchecked, check. Assert state flipped
    for(const checkBox of checkBoxes){
        if(await checkBox.isChecked()){ // only if checked
            await checkBox.check();
            await expect(checkBox).toBeChecked();
        } else{  // only if not checked
            await checkBox.uncheck();
            await expect(checkBox).not.toBeChecked();
        }
    }

    // 6. Randomly select check boxes - Select checkboxes by index (1,3,6) & assert
    const indexes:number[] = [1,3,6]
    for(const i of indexes){
        await checkBoxes[i].check();
        await expect(checkBoxes[i]).toBeChecked();
    }

    // 7. Select checkbox based on the label
    const weekName:string = "Friday";
    
    for(const label of days){
        if(label.toLowerCase()===weekName){
            const checkBox = page.getByLabel(label);
            checkBox.check();
            await expect(checkBox).toBeChecked();
        }
    }

    await page.waitForTimeout(3000);
})