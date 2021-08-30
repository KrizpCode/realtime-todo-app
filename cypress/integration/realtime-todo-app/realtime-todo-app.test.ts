/// <reference types="cypress" />

describe('Basic tests', () => {

    it('Webpage loads and redirects to login', () => {
        cy.visit('http://localhost:3000')
        cy.url().should('include', '/login')
    })

    it('Login page looks good and loads correctly', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Sign In').should('exist')
        cy.contains('Forgot password?').should('exist')
        cy.contains('Create account').should('exist')
    })

    it('Login page Forgot-password link works and going back', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Forgot password?').click()

        cy.url().should('include', '/forgot-password')
        cy.contains('Password Reset').should('exist')
        cy.contains('Reset Password').should('exist')
        cy.contains('Login').click()

        cy.url().should('include', '/login')
    })

    it('Login page Create account link works and going back', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Create account').click()

        cy.url().should('include', '/registration')
        cy.contains('Sign Up').should('exist')
        cy.contains('Login').click()

        cy.url().should('include', '/login')
    })

    it('Login should error when wrong input', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input#email').type('notAnEmail@wrong.se')
        cy.get('input#password').type('123123')

        cy.contains('Sign In').click()

        cy.contains('There is no user record corresponding to this identifier. The user may have been deleted.').should('exist')
    })

    it('Login should work correctly', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('input#email').type('juhaniish@live.se')
        cy.get('input#password').type('123123')

        cy.contains('Sign In').click()
        cy.contains('Logged in as: juhaniish@live.se').should('exist')
    })

    it('Homepage should render and work correctly', () => {
        cy.contains('My To-Do Lists').should('exist')
        cy.contains('Shopping List').should('exist')
        cy.contains('Lists Shared With Me').should('exist')
        cy.contains('There is currently no shared lists with you').should('exist')

        cy.get('#inputTitle').type('First To-Do List')
        cy.contains('+').click()
        cy.contains('First To-Do List').should('exist')
        cy.get('.remove-button').each(($btn, index) => {
            if (index >= 1) cy.wrap($btn).click();
        })
        cy.contains('First To-Do List').should('not.exist')
    })

    it('Should work to go to list from homepage and render correctly', () => {
        cy.contains('Shopping List').click()

        cy.contains('Shopping List').should('exist')
        cy.contains('Members').should('exist')
        cy.contains('juhaniish@live.se').should('exist')

        cy.contains('Buy energy drink').should('exist')
    })

    it('To-Do List should work correctly', () => {
        cy.get('.add-todo-input').type('Buy bananas')
        cy.get('.active').click()

        cy.contains('Buy bananas').should('exist')

        cy.get('.remove-button').each(($btn, index) => {
            if (index === 5) cy.wrap($btn).click();
        })
        cy.contains('Buy bananas').should('not.exist')

        cy.contains('3 out of 5 completed').should('exist')
    })

    it('Adding a member incorrectly should give error', () => {
        cy.get('#inputTitle').type('notAnEmail')
        cy.get('.active').click()
        cy.contains('Please provide an valid email').should('exist')
    })

    it('Clicking navbar-icon should return to homepage', () => {
        cy.get('.navbar-icon').click()
        cy.contains('My To-Do Lists').should('exist')
    })

    it('Clicking navbar profile-icon should go to update profile and render correctly', () => {
        cy.get('.navbar__edit-profile-icon').click()

        cy.url().should('include', '/update-profile')
        cy.contains('Update Profile').should('exist')

        cy.contains('Cancel').click()
        cy.contains('My To-Do Lists').should('exist')
    })

    it('Signing out should return to login-page again', () => {
        cy.get('.signout-button').click()
        cy.url().should('include', '/login')
    })
})