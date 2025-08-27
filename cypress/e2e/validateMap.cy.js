const SEARCH_INPUT ='Berlin'
describe("Validate hotel markers in map", () => {
  beforeEach(() => {
    cy.log("Visit the main page and validate consent pop up")
    cy.visit("https://www.trivago.com");
    cy.get("*").shadow({timeout:20000}).find("#deny").click();
  });

  it("should be possible to view map while searching the hotels in given location", () => {
    cy.log("Enter the destination and select from suggested options")
    cy.get('[data-testid="search-form-destination"]',{timeout:20000}).clear().type(SEARCH_INPUT);
    cy.get('[data-testid="search-suggestions"]').should("be.visible");

    cy.log('Validate that suggestions match SEARCH_INPUT')
    cy.get('[data-testid="suggestion-title"]')
      .should("be.visible")
      .then(($searchResults) => {
        expect($searchResults).to.contain(SEARCH_INPUT);
        cy.get($searchResults).first().click({ force: true });
        cy.get("[data-testid=search-form-destination]").should(
          "have.value",
          "Berlin"
        );
      });
    cy.get('[data-testid="search-button-with-loader"]').click();

    // Validate Hotel list is displayed 
    cy.get('[data-testid="accommodation-list-element"]').should("exist");

    cy.log("Verify hotel markers are displayed and validate it matches the hotel count")
    cy.get('[data-testid="map-container"]').should("be.visible");
    cy.get('[data-testid="map-marker"]')
      .should("be.visible")
      .then((mapMarkers) => {
        const hotelMarkers = mapMarkers.length;

        // fetch the count of 'expected prices' and assert that it matches the hotel count
        cy.get('[data-testid="expected-price"]').should(
          "have.length",
          hotelMarkers
        );
      });
  });
});
