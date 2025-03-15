import {test, expect} from "@playwright/test";

test.beforeEach(async({page}) => {
    
    await page.goto("http://localhost:4200");

})

test.describe("Form layouts page", ()=>{

    test.describe.configure({retries: 2});

    test.beforeEach(async ({page}) => {

        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    })

    test("input fields", async({page}, testInfo) => {

      //  console.log("test information ", testInfo);

        if(testInfo.retry) {
            console.log("******* inside the retry clean up *******************");
        }

        const usingTheGridEmailInput = page.locator("nb-card", {hasText:"Using the Grid"}).getByRole("textbox",{name: "Email"});

        await usingTheGridEmailInput.fill("test@gmail.com")
        await usingTheGridEmailInput.clear();

        await usingTheGridEmailInput.pressSequentially("testSeq@gmail.com", {delay: 200});

        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual("testSeq@gmail.com");

        await expect(usingTheGridEmailInput).toHaveValue("testSeq@gmail.com");

    })


    test.only("radio buttons", async({page}) => {

        const usingTheGridForm = await page.locator("nb-card", {hasText:"Using the Grid"});

        await usingTheGridForm.getByLabel("Option 2").check({force: true});
        const radioStatus2 = await usingTheGridForm.getByRole("radio", {name: "Option 1"}).isChecked();

        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels:100});

        // await usingTheGridForm.getByRole("radio", {name: "Option 2"}).check({force: true});

        // //assertions

        // const radioStatus = await usingTheGridForm.getByRole("radio", {name: "Option 2"}).isChecked();
        // console.log(radioStatus);

        // const radioStatus2 = await usingTheGridForm.getByRole("radio", {name: "Option 1"}).isChecked();
        // console.log(radioStatus2);

        // expect(radioStatus).toBeTruthy();
        // expect(radioStatus2).toBeFalsy();

        // expect(await usingTheGridForm.getByRole("radio", {name: "Option 1"}).isChecked()).toBeFalsy()
        // expect(await usingTheGridForm.getByRole("radio", {name: "Option 2"}).isChecked()).toBeTruthy();
    })



})


test("checkboxes", async({page}) => {

    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    await page.getByRole("checkbox",{name: "Hide on click"}).uncheck({force: true});

    await page.getByRole("checkbox", {name: 'Prevent arising of duplicate toast'}).check({force: true});

    const allCheckBoxed = page.getByRole("checkbox");


    for(const box of await allCheckBoxed.all()) {

        await box.uncheck({force: true});

        expect(await box.isChecked()).toBeFalsy();
    }


})


test("Lists and dropdowns", async({page}) => {

    const dropdown = page.locator("ngx-header nb-select");
    await dropdown.click();

    //const optionList =  page.getByRole("list").locator("nb-option");
    const optionList = page.locator("nb-option-list nb-option");

    console.log("Option List ", optionList);

    await expect(optionList).toHaveText(["Light", "Dark","Cosmic", "Corporate"]);

    await optionList.filter({hasText: "Cosmic"}).click();

    const header = page.locator("nb-layout-header");
    // await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)", 
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)" 
    };

    await dropdown.click();
    for(let color in colors) {
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS("background-color", colors[color]);
        await dropdown.click();
    }

})



test("tooltip ", async({page}) => {

    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();


    const toolTipCard = page.locator("nb-card", {hasText: "Tooltip Placements"});
    console.log("tool tip card ", toolTipCard);

    let toolTipbutton = toolTipCard.getByRole("button", {name: "Top"})
    await toolTipbutton.hover();

    let toolTipElement = page.locator("nb-tooltip")
    let tooltip = await toolTipElement.textContent();
    expect(tooltip).toEqual("This is a tooltip");



    let toolTipBox = await toolTipElement.boundingBox();
    let buttonBox = await toolTipbutton.boundingBox();
    expect(toolTipBox.y).toBeLessThan(buttonBox.y);

    toolTipbutton =  toolTipCard.getByRole("button", {name: 'Right'});
    await toolTipbutton.hover();

    toolTipElement = page.locator("nb-tooltip");
    tooltip = await toolTipElement.textContent();
    expect(tooltip).toEqual("This is a tooltip");

    toolTipBox = await toolTipElement.boundingBox();
    buttonBox = await toolTipbutton.boundingBox();
    console.log("final1", toolTipBox, buttonBox);
    //expect(buttonBox.x).toBeLessThan(toolTipBox.x);

    


    

    // console.log("button box ", buttonBox);
    // console.log("tooltip box ", toolTipBox)
    // console.log("text content of tooltip", tooltip);
    


})

test("tooltip 2 ", async({page}) => {

    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();


    const toolTipCard = page.locator("nb-card", {hasText: "Tooltip Placements"});
    console.log("tool tip card ", toolTipCard);

    let toolTipbutton = toolTipCard.getByRole("button", {name: "LEFT"})
    await toolTipbutton.hover();

    let toolTipElement = page.locator("nb-tooltip")
    let tooltip = await toolTipElement.textContent();
    expect(tooltip).toEqual("This is a tooltip");



    let toolTipBox = await toolTipElement.boundingBox();
    let buttonBox = await toolTipbutton.boundingBox();

    console.log("final1", toolTipBox, buttonBox);
    expect(buttonBox.x).toBeGreaterThan(toolTipBox.x);

   



    toolTipbutton = toolTipCard.getByRole("button", {name: "Bottom"})
    await toolTipbutton.hover({force: true});

    toolTipElement = page.locator("nb-tooltip")
    tooltip = await toolTipElement.textContent();
    expect(tooltip).toEqual("This is a tooltip");

    toolTipBox = await toolTipElement.boundingBox();
    buttonBox = await toolTipbutton.boundingBox();

    console.log("final2", toolTipBox, buttonBox);
    expect(buttonBox.y).toBeLessThan(toolTipBox.y);

})



