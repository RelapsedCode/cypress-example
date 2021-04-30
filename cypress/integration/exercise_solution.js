Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

    describe('ForkPoint task', () => {
    it('Add an item to the card.', () => {

        cy.visit('https://www.lyleandscott.com/uk/')
        cy.get('.menu-center > .menu-category > .mens > .has-sub-menu > span').should('be.visible').click()
        // Assertion - does it includes /mens
        cy.url().should('include', '/mens')

        // Click on the first one
        cy.get('ul.search-result-items>li').eq(0).should('be.visible').click() 
        
        // Get the L size. TO DO: Assertion that it is available.
        cy.get('.attribute.size > .value > .swatches > :nth-child(4) > .swatchanchor').should('be.visible').and('be.not.selected').click()
        cy.wait(500)

        // Getting data-masterid attribute's value
        cy.get('#product-content > div.product-number > span').invoke('attr', 'data-masterid').then(($masterid) => {
        
        //const masteridPD = $masterid

        // Add to bag
        cy.get('#add-to-cart').should('be.visible').click({force: true})
        cy.wait(500)

        // Cheking if the basket has any product or it is empty.
        cy.get('#mini-cart > div.mini-cart-total > a')

        // Click "View cart"
        cy.get('.mini-cart-link-cart').click()

        // Get the element's text and compared it to the value of data-masterid attr
        cy.get('#cart-table > tbody > tr > td.item-details > div > div.sku > span.value').then(($pdid) => {
        expect($pdid.text()).to.eq($masterid)
        })
    })
 
    // Check if the item id is the same as in the product page
    // Varifying if the product has class value and product ID number.
    cy.get('#cart-table > tbody > tr > td.item-details > div > div.sku > span.value').should('be.visible').should('have.class', 'value')

    // TO DO: Product ID not hardcoded - DONE.
    // NOTES: Responsive design - the nav bar hides.

  })
})