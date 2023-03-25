import SimpleRandomCalculator from '../../src/calculators/SimpleRandomCalculator'
import SystematicRandomCalculator from '../../src/calculators/SystematicRandomCalculator'
import ClusterCaculator from '../../src/calculators/ClusterCalculator'

describe('Test input fields of each calculators', () => {
  
  it('check SimpleRandomCalculator input fields', () => {
    cy.mount(
      <SimpleRandomCalculator
        hasSubgroups={false}
        hasHouseholds={true}
        hasIndividuals={false}
        questionCards={[1]}
      />
    )
    cy.get("input").should('have.length', 4)
    cy.get("label").contains("Margin").should('exist')
    cy.get("label").contains("Confidence").should('exist')
    cy.get("label").contains("households").should('exist')
    cy.get("label").contains("Non-response").should('exist')
  })

  it('check input fields of systematic calculator', () => {
    cy.mount(<SystematicRandomCalculator/>)
    cy.get("input").should('have.length', 4)
    cy.get("label").contains("Margin").should('exist')
    cy.get("label").contains("Confidence").should('exist')
    cy.get("label").contains("individuals").should('exist')
    cy.get("label").contains("Non-response").should('exist')
  })

  it('check input fields of cluster calculator', () => {
    cy.mount(<ClusterCaculator/>)
    cy.get("input").should('have.length', 3)
    cy.get("label").contains("communities").should('exist')
    cy.get("label").contains("Margin").should('exist')
    cy.get("label").contains("Confidence").should('exist')
  })
})