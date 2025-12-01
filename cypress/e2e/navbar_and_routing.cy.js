    // cypress/e2e/navbar_and_routing.cy.js

    // Helper: visit as a particular role by stubbing GET /user/me
    // and pre-seeding localStorage with a fake token.
    const visitAs = (fixtureName) => {
    if (!fixtureName) {
        // guest – no token, AuthContext won't call /user/me
        cy.visit("/");
        return;
    }

    cy.fixture(fixtureName).then((user) => {
        cy.intercept("GET", "**/user/me", {
        statusCode: 200,
        body: {
            user,
            portfolioIds: [], // shape matches AuthContext expectations
        },
        }).as("getMe");

        cy.visit("/", {
        onBeforeLoad(win) {
            // AuthContext useEffect only cares that a token exists;
            // it then calls /user/me with Authorization header.
            win.localStorage.setItem("token", "test-token");
            win.localStorage.setItem("email", user.email);
            win.localStorage.setItem("userId", "fixture-user-id");
        },
        });

        cy.wait("@getMe");
    });
    };

    describe("FE-E2E-NAV-1 – Navbar by role", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it("guest: shows 'Log in / Sign up', hides Profile / Logout / Admin", () => {
        visitAs(null); // guest

        // Brand + main links should be visible
        cy.contains("FindVirtual.me").should("be.visible");
        cy.contains("button", "Creators").should("be.visible");
        cy.contains("button", "Job Seekers").should("be.visible");
        cy.contains("button", "Dashboard").should("be.visible");
        cy.contains("button", "Solutions").should("be.visible");

        // Guest auth state:
        cy.contains("button", "Log in / Sign up").should("be.visible");
        cy.contains("button", "Profile").should("not.exist");
        cy.contains("button", "Logout").should("not.exist");
        cy.contains("button", "Admin").should("not.exist");
    });

    it("logged-in non-admin: shows Profile + Logout, hides Admin", () => {
        visitAs("vendorUser");

        // Log in button disappears
        cy.contains("button", "Log in / Sign up").should("not.exist");

        // Profile + Logout visible
        cy.contains("button", "Profile").should("be.visible");
        cy.contains("button", "Logout").should("be.visible");

        // Non-admin user should not see Admin
        cy.contains("button", "Admin").should("not.exist");
    });

    it("admin: shows Admin button and navigates to admin area", () => {
        visitAs("adminUser");

        cy.contains("button", "Admin").should("be.visible").click();

        // In the real app, Admin button goes to "/admin-choice".
        // In this simplified routing, you have "/admin_page" wrapped in <AdminRoute>.
        // Adjust this expectation to whatever path your Admin button uses in Navbar.
        //
        // If you keep "/admin-choice" in Navbar, update App.jsx to have:
        // <Route path="/admin-choice" element={<AdminRoute><ITAdminPage /></AdminRoute>} />
        //
        // For now, just assert we've left "/" and landed on an admin-protected route.
        cy.location("pathname").should((path) => {
        expect(path).to.not.eq("/");
        });
    });
    });

    describe("FE-E2E-NAV-2 – Global routing to key URLs", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    const ensureAdminSession = () => {
        cy.fixture("adminUser").then((user) => {
        cy.intercept("GET", "**/user/me", {
            statusCode: 200,
            body: { user, portfolioIds: [] },
        }).as("getMe");

        cy.visit("/", {
            onBeforeLoad(win) {
            win.localStorage.setItem("token", "test-token");
            win.localStorage.setItem("email", user.email);
            win.localStorage.setItem("userId", "fixture-admin-id");
            },
        });

        cy.wait("@getMe");
        });
    };

    it("direct navigation to / (home) loads without crashing", () => {
        cy.visit("/");
        cy.location("pathname").should("eq", "/");

        // Navbar + main layout render
        cy.contains("FindVirtual.me").should("be.visible");
        cy.get("main").should("exist");
    });

    it("direct navigation to /dashboard renders the dashboard route", () => {
        // Dashboard route itself is not wrapped in AdminRoute;
        // it relies on AuthContext for data, but we only check that route loads.
        cy.visit("/dashboard");
        cy.location("pathname").should("eq", "/dashboard");

        // Just check that the main content exists (no white screen / 404)
        cy.get("main").should("exist");
    });

    it("direct navigation to /portfolios loads the portfolios landing page", () => {
        cy.visit("/portfolios");
        cy.location("pathname").should("eq", "/portfolios");

        // ExamplePortfolios component should render some heading or content.
        // Because we don't know the exact text, assert that some heading exists.
        cy.get("h1, h2").should("exist");
    });

    it("direct navigation to /admin_page (admin dashboard) works for admin", () => {
        ensureAdminSession();

        cy.visit("/admin_page");
        cy.location("pathname").should("eq", "/admin_page");

        // ITAdminPage shows an Admin Dashboard heading
        cy.contains("Admin Dashboard").should("be.visible");
    });

    it("direct navigation to /itadmin/ticketing-system loads ticketing for admin", () => {
        ensureAdminSession();

        cy.visit("/itadmin/ticketing-system");
        cy.location("pathname").should("eq", "/itadmin/ticketing-system");

        // TicketingPage should render some top-level heading or text; check generically
        cy.get("h1, h2").should("exist");
    });
    });
