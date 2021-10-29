/// <reference types="cypress" />

describe('phonebook', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the login page', () => {
    cy.contains('fonebook')
  })

  it('should log into the API and show the dashboard', () => {
    cy.contains('fonebook')

    cy.get('[name=username]').type('test')
    cy.get('[name=password]').type('41rc4ll')

    cy.contains('Login').click()

    // sanity check #2
    cy.contains('Please select a call on the left')

    // we always have inbound calls, so let's take the first one
    cy.contains('inbound').click()

    // will only be visible if the detailed view has been opened
    cy.contains('DURATION')

    // Note Julian: at this point I would propose more tests,
    // however the API is dynamic, so a "data test plan" need to
    // be devised (how to populate the DB, prevent tests from
    // colliding each other when switching the archive mode etc)
    //
    // On the other hand we could also use the GQL schema to generate
    // some nice offline API mocks!
  })
})