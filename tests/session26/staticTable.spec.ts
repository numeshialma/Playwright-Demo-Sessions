import {test,expect,Locator} from "@playwright/test"

test('Static web table', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    // Count number of rows
    const rows:Locator = page.locator("table[name='BookTable'] tbody tr");  // returning all rows including header
    await expect(rows).toHaveCount(7);   // Approach 1

    const rowCount:number = await rows.count();
    console.log("Number of rows in a table: ",rowCount);
    expect(rowCount).toBe(7);             // Approach 2

    // Count number of header/columns
    const columns:Locator = page.locator("table[name='BookTable'] tbody tr th");
    await expect(columns).toHaveCount(4);   // Approach 1

    const columnCount:number = await columns.count();
    console.log("Number of columns in a table: ",columnCount);
    expect(columnCount).toBe(4);             // Approach 2





    await page.waitForTimeout(3000);
})