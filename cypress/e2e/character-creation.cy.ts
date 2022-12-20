import { e2eUtils } from "./e2e-utils";

describe('Create a character, then view it and delete it', () => {
  before(() => cy.login('http://localhost:4200/character', 'boris', 'wachtwoord123'));
  beforeEach(() => cy.restoreLocalStorage());
  afterEach(() => cy.saveLocalStorage());
  it('visit', () => {
    cy.visit("http://localhost:4200/character")
    cy.contains('My Characters').click();
    cy.url().should('eq', 'http://localhost:4200/character');
    cy.contains('Create a new character').click();
    cy.url().should('eq', 'http://localhost:4200/character/create');
    cy.saveLocalStorage();
  });

  it('create', () => {
    cy.restoreLocalStorage();
    const textFields = e2eUtils.inputOfType('text');
    const numFields = e2eUtils.inputOfType('number');
    e2eUtils.inputWithName(textFields, 'name').type('My Awesome Character');
    e2eUtils.inputWithName(textFields, 'race').type('Human');
    e2eUtils.inputWithName(textFields, 'class').type('Wizard');
    e2eUtils.inputWithName(numFields, 'strength').type('1');
    e2eUtils.inputWithName(numFields, 'dexterity').type('2');
    e2eUtils.inputWithName(numFields, 'constitution').type('3');
    e2eUtils.inputWithName(numFields, 'intelligence').type('4');
    e2eUtils.inputWithName(numFields, 'wisdom').type('5');
    e2eUtils.inputWithName(numFields, 'charisma').type('6');
    e2eUtils.inputOfType('submit').click();
  });

  it('view', () => {
    cy.url().should('eq', 'http://localhost:4200/character');
    cy.contains('My Awesome Character').click();
    cy.contains('Delete').click();
    cy.url().should('eq', 'http://localhost:4200/character');
  })
});
