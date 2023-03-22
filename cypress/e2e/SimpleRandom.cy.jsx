describe('Test the simple random sampling calculator result', () => {
  beforeEach(() => {
    cy.visit("/sampling")
    cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'subgroup_qs_simple.json' })
  })

  it('should show sample sizes for no subgroups', () => {
    
    cy.get("[data-cy='option-btn']").contains("No").click()
    cy.get("[id='margin']").type("5")
    cy.get("[id='response']").type("5")
    cy.get("[id='confidence']").select("90")
    cy.get("[id='confidence']").should("have.value", "90")
    cy.get("[id='individuals']").type("200")
    cy.get("[data-cy='submitCalculator-btn']").click()

    cy.get("[data-cy='sampleSize']").should("contain", "122")
  })


  it('should show sample sizes for 3 subgroups', () => {
    cy.get("[data-cy='option-btn']").contains("Yes").click()
    cy.inputSubgroupData([10,20,30])
    cy.get("[data-cy='submitgroups-btn']").click()

    cy.get("[id='margin']").type("5")
    cy.get("[id='response']").type("5")
    cy.get("[id='confidence']").select("90")
    cy.get("[id='confidence']").should("have.value", "90")
    cy.get("[data-cy='submitCalculator-btn']").click()

    cy.checkResult([11,20,29])
  })

  it('should show sample sizes for 3 subgroups', () => {
    cy.get("[data-cy='option-btn']").contains("Yes").click()
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


describe('Test the alert for invalid input', () => {
  beforeEach(() => {
    cy.visit("/sampling")
    cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'subgroup_qs_simple.json' })
    cy.get("[data-cy='option-btn']").contains("No").click()
  })

  it('should alert when margin of error < 1', () => {
    cy.checkLowerBound("margin", 1)
  })

  it('should alert when margin of error > 20', () => {
    cy.checkUpperBound("margin", 20)
  })

  it('should alert when individuals number < 1', () => {
    cy.checkLowerBound("individuals", 1)
  })

  it('should alert when non-response rate < 0', () => {
    cy.checkLowerBound("response", 0)
  })

  it('should alert when non-response rate > 80', () => {
    cy.checkUpperBound("response", 80)
  })

})