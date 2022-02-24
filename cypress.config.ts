import { defineConfig } from 'cypress';
import { devServer } from './projects/angular-dev-server/src/public-api'

export default defineConfig({
  component: {
    devServer,
    specPattern: 'src/**/*.cy.ts'
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}'
  }
})