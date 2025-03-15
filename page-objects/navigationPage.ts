import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

//extending Helper Page
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {


    readonly formLayoutsMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly tooltipMenuItem: Locator;
    readonly toasterMenuItem: Locator;

    constructor(page: Page) {

        super(page);


        this.formLayoutsMenuItem = page.getByText("Form Layouts");
        this.datePickerMenuItem = page.getByText("Datepicker");
        this.smartTableMenuItem = page.getByText("Smart Table");
        this.tooltipMenuItem = page.getByText("Tooltip");
        this.toasterMenuItem = page.getByText("Toastr");


    }

    async formLayoutsPage() {
        //await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");
        await this.formLayoutsMenuItem.click();

        //using helper class method
        await this.waitForNumberOfSeconds(2);
    }

    async datePickerPage() {
        //    await this.page.getByText("Forms").click();
        //    await this.page.waitForTimeout(2000);

        await this.selectGroupMenuItem("Forms");
        await this.page.waitForTimeout(2000);
        // await this.page.getByText("Datepicker").click();
        await this.datePickerMenuItem.click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem("Tables & Data");
        //await this.page.getByText("Smart Table").click();
        await this.smartTableMenuItem.click();

    }

    async toasterPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        //await this.page.getByText("Toastr").click();
        await this.toasterMenuItem.click();
    }

    async tooltipPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        //await this.page.getByText("Tooltip").click();
        await this.tooltipMenuItem.click();
    }


    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute("aria-expanded");
        if (expandedState == "false") {
            await groupMenuItem.click();
        }
    }
}
