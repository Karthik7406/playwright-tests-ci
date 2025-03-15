import {test, expect} from "@playwright/test";


test.beforeEach(async({page})=> {

    page.goto("https://cloud.ibm.com/power/estimate");

})


test("estimate cost", async({page}) => {

   
    // await page.getByRole('combobox', { name: 'Location', exact: true }).click();
    // await page.getByText('Dallas (us-south)').click();
    // await page.locator('#main-content div').first().click();
    // await page.locator('#main-content div').first().click();
    await page.getByRole('combobox', { name: 'Currency' }).click();
    await page.getByText('Europe').click();
})


