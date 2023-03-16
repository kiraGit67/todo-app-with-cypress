/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("contains a Headline", () => {
    cy.get("h1").should("have.text", "Todo App");
  });

  it("should have 3 filter options", () => {
    cy.get("#todo-filter input[type='radio']").should("have.length", 3);
    cy.get("#filter-all").should("be.checked");
  });

  it("should change filter options", () => {
    cy.get("#filter-done").check();
    cy.get("#filter-done").should("be.checked");
    cy.get("#filter-open").check();
    cy.get("#filter-open").should("be.checked");
  });

  it("should have empty todo list by default", () => {
    cy.get("#todo-list li").should("have.length", 0);
  });

  it("should create new todo", () => {
    cy.get("#new-todo").type("Learn CSS");
    cy.get("#new-todo").should("have.value", "Learn CSS");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
    cy.get("#todo-list li").should("have.text", "Learn CSS");
    cy.get("#todo-list li > input").should("have.length", 1);
    cy.get("#todo-list li > input").should("have.attr", "type");
    cy.get("#todo-list li > input").click();
    cy.get("#todo-list li > input").should("be.checked");
    cy.get("#todo-list li").should("have.class", "done");
    cy.get("#new-todo").type("Learn Javascript");
    cy.get("#new-todo").should("have.value", "Learn Javascript");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 2);
    cy.get("#new-todo").type("Learn CSS");
    cy.get("#new-todo").should("have.value", "Learn CSS");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 2);
    cy.get("#new-todo").clear();
    cy.get("#new-todo").type("Learn Cypress");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 3);
    cy.get("#todo-list li:nth-child(2) > input").click();
    cy.get("#todo-list li:nth-child(2) > input").should("be.checked");
    cy.get("#todo-list li:nth-child(2)").should("have.class", "done");
    cy.get("#new-todo").type("Learn Unit Testing");
    cy.get("#new-todo").should("have.value", "Learn Unit Testing");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 4);
    cy.get("#delete-todos").click();
    cy.get("#todo-list li").should("have.length", 2);
  });
});
