import {test,expect,Locator} from "@playwright/test"

test('Filter the rows and check the rows count', async({page}) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown:Locator = page.locator("#dt-length-0");
    await dropdown.selectOption({label:'25'});

    // Approach 1
    const rows = await page.locator("#example tbody tr").all();
    expect(rows.length).toBe(25);

    // Approach 2
    const rows2 = page.locator("#example tbody tr");
    expect(rows2).toHaveCount(25);

    await page.waitForTimeout(3000);
})

test.only('Search for specific data in a row', async({page}) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox:Locator = page.locator("#dt-search-0");
    searchBox.fill("Paul Byrd");

    const rows = await page.locator("#example tbody tr").all();
    if(rows.length>=1){
        let matchFound = false;
        for(let row of rows){
            const text = await row.innerText();
            if(text.includes('Paul Byrd')){
                console.log("Record exist - found ");
                matchFound = true;
                break;
            }
        }
        expect(matchFound).toBe(true);
        expect(matchFound).toBeTruthy();
    } else {
        console.log("No rows found with search text");
    }
    

    await page.waitForTimeout(3000);
})