test("dialog box", async({page}) => {

    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    await page.on("dialog", (dialog) => {
        console.log(dialog.message());
        expect(dialog.message()).toEqual("Are you sure you want to delete?");

        dialog.accept();
    })
    await page.getByRole("table").locator("tr", {hasText: "@mdo"}).locator(".nb-trash").click();

    await expect(page.locator("table tr").first()).not.toHaveText("@mdo");

    await page.waitForTimeout(5000);
})



test("Web tables 1", async({page}) => {

    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    const targetRow = page.getByRole("row", {name: "twitter@outlook.com"});

    await targetRow.locator(".nb-edit").click();

    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("35");


    await page.locator(".nb-checkmark").click();
    await expect(targetRow.locator("ng2-smart-table-cell").last()).toHaveText("35");


    //finding element by searching through the colums
    //moving to second page
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click();

    const targetRowByID = page.getByRole("row", {name: "19"}).filter({has: page.locator("td").nth(1).getByText("19")});
    await targetRowByID.locator(".nb-edit").click();

    await page.locator("input-editor").getByPlaceholder("E-mail").clear();
    await page.locator("input-editor").getByPlaceholder("E-mail").fill("karthik@test.com");
    await page.locator(".nb-checkmark").click();

    await expect(targetRowByID.locator("td").nth(5)).toHaveText("karthik@test.com");

    let ages = ["20","30","40","200"];
    
    for(let age of ages) {
        await page.getByPlaceholder("Age").clear();
        await page.getByPlaceholder("Age").fill(age);

        await page.waitForTimeout(2000);
    }

})


test("web tables 2", async({page}) => {

    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    let ages = ["20","30","40","200"];
    
    for(let age of ages) {
        await page.getByPlaceholder("Age").clear();
        await page.getByPlaceholder("Age").fill(age);

        await page.waitForTimeout(1000);

        let ageRows = await page.locator("tbody tr");

        for(let row of await ageRows.all()) {

            const cellValue = await row.locator("td").last().textContent();

            if(age == '200') {
                expect(await page.getByRole("table").textContent()).toContain("No data found");
            }
            else {
                expect(cellValue).toEqual(age);
            }
            
           
        }
    }


})


test("Date picker", async({page}) => {

    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calenderInputField =  page.getByPlaceholder("Form Picker")
    await calenderInputField.click();

    await page.locator("[class='day-cell ng-star-inserted']").getByText("4", {exact: true}).click();

    await expect(calenderInputField).toHaveValue("Mar 4, 2025");
})

test("Date picker 2", async({page}) => {

    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const calenderInputField =  page.getByPlaceholder("Form Picker")
    await calenderInputField.click();

    const date = new Date();
    date.setDate(date.getDate() + 80);
    const expectedDate = date.getDate().toString();

    const expectedMonthShort = date.toLocaleString("en-US", {month: "short"});
    console.log("month", expectedMonthShort);

    console.log("expected date", expectedDate);

    const expectedYear = date.getFullYear();

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calenderMonthAndYear = await page.locator("nb-calendar-view-mode").textContent();
    console.log(calenderMonthAndYear);

    const expectedMonthLong = date.toLocaleString("en-US", {month: 'long'});

    const expectedMonthYear = ` ${expectedMonthLong} ${expectedYear}`;

    while(!calenderMonthAndYear.includes(expectedMonthYear)) {
        
        //await page.getByRole('button').nth(4).click();
        await page.locator("[data-name='chevron-right']").click();
        calenderMonthAndYear = await page.locator("nb-calendar-view-mode").textContent();

    }


    await page.locator("[class='day-cell ng-star-inserted']").getByText(expectedDate, {exact: true}).click();

    await expect(calenderInputField).toHaveValue(dateToAssert);
})


test("sliders", async({page}) => {

    // const tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');

    // //getting cy and cx attributes

    // await tempGuage.evaluate((node) => {
    //     node.setAttribute("cx","232.63");
    //     node.setAttribute("cy", "232.63");

    // })

    // await tempGuage.click();


    // second method = mouse movement

    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();


    const box = await tempBox.boundingBox();
    console.log("bounding box ", box);

    const x = box.x + box.width/2;
    const y = box.y + box.height/2;

    await page.mouse.move(x, y);

    await page.mouse.down();
    await page.mouse.move(x+100, y);
    await page.mouse.move(x+100, y+100);
    await page.mouse.up();

    await expect(tempBox).toContainText("30");

    await page.mouse.move(x, y);

    await page.mouse.down();
    await page.mouse.move(x-100, y);
    await page.mouse.move(x-100, y+150);
    await page.mouse.up();
    await expect(tempBox).toContainText("12");

})