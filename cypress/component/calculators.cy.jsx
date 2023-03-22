import SimpleRandomCalculator from '../../src/calculators/SimpleRandomCalculator'

describe('Test simple random calculator', () => {
  
  it('check the input field labels for sampling households with no subgroups', () => {
    cy.mount(
      <SimpleRandomCalculator
        hasSubgroups={false}
        hasHouseholds={true}
        hasIndividuals={false}
      />
      )
    cy.get("label").contains("Margin").should('exist')
    cy.get("label").contains("households").should('exist')
    cy.get("label").contains("Non-response").should('exist')
    cy.get("label").contains("Confidence").should('exist')
    cy.get("input").should('have.length', 4)

  })
})