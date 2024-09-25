import { Browser, BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private usernameField = 'input[name="username"]';
  private passwordField = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
  }

  public async getPageUrl(): Promise<string> {
    return "https://demoqa.com/login";
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async verifyLoginPageUrl() {
    await this.verifyUrl("https://demoqa.com/login");
  }
}
