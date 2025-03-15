import { expect} from '@playwright/test';
import {test} from "../test-options";

// test.beforeEach(async({page}) => {

//     await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
// })


test("drag and drop with iframes", async({page, globalsQaURL}) => {

    await page.goto(globalsQaURL);

    const frame = page.frameLocator("[rel-title='Photo Manager'] iframe");


    await frame.locator("li", {hasText: "High Tatras 2"}).dragTo(frame.locator("#trash"));

    //more precise control performing mouse drag and drop
    await frame.locator("li", {hasText: "High Tatras 4"}).hover();
    await page.mouse.down();
    await frame.locator("#trash").hover();
    await page.mouse.up();


    await expect(frame.locator("#trash li h5")).toHaveText(["High Tatras 2", "High Tatras 4"]);
})