describe('Test the Navbar routing', () => {
    beforeEach(() => {
      cy.visit("/")
    })
    
    it('should go to sampling page by navbar', () => {
        cy.get("[data-cy='samplingLink']").click()
        cy.url().should('include', '/sampling')
    })

    it('should go to resources page by navbar', () => {
        cy.get("[data-cy='resourcesLink']").click()
        cy.url().should('include', '/resources')
    })

    it('should go to about page by navbar', () => {
        cy.get("[data-cy='aboutLink']").click()
        cy.url().should('include', '/about')
    })

    it('should change language to french', () => {
        cy.get("[data-cy='langList']").realHover({pointer:'mouse', position:'right'})
        cy.get("[data-cy='langList']").contains("French").click()
        cy.get("[data-cy='resourcesLink']").contains("Ressources")
    })
})