/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Sidnei')
        cy.get('#lastName').type('Junior')
        cy.get('#email').type('email@gmail.com') 
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum nunc id lacinia consequat. Nam venenatis nulla at sapien laoreet, eu vestibulum augue auctor.', ({
            delay:0
        }))
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#email').type('email123') 
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não numerico', function() {
        cy.get('#phone')
        .type('aaaa') 
        .should('have.value', '')
        
    })

    
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Sidnei')
        cy.get('#phone-checkbox').click()
        cy.get('#lastName').type('Junior')
        cy.get('#email').type('email@gmail.com') 
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum nunc id lacinia consequat. Nam venenatis nulla at sapien laoreet, eu vestibulum augue auctor.', ({
            delay:10
        }))

        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
       
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('sidnei').should('have.value', 'sidnei').clear().should('have.value', '')
        cy.get('#lastName').type('segatto').should('have.value', 'segatto').clear().should('have.value', '')
        cy.get('#email').type('sidnei@gmail.com').should('have.value', 'sidnei@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('123456').should('have.value', '123456').clear().should('have.value', '')
        cy.get('#phone-checkbox').click()

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('chamado envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('select').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get(':nth-child(4) > input').check().should('have.value', 'feedback')
    })


    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').check().should('be.checked')
    })

    it.only('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check().last().uncheck()
    })
    
  })