import { Page, expect } from "@playwright/test";


export class DatepickerPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCommonDatePickerFromToday(numberOfDaysFromToday: number) {


        const calenderInputField = this.page.getByPlaceholder("Form Picker")
        await calenderInputField.click();
        const dateToAssert = await this.selectDateInCalender(numberOfDaysFromToday);
        console.log("date to assert ", dateToAssert);

        await expect(calenderInputField).toHaveValue(dateToAssert);


    }

    async selectDatePickerWithRange(startDate: number, endDate: number) {

        let calenderInputField = this.page.getByPlaceholder("Range Picker");
        await calenderInputField.click();

        const startDateText = await this.selectDateInCalender(startDate);
        const endDateText = await this.selectDateInCalender(endDate);

        const dateToAssert = `${startDateText} - ${endDateText}`;
        await expect(calenderInputField).toHaveValue(dateToAssert);
    }

    private async selectDateInCalender(numberOfDaysFromToday: number): Promise<string> {

        const date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();

        const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
        console.log("month", expectedMonthShort);

        console.log("expected date", expectedDate);

        const expectedYear = date.getFullYear();

        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calenderMonthAndYear = await this.page.locator("nb-calendar-view-mode").textContent();
        console.log(calenderMonthAndYear);

        const expectedMonthLong = date.toLocaleString("en-US", { month: 'long' });

        const expectedMonthYear = ` ${expectedMonthLong} ${expectedYear}`;

        while (!calenderMonthAndYear.includes(expectedMonthYear)) {
            await this.page.locator("[data-name='chevron-right']").click();
            calenderMonthAndYear = await this.page.locator("nb-calendar-view-mode").textContent();
        }

        await this.page.locator(".day-cell.ng-star-inserted" ).filter({hasNot: this.page.locator(".bounding-month")}).getByText(expectedDate, { exact: true }).click();
        return dateToAssert;
        
    }
}