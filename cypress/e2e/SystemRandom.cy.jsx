describe('Test the systematic random sampling calculator with subgroups', () => {
    beforeEach(() => {
      cy.visit("/sampling")
    })
  
    it('should show sample sizes for 3 subgroups', () => {
      cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'subgroup_qs.json' })
      cy.get("[data-cy='option-btn']").contains("Yes").click()
      cy.get("[id='population']").type("60")
  
      cy.get("[data-cy='subgroup-name']").type("Group one")
      cy.get("[data-cy='subgroup-size']").type("10")
      cy.get("[data-cy='addgroup-btn']").click()
  
      cy.get("[data-cy='group-inputs1']").find("[data-cy='subgroup-name']").type("Group two")
      cy.get("[data-cy='group-inputs1']").find("[data-cy='subgroup-size']").type("20")
      cy.get("[data-cy='group-inputs1']").find("[data-cy='addgroup-btn']").click()
  
      cy.get("[data-cy='group-inputs2']").find("[data-cy='subgroup-name']").type("Group three")
      cy.get("[data-cy='group-inputs2']").find("[data-cy='subgroup-size']").type("30")
  
      cy.get("[data-cy='submitgroups-btn']").click()
  
      cy.get("[id='margin']").type("5")
      cy.get("[id='response']").type("5")
      cy.get("[id='confidence']").type("90")
  
      cy.get("[data-cy='submitCalculator-btn']").click()
  
      cy.get("[data-cy='sampleSize']")
        .should('contain', 'Group one is 11')
        .and('contain', 'Group two is 21')
        .and('contain', 'Group three is 30')
    })
  
  })