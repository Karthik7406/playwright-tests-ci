import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
})


test.skip("Locator syntax rules ", async ({page}) => {
    //by tag name
    await page.locator("input").first().click();

    //by id
    await page.locator("#inputEmail1").click();

    //by class value
    page.locator(".shape-rectangle");

    //by attribute
    page.locator("[placeholder='Email']");
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')


    // combining selectors
    page.locator("input[placeholder='Email'].shape-rectangle");


    // xpath
    page.locator("//*[@id='inputEmail1']")


    // partial text match
    page.locator(":text('Using')");

    //by exact text match
    page.locator(":text-is('Using the grid')")


})


test.skip("user facing locators", async ({page}) => {

    await page.getByRole("textbox", {name: "Email"}).first().click();
    await page.getByLabel("Email").first().click();

    await page.getByPlaceholder("Jane Doe").click();

    await page.getByText("Using the Grid").click();

    //await page.getByTitle("IoT Dashboard").click();
   await page.getByTestId("SignIn").click();

})


test("Locating child elements", async({page}) => {
    await page.locator("nb-card nb-radio :text-is('Option 1')").click();
    await page.locator("nb-card").locator("nb-radio").locator(":text-is('Option 2')").click();
})


// Parent Elements
test("Parent elements", async ({page}) => {
    await page.locator("nb-card", {hasText:"Using the Grid"}).getByRole("textbox", {name:'Email'}).click();
    await page.locator("nb-card", {has: page.locator("#inputPassword2")}).getByRole("textbox", {name:"Password"}).click();

    await page.locator("nb-card").filter({hasText: "Basic form"}).getByRole("textbox", {name:'Email'}).click();
    await page.locator("nb-card").filter({has: page.locator(".status-danger")}).getByRole("textbox", {name: "Password"}).click();


    await page.locator("nb-card").filter({has: page.locator("nb-checkbox")}).filter({hasText: "Sign in"}).getByRole("textbox", {name:'Email'}).click();
   
    await page.locator(":text-is('Using the Grid')").locator("..").getByRole("textbox", {name: "Password"}).click();

})



test("Reusing locators", async({page}) => {

    const basicForm = page.locator("nb-card").filter({hasText:"Basic form"});

    const emailField = basicForm.getByRole("textbox", {name: "Email"});

    await emailField.fill("test@gmail.com");
    await basicForm.getByRole("textbox", {name: 'Password'}).fill("Welcome123");

    await basicForm.locator("nb-checkbox").click();
    await basicForm.getByRole("button", {name: "Submit"}).click();

    await expect(emailField).toHaveValue("test@gmail.com");

})



test("Extracting values", async({page}) => {

    //single text value
    const basicForm = page.locator("nb-card").filter({hasText:"Basic form"});
    const buttonText = await basicForm.locator("button").textContent();
    expect(buttonText).toEqual("Submit");


    // get all text values
    const result = await page.locator("nb-radio").allTextContents();
    console.log("results", result);
    expect(result).toContain("Option 1");


    // input values -> some text values wont be displayed in the DOM
    const emailField = basicForm.getByRole("textbox", {name: 'Email'});
    await emailField.fill("test@gmail.com");

    const emailvalue = await emailField.inputValue();
    expect(emailvalue).toEqual("test@gmail.com");

    //attribute values
    const placeholderValue = await emailField.getAttribute("placeholder");
    console.log("placeholder value", placeholderValue);
    expect(placeholderValue).toEqual("Email");

})

test("assertions", async({page}) => {

    // General assertion 
    const value = 5;
    expect(value).toEqual(5);

    const basicFormButton = page.locator("nb-card").filter({hasText:"Basic form"}).locator("button");
    const text = await basicFormButton.textContent();

    expect(text).toEqual("Submit");

    // above assertions won't wait

    //location assertion
    await expect(basicFormButton).toHaveText("Submit"); 
    //locator assertions waits for 5seconds

    //soft assertions
    // test case continues to execute even if assertion has failed
    
    await expect.soft(basicFormButton).toHaveText("Submit2"); 


    await basicFormButton.click();
})




