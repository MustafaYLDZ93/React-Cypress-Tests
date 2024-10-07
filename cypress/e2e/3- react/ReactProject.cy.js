
describe('Görev Silme Testi', () => {
    beforeEach(() => {
        // Testten önce uygulamanızı açın
        cy.visit('http://localhost:3000'); // Uygulamanızın açılış URL'sini buraya yazın
    });

    it('Yanlış kullanıcı adı veya şifre ile giriş yapılamaz', () => {
        cy.get('[data-testid="username-input"]').type('wronguser');
        cy.get('[data-testid="password-input"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.get('[data-testid="error-message"]')
            .should('be.visible')
            .and('have.text', 'Geçersiz kullanıcı adı veya şifre');
    });

    it('Doğru kullanıcı adı ve şifre ile giriş yapılır ve görev eklenip-silinir', () => {
        cy.get('[data-testid="username-input"]').type('testuser');

        cy.get('[data-testid="password-input"]').type('password123');

        cy.get('button[type="submit"]').click();

        cy.contains('Hoşgeldiniz, testuser!').should('be.visible');

        const new_task_input = cy.get('[data-testid="new-task-input"]')
        const ekle_butonu = cy.get('button').contains('Ekle')

        new_task_input.type('Silinecek görev 1')
        ekle_butonu.click()

        const task_0 = cy.get('[data-testid="task-0"]')
        task_0.should('exist')


        new_task_input.type('Silinecek görev 2')
        ekle_butonu.click()
        const task_1 = cy.get('[data-testid="task-1"]')
        task_1.should('exist')

        new_task_input.type('Silinecek görev 3')
        ekle_butonu.click()
        const task_2 = cy.get('[data-testid="task-2"]')
        task_2.should('exist')


        task_2.find('.delete-button').click()
        task_2.should('not.exist')

        task_1.find('.delete-button').click()
        task_1.should('not.exist')

        task_0.find('.delete-button').click()
        task_0.should('not.exist')

    });
});