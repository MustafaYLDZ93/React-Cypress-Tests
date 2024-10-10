import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', (component, options) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(component, options)
})

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    cy.screenshot(); // Başarısız olan test için ekran görüntüsü al
  }
});