describe('Cypress demo', () => {
  it('Send message scenario', () => {
    cy.visit('/send-message')
    const filepath = '/images/test.png'
    cy.get('img#preview-image').attachFile(filepath)
    cy.get('input[type="file"]').attachFile(filepath)
    cy.get('div.form-group.col-3 > button[type="button"]').click()
    cy.wait(5000)
    cy.get('input#frameMessageId').type('This is a test farm')
    cy.get('input#frameCodeId').type('12345')
    cy.get('div.form-group.ng-star-inserted > button[type="button"]').click()
  })
})
