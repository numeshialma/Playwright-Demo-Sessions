import {test,expect,Locator} from "@playwright/test"

test('Read data from all the table', async({page}) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasMorePages=true;

    while(hasMorePages){
        const rows = await page.locator("#example tbody tr").all();
        for(let row of rows){
            console.log(await row.innerText());
        }
    }

    //button[aria-label='Next']
    //button[aria-controls='example']:has-text("›")
    //button[aria-controls='example']:nth-child(9)

    const nextButton:Locator = page.locator("button[aria-label='Next']");
    
    const isDisabled = await nextButton.getAttribute('class');  

    if(isDisabled?.includes('disabled')){
        hasMorePages = false;
    } else {
        await nextButton.click();
    }


    await page.waitForTimeout(3000);
})