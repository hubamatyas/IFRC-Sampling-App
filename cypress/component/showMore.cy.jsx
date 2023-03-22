
import React from 'react'
import ShowMore from "../../src/components/ShowMore";


describe('Test subgroup input form', () => {
    beforeEach(() => {
        const content = <div><p>definitionsListframe1</p><p>definitionsListframe2</p></div>;
        cy.mount(<ShowMore 
            title={"List frame"}
            content={content}
        />)
    })
    it('check offcanvas pop out', () => {
        cy.get("button").click()
        cy.get("div").contains("definitionsListframe2").should('exist')
        cy.get('button').should('contain', 'less')
    })
    it('check closing offcanvas', () => {
        cy.get("button").click()
        cy.get("button").click()
        cy.get("div").contains("definitionsListframe2").should('not.exist')
        cy.get('button').should('contain', 'more')
    })
})