import { faker } from '@faker-js/faker';

const customer = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  documentNumber: faker.random.numeric(11),
  phoneNumber: faker.phone.number("119########"),
  gender: faker.name.gender(true) === 'male' ? 'M' : 'F'
}

describe('Create customer', () => {
    it('should be able create', () => {
      cy.visit('http://127.0.0.1:5173/customers')

      cy.findByText("+ Criar cliente").click()

      cy.get('#name').type(customer.name)
      cy.get('#email').type(customer.email)
      cy.get('#gender').type(customer.gender)
      cy.get('#documentNumber').type(customer.documentNumber)
      cy.get('#password').type(customer.password)
      cy.get('#confirmPassword').type(customer.password)
      cy.get('#phoneNumber').type(customer.phoneNumber)

      cy.findByText("Cadastrar").click()

      cy.location('pathname').should('eq', '/customers')
    })

  it('should not be able create with the same document number', () => {
    cy.visit('http://127.0.0.1:5173/customers')

    cy.findByText("+ Criar cliente").click()

    cy.get('#name').type(customer.name)
    cy.get('#email').type(customer.email)
    cy.get('#gender').type(customer.gender)
    cy.get('#documentNumber').type(customer.documentNumber)
    cy.get('#password').type(customer.password)
    cy.get('#confirmPassword').type(customer.password)
    cy.get('#phoneNumber').type(customer.phoneNumber)

    cy.findByText("Cadastrar").click()
    cy.get(".flash-notification").should('have.text', 'Ops... cliente já existe')
  })

  it('should not be able create with empty fields', () => {
    cy.visit('http://127.0.0.1:5173/customers')

    cy.findByText("+ Criar cliente").click()

    cy.findByText("Cadastrar").click()

    cy.findByText("name is a required field").should('exist')
    cy.findByText("email is a required field").should('exist')
    cy.findByText("gender is a required field").should('exist')
    cy.findByText("documentNumber is a required field").should('exist')
    cy.findByText("password is a required field").should('exist')
    cy.findByText("confirmPassword is a required field").should('exist')
    cy.findByText("phoneNumber is a required field").should('exist')
  })
})