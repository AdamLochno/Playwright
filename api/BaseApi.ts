// BaseApi.ts
import { request } from "@playwright/test";

export class BaseApi {
  protected requestContext: any;
  protected baseURL: string; // Dodaj pole baseURL

  // Nowa metoda do inicjalizacji kontekstu
  public async init() {
    this.requestContext = await request.newContext();
    this.baseURL = "https://demoqa.com/"; // Ustaw baseURL
  }

  public async dispose() {
    if (this.requestContext) {
      await this.requestContext.dispose();
    }
  }
}
