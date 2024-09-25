import { faker } from "@faker-js/faker";

export class DataGenerator {
  // Funkcja do generowania fikcyjnego użytkownika
  public static generateUser() {
    return {
      userName: faker.internet.userName(),
      password: "Test1234!",
      email: faker.internet.email(),
      firstName: faker.person.firstName,
      lastName: faker.person.lastName(),
      username: faker.internet.userName,
    };
  }
}
