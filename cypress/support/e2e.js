    // cypress/support/e2e.js

    import "./commands";

    // 🔁 Global hooks to keep tests isolated
    beforeEach(() => {
    // clear browser storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();

    // optional: clear any known IndexedDB DBs if you use them
    // cy.window().then((win) => {
    //   win.indexedDB.deleteDatabase("localforage");
    // });

    // optional custom helper if we add it:
    if (Cypress._.isFunction(cy.resetAppState)) {
        cy.resetAppState();
    }
    });

    afterEach(() => {
    // place for future global teardown if needed
    });
