import { Browser, BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { uiPath } from "../utils/Paths"; // Upewnij się, że poprawnie importujesz uiPath

export class LoginPage extends BasePage {
  private usernameField = 'input[id="userName"]';
  private passwordField = 'input[id="password"]';
  private loginButton = 'button[id="login"]';

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    super(page, browser, context);
  }

  public async getPageUrl(): Promise<string> {
    return `${this.baseURL}${uiPath.login}`; // Łączenie baseURL i uiPath
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async verifyLoginPageUrl() {
    await this.verifyUrl(await this.getPageUrl());
  }
}
