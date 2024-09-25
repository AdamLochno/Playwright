import { Browser, BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private usernameField = 'input[data-test="username"]';
  private passwordField = 'input[data-test="password"]';
  private loginButton = 'input[data-test="login-button"]';

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
  }

  public async getPageUrl(): Promise<string> {
    return "https://www.saucedemo.com/";
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async verifyLoginPageUrl() {
    await this.verifyUrl("https://www.saucedemo.com/");
  }
}
