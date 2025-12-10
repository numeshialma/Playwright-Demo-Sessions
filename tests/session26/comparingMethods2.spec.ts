import {test,expect,Locator} from "@playwright/test"

test('Text input actions', async({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator('.product-title');

    // all() - converys locator ---> Locator[]
    const productsLocators:Locator[] = await products.all();
    console.log(productsLocators);

    console.log(await productsLocators[1].innerText());

    for(let productLoc of productsLocators){        // for of loop 
        console.log(await productLoc.innerText());
    }

    for(let i in productsLocators){            // for in loop 
        console.log(await productsLocators[i].innerText());
    }
    

    await page.waitForTimeout(3000);
})