describe('Cypress demo', () => {
  it('login scenario', () => {
    cy.visit('/')
    cy.get('input#mobileNumber').type('9000000001')
    cy.get('input#password').type('12345')
    cy.get('button[type="button"]').click()
    cy.contains('Login')
  })
})
