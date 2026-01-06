import {test,expect,Locator} from "@playwright/test"

test('Read data from all the table', async({page}) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasMorePages=true;

    const rows = await page.locator("#example tbody tr").all();
    for(let row of rows){
        console.log(await row.innerText());
    }

    await page.waitForTimeout(3000);
})