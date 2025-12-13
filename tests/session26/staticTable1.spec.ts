import {test,expect,Locator} from "@playwright/test"

test('Static web table', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    // Count number of rows
    const rows:Locator = table.locator("tr");  // returning all rows including header
    await expect(rows).toHaveCount(7);   // Approach 1

    const rowCount:number = await rows.count();
    console.log("Number of rows in a table: ",rowCount);
    expect(rowCount).toBe(7);             // Approach 2

    // Count number of header/columns
    const columns:Locator = rows.locator("th");
    await expect(columns).toHaveCount(4);   // Approach 1

    const columnCount:number = await columns.count();
    console.log("Number of columns in a table: ",columnCount);
    expect(columnCount).toBe(4);             // Approach 2

    // Read all data from 2nd row (index 2 means 3rd row includinh header)
    const secondRowCells:Locator = rows.nth(2).locator("td");
    const secondRowTexts:string[] = await secondRowCells.allInnerTexts();
    console.log("2nd row data: " ,secondRowTexts);

    await expect(secondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

    console.log("Printing 2nd row data......");
    for(let text of secondRowTexts){
        console.log(text);
    }

    // Read all data (excluding header)
    console.log("Printing all table data......");
    const allRowData = await rows.all();   // get all row locators   // all() returns array of locators
    console.log("BookName   Author   Suject   Price");

    for(let row of allRowData.slice(1)){      // slice(1) --> skip header row
        const cols = await row.locator("td").allInnerTexts();
        // console.log(cols);
        console.log(cols.join('\t'));
    }   
    
    // Print book names where author is Mukesh
    console.log("Books written by Mukesh......");

    const mukeshBooks:string[] = [];

    for(let row of allRowData.slice(1)){      // slice(1) --> skip header row
        const cells = await row.locator("td").allInnerTexts();
        
        const author = cells[1];
        const book = cells[0];

        if(author === 'Mukesh'){
            console.log(`${author} \t ${book}`);
            mukeshBooks.push(book);
        }
    } 
    expect(mukeshBooks).toHaveLength(2);

    // Calculate total price of all books
    let totalPrice:number = 0;
    for(let row of allRowData.slice(1)){
        const cells = await row.locator('td').allInnerTexts();
        const price = cells[3];

        totalPrice = totalPrice+parseInt(price);
    }
    console.log("Total price: " ,totalPrice);
    expect(totalPrice).toBe(7100);




    await page.waitForTimeout(3000);
})