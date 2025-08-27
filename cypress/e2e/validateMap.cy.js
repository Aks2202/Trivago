const SEARCH_INPUT = "Berlin";

describe("Validate hotel markers in map", () => {
  beforeEach(() => {
    cy.log("Visit the main page and validate consent pop up");
    cy.visit("https://www.trivago.com");

    // Verify consent pop up if displayed
    cy.get("*")
      .shadow()
      .find("#deny") // or whatever is inside the shadow root
      .then(($consent) => {
        cy.wrap($consent).click({ force: true });
      });
  });

  it("should be possible to view map while searching the hotels in given location", () => {
    const SEARCH = '[data-testid="search-form-destination"]';
    cy.log("Enter the destination and select from suggested options");

    cy.get('[data-testid="search-form-destination"]')
      .clear()
      .type(SEARCH_INPUT)
      .should("have.value", SEARCH_INPUT);
    cy.get('[data-testid="search-suggestions"]').should("be.visible");

    cy.log("Validate that suggestions match SEARCH_INPUT");
    cy.get('[data-testid="suggestion-title"]')
      .should("not.be.hidden")
      .then(($searchResults) => {
        expect($searchResults).to.contain(SEARCH_INPUT);
        cy.wrap($searchResults)
          .parentsUntil("li")
          .first()
          .click({ force: true });
      });
    cy.get('[data-testid="search-button-with-loader"]').click({ force: true });

    // Validate Hotel list is displayed
    cy.get('[data-testid="accommodation-list-element"]').should("exist");

    cy.log(
      "Verify hotel markers are displayed and validate it matches the hotel count"
    );
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
