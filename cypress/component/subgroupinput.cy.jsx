import SubgroupInput from "../../src/components/SubgroupInput";


describe('Test subgroup input form', () => {
    beforeEach(() => {
        cy.mount(<SubgroupInput onSubmitSubgroups={()=>{}}/>)
    })

    it('check only one group input initially', () => {
      cy.get("[data-cy='group-inputs0']").should("exist")
      cy.get("[data-cy='group-inputs1']").should("not.exist")
    })

    it('check total population is 0 initially', () => {
        cy.get("h3").contains("0")
    })

    it('check adding a group', () => {
        cy.get("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs1']").should("exist")
    })

    it('check deleting a group', () => {
        cy.get("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs1']").should("exist")
        cy.get("[data-cy='group-inputs0']").find("[data-cy='deletegroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").should("not.exist")
        cy.get("[data-cy='group-inputs1']").should("exist")
    })

    it('check disabled button when only one group', () => {
        cy.get("[data-cy='deletegroup-btn']").should('be.disabled')
    })

    it('check for alert when negative group size', () => {
        cy.get("[data-cy='subgroup-size']").type('-1')
        cy.get("[data-cy='addgroup-btn']").click()
        cy.get("span").should("contain", "must be larger than zero")
    })

    it('check for summing up group size', () => {
        cy.get("[data-cy='group-inputs0']").find("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").find("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").find("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").find("[data-cy='subgroup-size']").type('1')
        cy.get("[data-cy='group-inputs1']").find("[data-cy='subgroup-size']").type('2')
        cy.get("[data-cy='group-inputs2']").find("[data-cy='subgroup-size']").type('3')
        cy.get("h3").contains("6")
    })

    it('check for reducing group size', () => {
        cy.get("[data-cy='group-inputs0']").find("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").find("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").find("[data-cy='addgroup-btn']").click()
        cy.get("[data-cy='group-inputs0']").find("[data-cy='subgroup-size']").type('1')
        cy.get("[data-cy='group-inputs1']").find("[data-cy='subgroup-size']").type('2')
        cy.get("[data-cy='group-inputs2']").find("[data-cy='subgroup-size']").type('3')
        cy.get("[data-cy='group-inputs0']").find("[data-cy='deletegroup-btn']").click()
        cy.get("h3").contains("5")
    })

})