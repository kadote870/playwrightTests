import {expect, test} from "@playwright/test";
import {Page} from "playwright";

const urlAddressMainPage = 'https://the-internet.herokuapp.com';

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

    const columnNames = [null, 'Iuvaret0', 'Apeirian0', 'Adipisci0', 'Definiebas0', 'Consequuntur0', 'Phaedrum0'];
    const check_column_names = async (page, array) => {
        for (let i = 1; i < array.length; i++) {
            const cell = await page.locator(`table tbody tr:nth-of-type(1) td:nth-of-type(${i})`);
            await expect(cell).toContainText(array[i]);
        }
    }

    interface FakeApiResponse {
        lorem: string;
        ipsum: string;
        dolor: string;
        sit: string;
        amet: string;
        diceret: string
    }

    const fakeApiResponse: FakeApiResponse[] = [
        {
            "lorem": "Iuvaret0",
            "ipsum": "Apeirian0",
            "dolor": "Adipisci0",
            "sit": "Definiebas0",
            "amet": "Consequuntur0",
            "diceret": "Phaedrum0"
        }, {
            "lorem": "Iuvaret1",
            "ipsum": "Apeirian1",
            "dolor": "Adipisci1",
            "sit": "Definiebas1",
            "amet": "Consequuntur1",
            "diceret": "Phaedrum1"
        },
        {
            "lorem": "Iuvaret2",
            "ipsum": "Apeirian2",
            "dolor": "Adipisci2",
            "sit": "Definiebas2",
            "amet": "Consequuntur2",
            "diceret": "Phaedrum2"
        },
        {
            "lorem": "Iuvaret3",
            "ipsum": "Apeirian3",
            "dolor": "Adipisci3",
            "sit": "Definiebas3",
            "amet": "Consequuntur3",
            "diceret": "Phaedrum3"
        },
        {
            "lorem": "Iuvaret4",
            "ipsum": "Apeirian4",
            "dolor": "Adipisci4",
            "sit": "Definiebas4",
            "amet": "Consequuntur4",
            "diceret": "Phaedrum4"
        },
        {
            "lorem": "Iuvaret5",
            "ipsum": "Apeirian5",
            "dolor": "Adipisci5",
            "sit": "Definiebas5",
            "amet": "Consequuntur5",
            "diceret": "Phaedrum5"
        },
        {
            "lorem": "Iuvaret6",
            "ipsum": "Apeirian6",
            "dolor": "Adipisci6",
            "sit": "Definiebas6",
            "amet": "Consequuntur6",
            "diceret": "Phaedrum6"
        },
        {
            "lorem": "Iuvaret7",
            "ipsum": "Apeirian7",
            "dolor": "Adipisci7",
            "sit": "Definiebas7",
            "amet": "Consequuntur7",
            "diceret": "Phaedrum7"
        },
        {
            "lorem": "Iuvaret8",
            "ipsum": "Apeirian8",
            "dolor": "Adipisci8",
            "sit": "Definiebas8",
            "amet": "Consequuntur8",
            "diceret": "Phaedrum8"
        },
        {
            "lorem": "Iuvaret9",
            "ipsum": "Apeirian9",
            "dolor": "Adipisci9",
            "sit": "Definiebas9",
            "amet": "Consequuntur9",
            "diceret": "Phaedrum9"
        }
    ]

    await go_to_main_page_and_go_to_specific_section(page, 'Challenging DOM');
    await expect(page.getByRole('heading', {name: 'Challenging DOM'})).toBeVisible();

    await page.click(button.blue, {force: true});
    await page.click(button.red, {force: true});
    await page.click(button.green, {force: true});

    await check_column_names(page, columnNames);

    for (let i = 0; i < fakeApiResponse.length; i++) {
        const rowNumber = i + 1;
        await expect(await page.locator(`table tbody tr:nth-of-type(${rowNumber}) td:nth-of-type(1)`)).toContainText(fakeApiResponse[i].lorem);
        await expect(await page.locator(`table tbody tr:nth-of-type(${rowNumber}) td:nth-of-type(2)`)).toContainText(fakeApiResponse[i].ipsum);
        await expect(await page.locator(`table tbody tr:nth-of-type(${rowNumber}) td:nth-of-type(3)`)).toContainText(fakeApiResponse[i].dolor);
        await expect(await page.locator(`table tbody tr:nth-of-type(${rowNumber}) td:nth-of-type(4)`)).toContainText(fakeApiResponse[i].sit);
        await expect(await page.locator(`table tbody tr:nth-of-type(${rowNumber}) td:nth-of-type(5)`)).toContainText(fakeApiResponse[i].amet);
        await expect(await page.locator(`table tbody tr:nth-of-type(${rowNumber}) td:nth-of-type(6)`)).toContainText(fakeApiResponse[i].diceret);
    }
});

test('Checkboxes', async ({page}) => {
    const checkbox1 = page.locator('form input:nth-of-type(1)');
    const checkbox2 = page.locator('form input:nth-of-type(2)');

    await go_to_main_page_and_go_to_specific_section(page, 'Checkboxes');
    await expect(page.getByRole('heading', {name: 'Checkboxes'})).toBeVisible();

    await expect(checkbox1).not.toBeChecked();
    await checkbox1.click();
    await expect(checkbox1).toBeChecked();

    await expect(checkbox2).toBeChecked();
    await checkbox2.click();
    await expect(checkbox2).not.toBeChecked();
});

// Context Menu
// Digest Authentication (user and pass: admin) - page don't work

test('Disappearing Elements', async ({page}) => {
    const button = {
        home: '[class="example"] ul li:nth-of-type(1)',
        about: '[class="example"] ul li:nth-of-type(2)',
        contactUs: '[class="example"] ul li:nth-of-type(3)',
        portfolio: '[class="example"] ul li:nth-of-type(4)',
        gallery: '[class="example"] ul li:nth-of-type(5)'
    }

    await go_to_main_page_and_go_to_specific_section(page, 'Disappearing Elements');
    await expect(page.getByRole('heading', {name: 'Disappearing Elements'})).toBeVisible();

    const buttons = await page.$$('[class="example"] ul li');

    await page.click(button.home);
    await page.waitForURL(urlAddressMainPage);
    await page.goBack();

    await page.click(button.about);
    await page.waitForURL(`${urlAddressMainPage}/about/`);
    await page.goBack();

    await page.click(button.contactUs);
    await page.waitForURL(`${urlAddressMainPage}/contact-us/`);
    await page.goBack();

    await page.click(button.portfolio);
    await page.waitForURL(`${urlAddressMainPage}/portfolio/`);
    await page.goBack();

    if (buttons.length === 5) {
        await page.click(button.gallery);
        await page.waitForURL(`${urlAddressMainPage}/gallery/`);
        await page.goBack();
    }
});

// Drag and Drop
// Dropdown

// Dynamic Content
// Dynamic Controls
// Dynamic Loading
// Entry Ad
// Exit Intent
// File Download
// File Upload
// Floating Menu
// Forgot Password
// Form Authentication
// Frames
// Geolocation
// Horizontal Slider
// Hovers
// Infinite Scroll
// Inputs
// JQuery UI Menus
// JavaScript Alerts
// JavaScript onload event error
// Key Presses
// Large & Deep DOM
// Multiple Windows
// Nested Frames
// Notification Messages
// Redirect Link
// Secure File Download
// Shadow DOM
// Shifting Content
// Slow Resources
// Sortable Data Tables
// Status Codes
// Typos
// WYSIWYG Editor
