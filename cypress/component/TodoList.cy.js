import React from 'react';
import TodoList from './TodoList';
import {mount} from "cypress/react18";

describe('TodoList Component', () => {
    beforeEach(() => {
        mount(<TodoList />);
    });

    it('should render the title correctly', () => {
        cy.get('[data-cy=title]').should('have.text', 'Yapılacaklar Listesi');
    });

    it('should add a new todo', () => {
        const todoText = 'Yeni görev';
        cy.get('[data-cy=todo-input]').type(todoText);
        cy.get('[data-cy=add-button]').click();

        cy.get('[data-cy=todo-item]')
            .should('have.length', 1)
            .and('contain', todoText);
    });

    it('should show error when trying to add empty todo', () => {
        cy.get('[data-cy=add-button]').click();
        cy.get('[data-cy=error-message]')
            .should('be.visible')
            .and('contain', 'Görev boş olamaz!');
    });

    it('should mark todo as completed', () => {
        // Önce yeni bir görev ekleyelim
        const todoText = 'Tamamlanacak görev';
        cy.get('[data-cy=todo-input]').type(todoText);
        cy.get('[data-cy=add-button]').click();

        // Görevi tamamlandı olarak işaretleyelim
        cy.get('[data-cy=todo-checkbox]').first().click();
        cy.get('[data-cy=todo-item]')
            .first()
            .find('span')
            .should('have.class', 'line-through');
    });

    it('should delete todo', () => {
        // Önce yeni bir görev ekleyelim
        const todoText = 'Silinecek görev';
        cy.get('[data-cy=todo-input]').type(todoText);
        cy.get('[data-cy=add-button]').click();

        // Görevi silelim
        cy.get('[data-cy=delete-button]').first().click();
        cy.get('[data-cy=todo-item]').should('have.length', 0);
    });

    it('should handle multiple todos', () => {
        const todos = ['Birinci görev', 'İkinci görev', 'Üçüncü görev'];

        // Görevleri ekleyelim
        todos.forEach(todo => {
            cy.get('[data-cy=todo-input]').type(todo);
            cy.get('[data-cy=add-button]').click();
        });

        // Görevlerin eklendiğini kontrol edelim
        cy.get('[data-cy=todo-item]').should('have.length', 3);

        // Her görevin doğru metne sahip olduğunu kontrol edelim
        todos.forEach(todo => {
            cy.get('[data-cy=todo-item]').should('contain', todo);
        });
    });

    it('should clear input after adding todo', () => {
        const todoText = 'Test görevi';
        cy.get('[data-cy=todo-input]').type(todoText);
        cy.get('[data-cy=add-button]').click();
        cy.get('[data-cy=todo-input]').should('have.value', '');
    });
});