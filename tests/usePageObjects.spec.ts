import { test, expect } from '@playwright/test';


import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutPage } from '../page-objects/formLayoutsPage'; 

import { DatepickerPage } from '../page-objects/datepickerPage';

import { PageManger } from '../page-objects/pageManager';

//generating the fake name
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {

    await page.goto("/");
})


test.only("navigate to the first page @smoke @regression", async ({ page }) => {

    const navigate = new NavigationPage(page);

    await navigate.formLayoutsPage();
    await navigate.datePickerPage();

    await navigate.toasterPage();
    await navigate.tooltipPage();
})


test.only("Parameterised Methods @regression", async({page}) => {

    const navigation = new NavigationPage(page);
    const onFormLayout = new FormLayoutPage(page);

    // await Promise.all([
    //     navigation.formLayoutsPage(),
    //     onFormLayout.submitUsingTheGridFormWithCredentialsAndSelectOption("karthik@test.com", "Welcome@@1", "Option 1")
    // ])

   

    await navigation.formLayoutsPage();
    await onFormLayout.submitUsingTheGridFormWithCredentialsAndSelectOption("karthik@test.com", "Welcome@@1", "Option 2");
})


test.only("Parameterised Methods - Inline Form @smoke @block", async({page}) => {
    const navigation = new NavigationPage(page);
    const onFormLayout = new FormLayoutPage(page);
    let randomFullName = faker.person.fullName();

    let randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(1000)}@test.com`;

    await navigation.formLayoutsPage();
    await onFormLayout.submiUsingInlineFormWithCredentials(randomFullName, randomEmail, false);
})

test("Datepicker - Inline Form", async({page}) => {
    const navigation = new NavigationPage(page);
    const onDatepickerPage = new DatepickerPage(page);

    await navigation.datePickerPage();
    await onDatepickerPage.selectCommonDatePickerFromToday(10);
})

test("Date picker with Range", async({page}) => {

    const navigation = new NavigationPage(page);
    const onDatepickerPage = new DatepickerPage(page);

    await navigation.datePickerPage();
    await onDatepickerPage.selectDatePickerWithRange(10, 16);
})

test("Page manager", async({page}) => {
    const pm = new PageManger(page);
    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectDatePickerWithRange(10, 16);
    await pm.onDatePickerPage().selectCommonDatePickerFromToday(10);
})