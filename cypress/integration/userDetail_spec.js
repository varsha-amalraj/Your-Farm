describe('Cypress demo', () => {
  it('user detail scenario', () => {
    cy.visit('/user-detail')
    cy.get('input#dateRange').type('06/02/2021 - 07/12/2021')
    cy.get('div.buttons > div > button[type="button"]').click()
    cy.get('div.col-4 > button[type="button"]').click()
    cy.wait(5000)
    cy.get('div > a').click()
  })
})
