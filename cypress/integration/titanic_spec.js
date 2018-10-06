describe('Does it Float?', function() {
  it('Visits the Titanic Predctor', function() {
    cy.visit('localhost:3000') // also set as baseURL in a config file
	})
	
	it('selects some stuff', () => {
		cy.get('[data-cy=select]').select('Age')
	})
})