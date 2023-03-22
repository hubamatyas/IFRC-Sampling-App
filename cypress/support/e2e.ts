// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-real-events/support'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add('inputSubgroupData', (subSizes:number[] ) => {
    for (let i = 0; i < subSizes.length; i++) {
        cy.get("[data-cy='group-inputs" + i + "']").find("[data-cy='subgroup-name']").type("Group No." + (i + 1))
        cy.get("[data-cy='group-inputs" + i + "']").find("[data-cy='subgroup-size']").type(subSizes[i].toString())
        if (i < subSizes.length - 1) {
            cy.get("[data-cy='group-inputs" + i + "']").find("[data-cy='addgroup-btn']").click()
        }
    }
})

Cypress.Commands.add('inputCommunities', (subSizes:number[] ) => {
    for (let i = 0; i < subSizes.length; i++) {
        cy.get("[id='name" + (i+1) + "']").type("Community No." + (i + 1))
        cy.get("[id='" + (i+1) + "']").type(subSizes[i].toString())
    }
})

Cypress.Commands.add('checkResult', (sampleSizes:number[] ) => {
    for (let i = 0; i < sampleSizes.length; i++) {
        cy.get("[data-cy='sampleSize']").should("contain",  sampleSizes[i])
    }
})