import React from 'react';
import {mount} from "cypress/react18";
import CounterComponent from "./counter";


describe('Counter Component', () => {
    beforeEach(() => {
        mount(<CounterComponent />);
    });

    afterEach(function() {
        // Test fail olduğunda screenshot al
        if (this.currentTest.state === 'failed') {
          cy.screenshot(`${this.currentTest.title} (failed)`, {
            capture: 'viewport',
            overwrite: true
          });
        }
      });
    

    it('renders and increments count @counter', () => {
        cy.get('h1').should('contain', 'Counter: 0');
        cy.get('p').should('contain', 'The count is zero.');

        cy.get('button').contains('Increment').click();
        cy.wait(500)
        cy.get('h1').should('contain', 'Counter: 1');
        cy.wait(500)
        cy.get('button').contains('Increment').click();
        cy.get('h1').should('contain', 'Counter: 2');
        cy.get('p').should('contain', 'The count is positive.');

        cy.wait(1000)

    });

    it('decrements count', () => {
        cy.get('button').contains('Increment').click(); // Increment to 1
        cy.get('h1').should('contain', 'Counter: 1');
        cy.wait(500)
        cy.get('button').contains('Decrement').click(); // Force click to 0
        cy.wait(500)
        cy.get('h1').should('contain', 'Counter: 0');
        cy.wait(500)
        cy.get('p').should('contain', 'The count is zero.');
        cy.get('button').contains('Decrement').should('be.disabled');
        cy.get('button').contains('Increment').click(); // Increment to 1
        cy.wait(500)
        cy.get('button').contains('Reset').click(); // Reset to 0
        cy.wait(500)
        cy.get('h1').should('contain', 'Counter: 0');
        cy.get('p').should('contain', 'The count is zeroo.');


    });

});
