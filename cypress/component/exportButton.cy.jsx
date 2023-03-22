import ExportButton from "../../src/components/ExportButton";

describe('Test subgroup input form', () => {
    beforeEach(() => {
        cy.mount(<ExportButton/>)
    })

    it('check export note btn not visible', () => {
        cy.get("button").contains("Export now").should("not.be.visible")
    })

    it('check export note btn shown when button clicked', () => {
        cy.get("[data-cy='exportBtn']").click()
        cy.get("button").contains("Export now").should("be.visible")
    })

    it('check textarea hiden when radio button clicked', () => {
        cy.get("[data-cy='exportBtn']").click()
        cy.get("[value='No']").click()
        cy.get("textarea").should("not.be.visible")
    })

    it('check textarea shown when radio button clicked', () => {
        cy.get("[data-cy='exportBtn']").click()
        cy.get("[value='No']").click()
        cy.get("[value='Yes']").click()
        cy.get("textarea").should("be.visible")
    })
})