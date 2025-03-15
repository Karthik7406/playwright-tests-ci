import {test, expect} from "@playwright/test";


test.beforeEach(async({page}) => {
    await page.goto("http://uitestingplayground.com/ajax");
    await page.getByText("Button Triggering AJAX Request").click();
})


test("auto waiting feature", async({page})=>{

    const successButton = page.locator(".bg-success");
    //await successButton.click();

    //const textContent = await successButton.textContent();
    // await successButton.waitFor({state:"attached"});

    // const textContent = await successButton.allTextContents();
    // expect(textContent).toContain("Data loaded with AJAX get request.");

    await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})

})

test("alternative waits", async({page}) => {
    const successButton = page.locator(".bg-success");

    // alterntive waits

    //wait for element
    // await page.waitForSelector(".bg-success");


    // wait for particular response
    //await page.waitForResponse("http://uitestingplayground.com/ajaxdata");


    // wait for all network calls to be completed - not recommended

    await page.waitForLoadState("networkidle");

    await page.waitForTimeout(5000); // not recommended

     const textContent = await successButton.allTextContents();
    expect(textContent).toContain("Data loaded with AJAX get request.");
})

 
test("timeouts", async({page}) => {

   test.slow();
    const successButton = page.locator(".bg-success");
    await successButton.click({timeout: 16000});
})