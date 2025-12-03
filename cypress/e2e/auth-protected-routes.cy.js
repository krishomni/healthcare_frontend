    // cypress/e2e/auth-protected-routes.cy.js
    /// <reference types="cypress" />

    // Ignore network-level Axios errors when backend is down.
    // We still assert all the routing + UI behavior we care about.
    Cypress.on("uncaught:exception", (err) => {
    if (err && err.message && err.message.includes("Network Error")) {
        // returning false here prevents Cypress from failing the test
        return false;
    }
    // Let all other errors fail the test as normal
    return true;
    });

    const visitAsGuest = (path = "/") => {
    cy.visit(path, {
        onBeforeLoad(win) {
        // Avoid cookie banner interfering with UI
        win.localStorage.setItem("cookieConsent", "accepted");

        // Ensure no auth state
        win.localStorage.removeItem("token");
        win.localStorage.removeItem("email");
        win.localStorage.removeItem("userId");
        },
    });
    };

    const visitAsUser = (path, { email, role }) => {
    // Stub /user/me so AuthContext can resolve user without real backend
    cy.intercept("GET", "**/user/me", {
        statusCode: 200,
        body: {
        user: {
            _id: "test-user-id",
            email,
            role, // "user", "admin", "vendor", etc.
        },
        },
    }).as("getMe");

    cy.visit(path, {
        onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted");

        // AuthContext reads token + email from localStorage on start
        win.localStorage.setItem("token", "fake-token");
        win.localStorage.setItem("email", email);
        },
    });

    cy.wait("@getMe");
    };

    describe("FE-E2E-AUTH-4 – Protected routes", () => {
    // -------------------------------------------------------------------
    // Admin-only route: /itadmin/ticketing-system (protected with AdminRoute)
    // -------------------------------------------------------------------
    context("Admin-only route: /itadmin/ticketing-system", () => {
        it("redirects unauthenticated users from admin route back to home", () => {
        // No token in storage
        visitAsGuest("/itadmin/ticketing-system");

        // AdminRoute: if !token → Navigate to "/"
        cy.location("pathname").should("eq", "/");

        // Navbar in guest state: login button visible
        cy.contains("button", "Log in / Sign up").should("be.visible");
        });

        it("prevents non-admin authenticated users from accessing admin route", () => {
        // Simulate a logged-in user WITHOUT admin role
        visitAsUser("/itadmin/ticketing-system", {
            email: "user@example.com",
            role: "user",
        });

        // AdminRoute: token present, but user.role !== "admin" → back to "/"
        cy.location("pathname").should("eq", "/");

        // We are still "logged in" from the app's perspective
        cy.contains("button", "Profile").should("exist");
        cy.contains("button", "Logout").should("exist");
        });

        it("allows admin user to access the admin ticketing dashboard", () => {
        // Simulate admin user
        visitAsUser("/itadmin/ticketing-system", {
            email: "admin@example.com",
            role: "admin",
        });

        // We should stay on the admin route
        cy.location("pathname").should("eq", "/itadmin/ticketing-system");

        // TicketingPage heading
        cy.contains("Ticket Board").should("be.visible");
        });
    });

    // -------------------------------------------------------------------
    // Vendor/user dashboard route: /dashboard
    // -------------------------------------------------------------------
    context("Vendor/user dashboard route: /dashboard", () => {
        it("shows public-only view for guests (no personal portfolios section)", () => {
        visitAsGuest("/dashboard");

        cy.location("pathname").should("eq", "/dashboard");

        // Dashboard accessible, but only public view
        cy.contains("Public Portfolios").should("be.visible");
        cy.contains("My Portfolios").should("not.exist");
        });

        it("shows personal sections for logged-in users (vendor or regular)", () => {
        // Stub all Dashboard-related backend GETs to avoid real network errors
        cy.intercept("GET", "**/api/portfolios/all-portfolios*", {
            statusCode: 200,
            body: [],
        }).as("getAllPortfolios");

        cy.intercept("GET", "**/api/handyman-template*", {
            statusCode: 200,
            body: [],
        }).as("getHandyman");

        cy.intercept("GET", "**/vendor*", {
            statusCode: 200,
            body: [],
        }).as("getVendors");

        cy.intercept("GET", "**/api/publicProjects*", {
            statusCode: 200,
            body: { success: true, projects: [] },
        }).as("getPublicProjects");

        cy.intercept("GET", "**/api/projects*", {
            statusCode: 200,
            body: [],
        }).as("getProjects");

        // Now simulate a logged-in vendor/regular user
        visitAsUser("/dashboard", {
            email: "vendor@example.com",
            role: "vendor",
        });

        cy.location("pathname").should("eq", "/dashboard");

        // Logged-in users see personal sections
        cy.contains("My Portfolios").should("be.visible");
        cy.contains("My Projects").should("be.visible");
        });
    });
    });
