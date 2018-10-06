describe('Does it Float?', function() {
  it('submits a prediction', function() {
    cy.visit('') 
		cy.get('[data-cy=select]').select('Age')
		cy.get('[data-cy=train]').click()
		cy.get('[data-cy=predictvalue').type(30)
		cy.get('[data-cy=submit-button').click()
		cy.get('[data-cy=result').should('have.css', 'display', 'block')
	})
})