    // cypress/e2e/home.cy.js

    describe("App Smoke - Home Shell", () => {
    beforeEach(() => {
        cy.visit("/"); // baseUrl is set in cypress.config.js
    });

    it("loads the home page successfully", () => {
        // basic sanity: root app renders
        cy.get("#root").should("exist");

        // hero or any known text from your homepage – keep 'Showcase' if it's correct
        cy.contains("Showcase").should("exist");
    });

    it("renders the main navbar items", () => {
        cy.contains("FindVirtual.me").should("exist");      // brand
        cy.contains("Creators").should("exist");            // nav item
        cy.contains("Job Seekers").should("exist");
        cy.contains("Dashboard").should("exist");
        cy.contains("Solutions").should("exist");
    });

    it("can navigate to creators /occupations", () => {
        cy.contains("Creators").click();
        cy.url().should("include", "/occupations");
    });

    it("can navigate to dashboard (unauthenticated shell)", () => {
        cy.contains("Dashboard").click();
        cy.url().should("include", "/dashboard");
        // page renders without crashing even if user not logged in
        cy.contains("My Portfolios").should("exist");
    });

    it("can open and close the login modal", () => {
        cy.contains("Log in / Sign up").click();
        cy.contains("Welcome").should("exist"); // from Auth.jsx heading
        cy.get("button[aria-label='Close']").click();
    });
    });
