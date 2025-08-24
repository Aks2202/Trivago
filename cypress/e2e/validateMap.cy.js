describe('Validate map', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('https://www.trivago.com'); 
cy.get('*').shadow().find('#deny').click()
});
  it('should be possible to view map when searching in particular location', () => {
  cy.get('[data-testid="search-form-destination"]').clear().type('berlin');
  cy.get('[data-testid="search-suggestions"]').should('be.visible');
  cy.get('[data-testid="suggestion-title"]').should('be.visible').then(($searchResults)=>{
expect($searchResults).to.contain('Berlin')
cy.get($searchResults).first().click({force:true})
cy.get('[data-testid=search-form-destination]').should('have.value','Berlin')
       })
  cy.get('[data-testid="search-button-with-loader"]').click();
//   cy.get('[data-testid="view-map-button"]',{timeout:20000}).click();
   
// const today = new Date() // get today's date
// const tomorrow = new Date(today)
//       cy.get('[data-testid="search-form-calendar-checkin-value"]').invoke('text',today)
//        cy.get('[data-testid="search-form-calendar-checkout-value"]').invoke('text',tomorrow)

       cy.get('[data-testid="accommodation-list-element"]').should('exist')
   cy.get('[data-testid="map-container"]').should('be.visible');
    cy.get('[data-testid="map-marker"]').should('be.visible').then((markers) => {
  const hotelCount = markers.length;
    // Get the number of expected prices and assert that it matches the hotel count
  cy.get('[data-testid="expected-price"]').should('have.length', hotelCount);

});
});
});
