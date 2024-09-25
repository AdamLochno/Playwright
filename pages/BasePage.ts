import { Browser, BrowserContext, Page } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected browser: Browser;
  protected context: BrowserContext;
  protected baseURL: string;

  constructor(page: Page, browser: Browser, context: BrowserContext) {
    this.page = page;
    this.browser = browser;
    this.context = context;
    this.baseURL = "https://demoqa.com/";
  }

  async startBrowser() {
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(await this.getPageUrl());
  }

  async closeBrowser() {
    await this.page.close();
    await this.context.close();
  }

  public async getPageUrl(): Promise<string> {
    throw new Error("You have to implement the method getPageUrl!");
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async verifyUrl(expectedUrl: string) {
    const currentUrl = this.page.url();
    if (currentUrl !== expectedUrl) {
      throw new Error(`Expected URL: ${expectedUrl}, but got: ${currentUrl}`);
    }
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }
}
