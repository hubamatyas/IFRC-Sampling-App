describe('Test the time-location sampling calculator', () => {
    beforeEach(() => {
      cy.visit("/sampling")
      cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'community_qs.json' })
    })
  
    it('should show correct sample size', () => {
      // in question card component
      cy.get("[data-cy='option-btn']").contains("One").click()
  
      cy.get("[id='margin']").type("5")
      cy.get("[id='response']").type("5")
      cy.get("[id='confidence']").select("90")
      cy.get("[id='confidence']").should("have.value", "90")
      cy.get("[id='individuals']").type("2000")
      cy.get("[data-cy='submitCalculator-btn']").click()

      cy.get("[id='locations']").type("4")
      cy.get("[id='days']").type("14")
      cy.get("[id='interviews']").type("20")
      cy.get("[data-cy='submitTimeLocation-btn']").click()
    
      cy.get("[data-cy='sampleSize']").should("contain", "Location 4")
      cy.checkResult(["Location 1","Location 2","Location 3","Location 4"])
    })
  
  })