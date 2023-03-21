describe('Test the time-location sampling calculator', () => {
    beforeEach(() => {
      cy.visit("/sampling")
      cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'community_qs.json' })
      cy.get("[data-cy='option-btn']").contains("Two or more").click()
    })
  
    it('should show correct sample size', () => {
      // in question card component
      cy.get("[id='communities']").type("3")
      cy.get("[id='margin']").type("5")
      cy.get("[id='confidence']").select("90")
      cy.get("[id='confidence']").should("have.value", "90")
      cy.inputCommunities([1000,2000,3000])
      cy.get("[data-cy='submitCluster-btn']").click()

       cy.checkResult(["Community No.1","Community No.2","Community No.3"])
    })
  
  })