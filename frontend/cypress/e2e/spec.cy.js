describe('The Foods page functionality and login/logout', () => {
  it('should show main page, switch to login page, be able to login successfully and see edit button', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-cy=authenticate]').click()

    cy.url().should('include', '/auth')

    cy.get('[data-cy=email]').type('will@test.com')
    cy.get('[data-cy=password]').type('password')
    cy.get('[data-cy=login]').click()
    cy.url().should('include', '/')
    cy.get('[data-cy=edit]')
    cy.get('[data-cy=logout]').click()
    cy.get('body').then($body => {
      expect($body.find('[data-cy=edit]').length).to.equal(0)
    })
  })
}) 