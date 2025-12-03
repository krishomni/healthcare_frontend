    // cypress/e2e/auth-login.cy.js
    /// <reference types="cypress" />

    const VALID_EMAIL = "e2e_login@example.com";
    const VALID_PASSWORD = "Password123!";

    const withCookieConsent = (path = "/") => {
    cy.visit(path, {
        onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted");
        },
    });
    };

    describe("Auth – Login flows", () => {
    beforeEach(() => {
        // Stub backend /user/login for ALL tests in this file
        cy.intercept("POST", "**/user/login", (req) => {
        const { email, password } = req.body || {};

        // ✅ Happy path: valid credentials
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            return req.reply({
            statusCode: 200,
            body: {
                token: "fake-token",
                user: {
                _id: "user-1",
                email: VALID_EMAIL,
                role: "user",
                },
            },
            });
        }

        // ❌ Anything else → invalid credentials
        return req.reply({
            statusCode: 401,
            body: {
            message: "Invalid credentials",
            },
        });
        }).as("loginRequest");
    });

    // -----------------------------------------
    // FE-E2E-AUTH-1 – Login happy path
    // -----------------------------------------
    it("logs in with valid credentials, goes to profile, and navbar reflects logged-in state", () => {
        withCookieConsent("/");

        // Open login modal from Navbar ("Log in / Sign up" button) 
        cy.contains("button", "Log in / Sign up").click();

        // Fill login form (Auth.jsx fields) 
        cy.get('input[name="email"]').type(VALID_EMAIL);
        cy.get('input[name="password"]').type(VALID_PASSWORD);

        cy.contains("button", "Sign In").click();

        // Wait for our stubbed backend call to complete
        cy.wait("@loginRequest");

        // Auth.jsx navigates to /profile on success 
        cy.location("pathname").should("eq", "/profile");

        // ✅ Navbar should now show logged-in state (Profile + Logout present)
        // and login button hidden 
        cy.contains("button", "Profile").should("exist");
        cy.contains("button", "Logout").should("exist");
        cy.contains("button", "Log in / Sign up").should("not.exist");
    });

    // -----------------------------------------
    // FE-E2E-AUTH-2 – Login validation & errors
    // -----------------------------------------

    it("prevents submission with empty fields and keeps user on the same page", () => {
        withCookieConsent("/");
        cy.contains("button", "Log in / Sign up").click();

        // Don't type anything
        cy.contains("button", "Sign In").click();

        // Browser-level required validation keeps us on "/"
        cy.location("pathname").should("eq", "/");

        // No token should be stored
        cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
        });
    });

    it("shows browser-level invalid state on malformed email", () => {
        withCookieConsent("/");
        cy.contains("button", "Log in / Sign up").click();

        cy.get('input[name="email"]').type("not-an-email");
        cy.get('input[name="password"]').type(VALID_PASSWORD);

        cy.contains("button", "Sign In").click();

        // HTML5 email validity
        cy.get('input[name="email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
        });

        // No token stored
        cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
        });
    });

    it("shows inline error on wrong credentials and does not log the user in", () => {
        withCookieConsent("/");
        cy.contains("button", "Log in / Sign up").click();

        // These will go through our intercept and be treated as invalid creds
        cy.get('input[name="email"]').type("wrong@example.com");
        cy.get('input[name="password"]').type("WrongPass123!");

        cy.contains("button", "Sign In").click();

        cy.wait("@loginRequest");

        // Auth.jsx sets "Invalid Credentials" on login failure 
        cy.contains("Invalid Credentials").should("be.visible");

        // Still on home page
        cy.location("pathname").should("eq", "/");

        // Still no token
        cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
        });
    });
    });
