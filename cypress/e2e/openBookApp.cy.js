const title = {
  first: "Цвет волшебства",
  second: "Дочь некроманта",
  third: "Макабр",
};

const description = {
  first: "Приключения удачливого волшебника в неудачных ситуациях",
  second: "Молодая волшебница пытается высвободить своего предка",
  third: "Мрачное фэнтези",
};

const author = {
  first: "Терри Пратчетт",
  second: "Ник Перумов",
  third: "NoName",
};

describe("Установка и настройка проекта", () => {
  beforeEach(() => {
    cy.visit("/");
  }),
    it("проверка отображения страницы", () => {
      cy.contains("Books list");
    });

  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(null, "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.login("test@test.com", null);
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should open window adding book", () => {
    cy.login("test@test.com", "test");
    cy.contains("Add new").click();
    cy.get(".modal-title").should("contain", "Book description");
  });

  it("Should be button with text", () => {
    cy.login("test@test.com", "test");
    cy.visit("/favorites");
    cy.get(".btn > a").should(
      "contain",
      "Please add some book to favorit on home page!"
    );
  });

  it("Should show added book in library", () => {
    cy.login("test@test.com", "test");
    cy.addBook(
      title.second,
      "Приключения удачливого волшебника в неудачных ситуациях",
      "Терри Пратчетт"
    );
    cy.get("h4").click();
    cy.get(".card-title").should("contain", title.second);
  });

  it("should indicate book info in favorite", () => {
    cy.login("test@test.com", "test");
    cy.addBook(title.third, description.third, author.third);
    cy.visit("/favorites");
    cy.contains(title.third).click();
    cy.contains(description.third);
  });
});
