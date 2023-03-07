import SimpleRandomCalculator from '../../src/calculators/SimpleRandomCalculator'

describe('Foo component test', () => {
  beforeEach(() => {
    cy.mount(
    <SimpleRandomCalculator
      hasSubgroups={true}
      hasHouseholds={true}
      hasIndividuals={true}
    />
    )
  })
  
  it('mount calculator', () => {
    
    cy.get("label").contains("Margin").should('exist')
    cy.get("label").contains("households").should('exist')
    cy.get("label").contains("Non-response").should('exist')
    cy.get("label").contains("Confidence").should('exist')
    cy.get("input").should('have.length', 4)

  })
})