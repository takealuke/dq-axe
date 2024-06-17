const { Builder, By, until } = require('selenium-webdriver');
const AxeBuilder = require('@axe-core/webdriverjs');
const { expect } = require('@jest/globals');

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
});

afterAll(async () => {
  await driver.quit();
});

test('main-nav has been loaded', async () => {
  await driver.get('https://dequeuniversity.com/demo/mars');
  const mainNav = await driver.findElement(By.css('#main-nav'));
  expect(mainNav).toBeTruthy();
});

test('Perform an accessibility scan of the page', async () => {
  await driver.get('https://dequeuniversity.com/demo/mars');
  const results = await new AxeBuilder(driver).analyze();
  console.log('Accessibility Violations:', results.violations);
  expect(results.violations.length).toBe(0);
});
