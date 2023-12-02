import {expect, test} from "@playwright/test";
import {Page} from "playwright";

const urlAddressMainPage = 'https://the-internet.herokuapp.com'

const go_to_main_page_and_go_to_specific_section = async (page: Page, linkName: string) => {
    await page.goto(urlAddressMainPage);

    await expect(page).toHaveTitle(/The Internet/);
    await expect(page.getByRole('heading', {name: 'Welcome to the-internet'})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Available Examples'})).toBeVisible();

    // await page.click(selector, {force: true});
    await page.getByRole('link', {name: linkName}).click();
}

// A/B Testing
test('Add/Remove Elements', async ({page}) => {
    await go_to_main_page_and_go_to_specific_section(page, 'Add/Remove Elements');
    await expect(page.getByRole('heading', {name: 'Add/Remove Elements'})).toBeVisible();

    await page.click('button[onclick="addElement()"]', {force: true});
    await page.waitForSelector('#elements button:nth-of-type(1)');
    await page.click('#elements button:nth-of-type(1)', {force: true});
});

// Basic Auth (user and pass: admin)
// Broken Images

test('Challenging DOM', async ({page}) => {
    const button = {
        blue: '[class="large-2 columns"] a:nth-of-type(1)',
        red: '[class="large-2 columns"] a:nth-of-type(2)',
        green: '[class="large-2 columns"] a:nth-of-type(3)'
    }

    const row1 = [null, 'Iuvaret0', 'Apeirian0', 'Adipisci0', 'Definiebas0', 'Consequuntur0', 'Phaedrum0'];

    await go_to_main_page_and_go_to_specific_section(page, 'Challenging DOM');
    await expect(page.getByRole('heading', {name: 'Challenging DOM'})).toBeVisible();

    await page.click(button.blue, {force: true});
    await page.click(button.red, {force: true});
    await page.click(button.green, {force: true});

    for (let i = 1; i < row1.length; i++) {
        const cell = await page.locator(`table tbody tr:nth-of-type(1) td:nth-of-type(${i})`);
        await expect(cell).toContainText(row1[i]);
    }
});

/*
Checkboxes
Context Menu
Digest Authentication (user and pass: admin)
Disappearing Elements
Drag and Drop
Dropdown
Dynamic Content
Dynamic Controls
Dynamic Loading
Entry Ad
Exit Intent
File Download
File Upload
Floating Menu
Forgot Password
Form Authentication
Frames
Geolocation
Horizontal Slider
Hovers
Infinite Scroll
Inputs
JQuery UI Menus
JavaScript Alerts
JavaScript onload event error
Key Presses
Large & Deep DOM
Multiple Windows
Nested Frames
Notification Messages
Redirect Link
Secure File Download
Shadow DOM
Shifting Content
Slow Resources
Sortable Data Tables
Status Codes
Typos
WYSIWYG Editor
 */