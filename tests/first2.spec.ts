import { test } from "@playwright/test";

test.beforeEach(() => {
    console.log("executing main before Each function");
})


test.describe("Suite 1", async () => {

    test.beforeEach(() => {
        console.log("executing before each for suite 1");
    })

    test("first test - suite 1", () => {
        console.log("executing first test - suite 1");
    })

    test("second test - suite 1", () => {
        console.log("executing second test - suite 1");
    })

})



test.describe("Suite 2", async () => {
    test.beforeEach(() => {
        console.log("executing before each for suite 2");
    })


    test("first test - Suite 2", () => {
        console.log("executing first test - suite 2");
    })

    test("second test - Suite 2", () => {
        console.log("executing second test - suite 2");
    })



})


