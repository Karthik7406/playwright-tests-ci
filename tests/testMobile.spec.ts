import { test, expect } from "@playwright/test";

//running test on mobile device

test("input fields", async ({ page }, testInfo) => {

    //  console.log("test information ", testInfo);

    await page.goto("/");

    //sidebar toggle
    //test are universal
    // we might want to click only if we are running in the mobile device

    if (testInfo.project.name == "mobile") {
        await page.locator("a[class='sidebar-toggle']").click();
    }

    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();

    if (testInfo.project.name == "mobile") {
        await page.locator("a[class='sidebar-toggle']").click();
    }

    const usingTheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@gmail.com")
    await usingTheGridEmailInput.clear();

    await usingTheGridEmailInput.pressSequentially("testSeq@gmail.com", { delay: 100 });

    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("testSeq@gmail.com");

    await expect(usingTheGridEmailInput).toHaveValue("testSeq@gmail.com");

})