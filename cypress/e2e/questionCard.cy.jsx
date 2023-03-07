import 'cypress-react-selector';

describe('Test the first question card', () => {

  beforeEach(() => {
    cy.visit("/sampling")
  })

  it('should have one question card initially', () => {
    cy.get("h2").should('have.length', 1)
  })

  it('should generate the second card when button clicked', () => {
    cy.get("button").contains("Yes").click()
    cy.get("h2").should('have.length', 2)
    
  })

})