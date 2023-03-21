describe('Test fetching new questions', () => {
    beforeEach(() => {
      cy.visit("/sampling")
    })
  
    it('should have 1 question initially', () => {
      cy.get("[data-cy='question-name']").should('have.length', 1)
      cy.get("[data-cy='option-btn']").should('have.length', 2)
    })
  
    it('should generate the second card when button clicked', () => {
      cy.get("[data-cy='option-btn']").contains("Yes").click()
      cy.get("[data-cy='question-name']").should('have.length', 2)
    })
}
)