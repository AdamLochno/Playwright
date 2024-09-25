import { test, expect, Browser, BrowserContext } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import  {users} from "../../utils/testData";
import { verify } from "crypto";


test.describe("LoginPage tests", () => {
  let browser: Browser;
  let context: BrowserContext;
  let loginPage: LoginPage;

  test.beforeEach(async ({ browser: browserInstance }) => {
    browser = browserInstance;
    context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page, browser, context);

    // Otwarcie przeglądarki na stronie logowania
    await loginPage.startBrowser();
  });

  test.afterEach(async () => {
    // Zamknięcie przeglądarki po teście
    await loginPage.closeBrowser();
  });

  test("should navigate to login page and verify URL", async () => {
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
    expect(await loginPage.getPageUrl()).not.toBe(
      loginPage.getPageUrl
    );
  });
});