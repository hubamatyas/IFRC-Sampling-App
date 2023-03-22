import SubgroupInput from "../../src/components/SubgroupInput";

describe('Test input fields of each calculators', () => {
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
})