import { generateLegacyURL } from "@maas-ui/maas-ui-shared";

context("Controller listing", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(generateLegacyURL("/controllers"));
  });

  it("renders the correct heading", () => {
    cy.get("[data-testid='section-header-title']").contains("Controllers");
  });

  it("highlights the correct navigation link", () => {
    cy.get(".p-navigation__link.is-selected a").should(
      "have.attr",
      "href",
      generateLegacyURL("/controllers")
    );
  });
});
