import {test,expect,Locator} from "@playwright/test"

test('Text input actions', async({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator('.product-title');

    // allInnerText() vs allTextContent()
    const productNames1:string[] =await products.allInnerTexts();
    console.log("Product Names captured by allInnerText(): " ,productNames1);

    const productNames2:string[] =await products.allTextContents();
    console.log("Product Names captured by allTextContents(): " ,productNames2);
    
    const productNamesTrimmed:string[] = productNames2.map(text=>text.trim());
    console.log("product names after trimmed: ",productNamesTrimmed);
    
    

    await page.waitForTimeout(3000);
})