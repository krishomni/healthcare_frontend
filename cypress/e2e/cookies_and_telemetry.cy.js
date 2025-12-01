    // cypress/e2e/cookies_and_telemetry.cy.js

    describe("FE-E2E-NAV-3 – Cookie consent, settings, and telemetry", () => {
    const bannerSnippet = "We use cookies to improve your experience";

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it("shows banner once when there is no consent and persists after Accept", () => {
        cy.visit("/");

        // Banner appears for fresh user
        cy.contains(bannerSnippet).should("exist");

        // Accept cookies (force because floating button can overlap)
        cy.contains("button", "Accept").click({ force: true });

        // Banner is gone
        cy.contains(bannerSnippet).should("not.exist");

        // Consent persisted
        cy.window().then((win) => {
        const cookies = win.document.cookie;
        expect(cookies).to.include("cookie_consent=accepted");
        expect(win.localStorage.getItem("cookieConsent")).to.equal("accepted");
        });

        // Reload: still no banner
        cy.reload();
        cy.contains(bannerSnippet).should("not.exist");
    });

    it("rejecting cookies hides the banner and persists the rejected state", () => {
        cy.visit("/");

        cy.contains(bannerSnippet).should("exist");

        cy.contains("button", "Reject").click({ force: true });

        cy.contains(bannerSnippet).should("not.exist");

        cy.window().then((win) => {
        const cookies = win.document.cookie;
        expect(cookies).to.include("cookie_consent=rejected");
        expect(win.localStorage.getItem("cookieConsent")).to.equal("rejected");
        });

        cy.reload();
        cy.contains(bannerSnippet).should("not.exist");
    });

    it("Cookie Settings reflects and updates consent", () => {
        cy.visit("/");

        cy.contains(bannerSnippet).should("exist");
        cy.contains("button", "Accept").click({ force: true });
        cy.contains(bannerSnippet).should("not.exist");

        // Open Cookie Settings (floating button)
        cy.contains("button", "Cookie Settings").click();

        // Check content inside the modal, not the button
        cy.contains(
        "We only use cookies to detect your general location"
        ).should("exist");
        cy.contains("Current choice:").should("exist");
        cy.contains("accepted").should("exist");

        // Change to rejected via settings
        cy.contains("button", "Reject").click({ force: true });

        // Open again -> now shows rejected
        cy.contains("button", "Cookie Settings").click();
        cy.contains("Current choice:").should("exist");
        cy.contains("rejected").should("exist");
    });

    it("Telemetry only sends events after consent is accepted", () => {
        cy.intercept("POST", "**/api/telemetry/visit").as("telemetry");

        cy.visit("/");

        // No consent yet => no telemetry
        cy.wait(300);
        cy.get("@telemetry.all").should("have.length", 0);

        // Accept via banner
        cy.contains(bannerSnippet).should("exist");
        cy.contains("button", "Accept").click({ force: true });

        // Now we should see at least one telemetry event
        cy.wait("@telemetry");
        cy.get("@telemetry.all").then((calls) => {
        expect(calls.length).to.be.greaterThan(0);
        });
    });
    });
