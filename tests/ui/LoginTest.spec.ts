import { test, expect, Browser, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
// import { users } from "../../utils/testData";
import { verify } from "crypto";
import { DataGenerator } from "../../utils/DataGenerator"; // Importuj DataGenerator
import { Register } from "../../api/Register";

test.describe("LoginPage tests", () => {
  let browser: Browser;
  let context: BrowserContext;
  let loginPage: LoginPage;
  let register: Register;
  register = new Register();
  const { userName, password } = DataGenerator.generateUser();

  test.beforeEach(async ({ browser: browserInstance }) => {
    browser = browserInstance;
    context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page, browser, context);
    await register.init();
    await register.createUser(userName, password);

    await loginPage.startBrowser();
  });

  test.afterEach(async () => {
    await loginPage.closeBrowser();
  });

  test("should login", async () => {
    await loginPage.login(userName, password);

    await loginPage.clickLoginButton();

    await loginPage.verifyLoginPageUrl();
  });
});
