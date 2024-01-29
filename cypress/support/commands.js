Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Sidnei')
    cy.get('#lastName').type('Junior')
    cy.get('#email').type('email@gmail.com') 
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum nunc id lacinia consequat. Nam venenatis nulla at sapien laoreet, eu vestibulum augue auctor.', ({
        delay:0
    }))
    cy.get('button[type="submit"]').click()

})