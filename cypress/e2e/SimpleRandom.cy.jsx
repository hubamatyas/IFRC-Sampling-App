describe('Test the simple random sampling calculator', () => {
  beforeEach(() => {
    cy.visit("/sampling")
  })

  it('should show sample sizes for no subgroups', () => {
    cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'subgroup_simple.json' })
    cy.get("[data-cy='option-btn']").contains("No").click()

    cy.get("[id='margin']").type("5")
    cy.get("[id='response']").type("5")
    cy.get("[id='confidence']").select("90")
    cy.get("[id='confidence']").should("have.value", "90")
    cy.get("[id='individuals']").type("200")
    cy.get("[data-cy='submitCalculator-btn']").click()

    cy.get("[data-cy='sampleSize']").should("contain", "Sample size: 122")
  })


  it('should show sample sizes for 3 subgroups', () => {
    cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'subgroup_simple.json' })
    cy.get("[data-cy='option-btn']").contains("Yes").click()
    // customed command "inputSubgroupData" is defined in cypress/support/commands.js
    cy.inputSubgroupData([10,20,30])
    cy.get("[data-cy='submitgroups-btn']").click()

    cy.get("[id='margin']").type("5")
    cy.get("[id='response']").type("5")
    cy.get("[id='confidence']").select("90")
    cy.get("[id='confidence']").should("have.value", "90")
    cy.get("[data-cy='submitCalculator-btn']").click()

    cy.checkResult([11,20,29])
  })

})