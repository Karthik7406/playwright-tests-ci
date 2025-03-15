import { Page } from "@playwright/test";



export class HelperBase {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async waitForNumberOfSeconds(timeInSeconds: number) {
        return this.page.waitForTimeout(timeInSeconds * 1000);
    }


}