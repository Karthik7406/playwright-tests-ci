import {test as base } from "@playwright/test";
import { PageManger } from "./page-objects/pageManager";

export type TestOptions = {
    globalsQaURL: string,
    formLayoutsPage: string,
    pageManager: PageManger
}

/*

export const test = base.extend<TestOptions>({
    globalsQaURL: ["", {option: true}],

    formLayoutsPage: [async({page}, use) => {

        await page.goto("/");
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
        await use("");

        console.log("executing after the test is completed");

    }, {auto: true}],

    pageManager: async({page}, use) => {
        const pm = new PageManger(page);
        await use(pm);
    }
})

*/

//fixture dependency

export const test = base.extend<TestOptions>({
    globalsQaURL: ["", {option: true}],

    formLayoutsPage: async({page}, use) => {

        console.log("executing form layouts page");

        await page.goto("/");
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
        await use("");

    },

    pageManager: async({page, formLayoutsPage}, use) => {
        console.log("executing page manager");
        const pm = new PageManger(page);
        await use(pm);
    }
})


