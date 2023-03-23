describe('Test the time-location sampling calculator', () => {
    beforeEach(() => {
      cy.visit("/sampling")
      cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'community_qs.json' })
    })
  
    it('should show correct sample size', () => {
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


describe('Test the alert for invalid input in time-location calculator', () => {
  beforeEach(() => {
    cy.visit("/sampling")
    cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'community_qs.json' })
    cy.get("[data-cy='option-btn']").contains("One").click()
  
    cy.get("[id='margin']").type("5")
    cy.get("[id='response']").type("5")
    cy.get("[id='confidence']").select("90")
    cy.get("[id='confidence']").should("have.value", "90")
    cy.get("[id='individuals']").type("2000")
    cy.get("[data-cy='submitCalculator-btn']").click()
  })

  const minInterviews = 10;
    const minDays = 3;
    const maxDays = 20;
    const minLocations = 2;
    const maxLocations = 15;


  it('should alert when days < 3', () => {
    cy.checkLowerBound("days", 3)
  })

  it('should alert when days > 20', () => {
    cy.checkUpperBound("days", 20)
  })

  it('should alert when locations < 2', () => {
    cy.checkLowerBound("locations", )
  })

  it('should alert when locations rate > 15', () => {
    cy.checkUpperBound("locations", 15)
  })

  it('should alert when interiews < 10', () => {
    cy.checkLowerBound("interviews", 10)
  })
})

describe('Test the simple random calculator individuals minimum', () => {
  beforeEach(() => {
    cy.visit("/sampling")
    cy.intercept(`https://ifrc-sampling.azurewebsites.net/api/decision-tree/1/`, { fixture: 'community_qs.json' })
  })

  it('should show correct sample size', () => {
    cy.get("[data-cy='option-btn']").contains("One").click()

    cy.get("[id='margin']").type("5")
    cy.get("[id='response']").type("5")
    cy.get("[id='confidence']").select("90")
    cy.get("[id='confidence']").should("have.value", "90")
    cy.get("[id='individuals']").type("199")
    cy.get("[data-cy='submitCalculator-btn']").click()
    cy.get("span").should("contain", "should be at least 200.")

    cy.get("[id='individuals']").clear().type("200")
    cy.get("[data-cy='submitCalculator-btn']").click()
    cy.get("[data-cy='alert']").should("not.exist")

  })

})