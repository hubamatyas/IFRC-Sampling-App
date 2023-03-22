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
      cy.get("[data-cy='submitCalculator-btn']").click()

       cy.checkResult(["Community No.1","Community No.2","Community No.3"])
    })
  
  })

  describe('Test the alert for invalid input', () => {
    beforeEach(() => {
      cy.visit("/sampling")
      cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'community_qs.json' })
      cy.get("[data-cy='option-btn']").contains("Two or more").click()
    })
  
    it('should alert when margin of error < 1', () => {
      cy.checkLowerBound("margin", 1)
    })

    it('should alert when margin of error > 20', () => {
      cy.checkUpperBound("margin", 20)
    })

    it('should alert when community number < 1', () => {
      cy.checkLowerBound("communities", 1)
    })
    
    it('should alert when community number > 20', () => {
      cy.checkUpperBound("communities", 20)
    })

    it('should alert when size of a community < 1000', () => {
      cy.get("[id='communities']").type("2")
      cy.inputCommunities([1000])
      cy.get("[data-cy='submitCalculator-btn']").click()
      cy.get("[data-cy='alert']").should("not.exist")
  
      cy.inputCommunities([0,999])
      cy.get("[data-cy='submitCalculator-btn']").click()
      cy.get("span").should("contain", " at least 1000.")
    })
  
  })