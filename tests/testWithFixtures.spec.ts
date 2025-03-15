import {test} from "../test-options";
import { PageManger } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";





test("test with fixtues", async({pageManager}) => {

    console.log("executing the actual test file");

    //const pm = new PageManger(page);

    let randomFullName = faker.person.fullName();
    let randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(1000)}@test.com`;

    await pageManager.onFormLayoutPage().submiUsingInlineFormWithCredentials(randomFullName, randomEmail, false);

})