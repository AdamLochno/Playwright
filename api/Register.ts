// Register.ts
import { BaseApi } from "./BaseApi";
import { apiPath } from "../utils/Paths";

export class Register extends BaseApi {
  async createUser(userName: string, password: string) {
    const url = `${this.baseURL}${apiPath.account}`;
    const response = await this.requestContext.post(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        userName: userName,
        password: password,
      },
    });
    return response;
  }
}
