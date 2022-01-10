// Cypress CLI to run test
// To run all test :
// npx cypress run

// To check all command in cypress run CLI :
// npx cypress run --help

// To run single test file :
// npx cypress run --spec cypress/integration/{namefile}.spec.js 

/// <reference types="cypress"/>

it('should navigate to the TodoMVC App', () => {
    cy.visit('http://todomvc-app-for-testing.surge.sh')
})

it('should error', () => {
    cy.visit('http://todomvc-app-for-testing.surge.sh/this-does-not-exist')
})

it('should be able to add a new todo to the list', () => {
    cy.visit('http://todomvc-app-for-testing.surge.sh')
    
    cy.get('.new-todo', {timeout:6000}).type('Clean room{enter}')

    cy.get('.toggle').click()

    cy.contains('Clear completed').click()
})

it('should wait 6000ms to get new-todo selector', () => {
    cy.visit('http://todomvc-app-for-testing.surge.sh/?delay-new-todo=5000')

    cy.get('.new-todo', {timeout:6000}).type('Clean room{enter}')
})

it('should be able to add a new todo to the list with validation', () => {
    cy.visit('http://todomvc-app-for-testing.surge.sh')

    cy.get('.new-todo', {timeout:6000}).type("Clean room{enter}")

    cy.get('label').should('have.text', 'Clean room')
    cy.get('.toggle').should('not.be.checked')

    cy.get('.toggle').click()
    cy.get('label').should('have.css', 'text-decoration-line', 'line-through')

    cy.contains('Clear').click()

    cy.get('.todo-list').should('not.have.descendants', 'li')
})

