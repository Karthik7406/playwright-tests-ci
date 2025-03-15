import {Page} from "@playwright/test";

export class FormLayoutPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

   async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {

    const usingTheGridForm = this.page.locator("nb-card", {hasText: "Using the Grid"});
    await usingTheGridForm.getByRole("textbox", {name: "Email"}).fill(email);
    await usingTheGridForm.getByRole("textbox", {name:"Password"}).fill(password);
    await usingTheGridForm.getByRole("radio", {name: optionText}).check({force: true});
    await usingTheGridForm.getByRole("button").click();
    
   }

   async submiUsingInlineFormWithCredentials(name: string, email: string, rememberMe: boolean) {

    const usingTheInlineForm= this.page.locator("nb-card", {hasText: "Inline form"});

    await usingTheInlineForm.getByRole("textbox", {name: "Jane Doe"}).fill(name);
    await usingTheInlineForm.getByPlaceholder("Email").fill(email);
    
    if(rememberMe) {
        await usingTheInlineForm.getByRole("checkbox").check({force: true});
    }

    await usingTheInlineForm.getByRole("button").click();
   }
}