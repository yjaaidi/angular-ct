import { of } from 'rxjs';
import { OverridesComponent } from './overrides.component';
import { OverridesService } from './overrides.service';

describe('OverridesComponent', () => {
  it('can mount', () => {
    cy.mount(OverridesComponent);
    cy.get('p').contains('overrides works ');
  });

  it('uses value from OverridesService', () => {
    cy.mount(OverridesComponent, {
      providers: [
        {
          provide: OverridesService,
          useValue: {
            tick$: of(42),
          } as OverridesService,
        },
      ],
    });

    cy.get('p').contains('overrides works 42');
  });

  it('increments every second', () => {
    cy.clock();

    cy.mount(OverridesComponent);

    setTimeout(() => console.log('5 seconds later???'), 5000);

    cy.tick(5000); // previous console.log should appear now but it doesn't work

    console.log(Date.now()); // returns 5000 intead of (initial new Date()) + 5000;

    cy.then(() => console.log(new Date(), Date.now()));
    cy.get('p').should('have.text', 'overrides works 5');
  });
});
