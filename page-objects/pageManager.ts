import {Page, expect} from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutPage } from "./formLayoutsPage";
import { DatepickerPage } from "./datepickerPage";

export class PageManger {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutPage;
    private readonly datePickerPage: DatepickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutPage(this.page);
        this.datePickerPage = new DatepickerPage(this.page);


    }

    navigateTo() {
        return this.navigationPage
    }

    onFormLayoutPage() {
        return this.formLayoutsPage;
    }

    onDatePickerPage() {
        return this.datePickerPage;
    }
}

