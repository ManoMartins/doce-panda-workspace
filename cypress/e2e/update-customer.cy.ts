import {faker} from "@faker-js/faker";

describe("Update customer", () => {
    it("should be able update a customer", () => {
        cy.visit('http://127.0.0.1:5173/customers')

        cy.get(':nth-child(1) > .td-action > .dlvewX > a > .types__StyledButton-sc-ws60qy-0').click()

        const customer = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            documentNumber: faker.random.numeric(11),
            phoneNumber: faker.phone.number("119########"),
            gender: faker.name.gender(true) === 'male' ? 'M' : 'F'
        }

        cy.get('#name').clear()
        cy.get('#name').type(customer.name)

        cy.get('#email').clear()
        cy.get('#email').type(customer.email)

        cy.get('#gender').clear()
        cy.get('#gender').type(customer.gender)

        cy.get('#documentNumber').clear()
        cy.get('#documentNumber').type(customer.documentNumber)

        cy.get('#phoneNumber').clear()
        cy.get('#phoneNumber').type(customer.phoneNumber)

        cy.findByText("Editar").click()

        cy.get(".flash-notification").should('have.text', 'Conta editada com sucesso.')
    })

    it('should not be able update with empty fields', () => {
        cy.visit('http://127.0.0.1:5173/customers')
        cy.get(':nth-child(1) > .td-action > .dlvewX > a > .types__StyledButton-sc-ws60qy-0').click()

        cy.get('#name').clear()
        cy.get('#email').clear()
        cy.get('#gender').clear()
        cy.get('#documentNumber').clear()
        cy.get('#phoneNumber').clear()

        cy.findByText("Editar").click()

        cy.findByText("name is a required field").should('exist')
        cy.findByText("email is a required field").should('exist')
        cy.findByText("gender is a required field").should('exist')
        cy.findByText("documentNumber is a required field").should('exist')
        cy.findByText("phoneNumber is a required field").should('exist')
    })
})