// RegisterTest.spec.ts
import { test, expect } from "@playwright/test";
import { Register } from "../../api/Register";
import { DataGenerator } from "../../utils/DataGenerator"; // Importuj DataGenerator

test.describe("User Registration", () => {
  let register: Register;
  register = new Register();

  test.beforeAll(async () => {
    await register.init(); // Inicjalizuj kontekst
  });

  test.afterAll(async () => {
    await register.dispose();
  });

  test("should add new user successfully", async () => {
    //GIVEN user wants to register
    const { userName, password } = DataGenerator.generateUser();

    // WHEN request is sent
    const response = await register.createUser(userName, password);
    const result = await response.json();

    // THEN new user is added
    expect(response.status()).toBe(201);
    expect(result.userID).not.toBe("");
    expect(result).toHaveProperty("username", userName);
    expect(result.books).toHaveLength(0);
  });

  test("should not add user successfully that already exists", async () => {
    // GIVEN user wants to register
    const { userName, password } = DataGenerator.generateUser();

    // WHEN request is sent
    const response = await register.createUser(userName, password);

    // THEN new user is added
    expect(response.status()).toBe(201);

    // AND same user wants to register again
    const responseForDuplicatedUser = await register.createUser(
      userName,
      password
    );
    const result = await responseForDuplicatedUser.json();

    // THEN it gets message that it is immposible
    expect(responseForDuplicatedUser.status()).toBe(406);
    expect(result).toHaveProperty("code", "1204");
    expect(result).toHaveProperty("message", "User exists!");
  });
});
