import Terminology from "../../src/components/Terminology";

describe('Test terminology and offcanvas', () => {
    beforeEach(() => {
        cy.mount(<Terminology term={"list frame"} text={"list frame"}/>)
    })
    it('check offcanvas pop out', () => {
        cy.get("u").click()
        cy.get("[data-cy='closeOffcanvasBtn']").should("be.visible")
    })
    it('check closing offcanvas', () => {
        cy.get("u").click()
        cy.get("[data-cy='closeOffcanvasBtn']").click()
        cy.get("[data-cy='closeOffcanvasBtn']").should("not.be.visible")
    })
})