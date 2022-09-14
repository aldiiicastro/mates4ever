import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const PORT = 19000;

const config = {
    platformName: "Android",
    platformVersion: "8",
    deviceName: "Android Emulator",
    app: "/path/to/the/downloaded/app.apk",
    automationName: "UiAutomator2"
}

const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
    await driver.init(config);
})


test('Test Accessibilty Id', async () => {
    expect(await driver.hasElementByAccessibilityId('email')).toBe(true);
    expect(await driver.hasElementByAccessibilityId('password')).toBe(true);
});