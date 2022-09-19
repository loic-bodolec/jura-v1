import { expect, test } from '@playwright/test';
import { /* login, */ logout } from './utilities/functions';
import { newTicket } from './utilities/scenarioData/newTicket';
import { user } from './utilities/scenarioData/user';

test.describe('scenario 1', () => {
  test('create a new ticket', async ({ page }) => {
    //************* 1. can see the homepage
    await page.goto('/');
    await expect(page.locator(`//img[@class="logo-jura-home"]`)).toBeVisible();
    await expect(page.locator(`//h2[@class="home-title" and text()="TICKETS MANAGER"]`)).toBeVisible();
    await expect(page.locator(`//p[@class="home-text" and text()="Collaborez sur vos projets et gérez toutes vos tâches"]`)).toBeVisible();
    await expect(page.locator(`//button//div[text()="Connexion"]`)).toBeVisible();
    await expect(page.locator(`//button//div[text()="Inscription"]`)).toBeVisible();

    //************* 2. login
    // TODO login function in utilities
    await page.locator(`//button//div[text()="Connexion"]`).click();
    await expect(page).toHaveURL('/signin');
    await expect(page.locator(`//h1[@class="title-signin" and text()="Connexion"]`)).toBeVisible();
    await expect(page.locator(`//input[@type="email"]`)).toBeVisible();
    await page.locator(`//input[@type="email"]`).fill(user.email);
    await expect(page.locator(`//input[@type="password"]`)).toBeVisible();
    await page.locator(`//input[@type="password"]`).fill(user.password);
    await page.locator(`//button//div[text()="Se connecter"]`).click();

    //************* 3. can see the dashboard page
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator(`//div[@class="top-navbar"]//div[@data-testid="menu"]`)).toBeVisible();
    await expect(page.locator(`//div[@class="top-navbar"]//a[@data-testid="link-logo"]`)).toBeVisible();
    await expect(page.locator(`//div[@class="top-navbar"]//a[@data-testid="link-profile"]`)).toBeVisible();
    await expect(page.locator(`//div[@class="footer-container"]`)).toBeVisible();

    //************* 4. can open the ticket creation modal
    await expect(
      page.locator(`//div[@class="sidebar-wrap"]//button[@data-testid="createTicket-button"]//div[text()="Nouveau ticket"]`)
    ).toBeVisible();
    await page.locator(`//button[@data-testid="createTicket-button"]//div[text()="Nouveau ticket"]`).click();
    await expect(page.locator(`//div[@class="modal-content"]//div[@class="modal-header"]//div[@data-testid="modal-title"]`)).toBeVisible();
    await expect(page.locator(`//div[@class="modal-content"]//div[@class="modal-header"]//button[@class="btn-close"]`)).toBeVisible();
    await expect(
      page.locator(`//div[@class="modal-content"]//div[@class="modal-body"]//form[@data-testid="createTicketForm"]`)
    ).toBeVisible();
    await page.locator(`//button[@data-testid="createTicketForm-create-button"]//div[text()="Créer"]`).isDisabled();

    //************* 5. can fill in the ticket informations
    //************* 5.1 title
    await expect(page.locator(`//input[@data-testid="createTicketForm-title"]`)).toBeVisible();
    await page.locator(`//input[@data-testid="createTicketForm-title"]`).click();
    await page.locator(`//input[@data-testid="createTicketForm-title"]`).fill(newTicket.data.title);

    //************* 5.2 priority
    await expect(page.locator(`//select[@data-testid="createTicketForm-priority"]`)).toBeVisible();
    await page.locator(`//select[@data-testid="createTicketForm-priority"]`).click();
    await page.locator(`//select[@data-testid="createTicketForm-priority"]`).selectOption(newTicket.data.priority);

    //************* 5.3 estimated time
    await expect(page.locator(`//input[@data-testid="createTicketForm-estimated-time"]`)).toBeVisible();
    await page.locator(`//input[@data-testid="createTicketForm-estimated-time"]`).click();
    await page.locator(`//input[@data-testid="createTicketForm-estimated-time"]`).fill(newTicket.data.estimated_time);

    //************* 5.4 due date
    await expect(page.locator(`//input[@data-testid="createTicketForm-date"]`)).toBeVisible();
    await page.locator(`//input[@data-testid="createTicketForm-date"]`).click();
    await page.locator(`//input[@data-testid="createTicketForm-date"]`).fill(newTicket.data.due_date);

    //************* 5.5 associated project
    await expect(page.locator(`//button[@data-testid="projects-formDropdown-toggle"]`)).toBeVisible();
    await page.locator(`//button[@data-testid="projects-formDropdown-toggle"]`).click();
    await expect(page.locator(`//div[@data-testid="projects-formDropdown-menu"]`)).toBeVisible();
    await page
      .locator(
        `//div[@data-testid="projects-formDropdown-menu"]//a[@data-testid="projects-formDropdown-menu-item-${newTicket.project.id}"]`
      )
      .click();

    //************* 5.6 associated member(s)
    await expect(page.locator(`//button[@data-testid="members-formDropdown-toggle"]`)).toBeVisible();
    for (const member of newTicket.members) {
      await page.locator(`//button[@data-testid="members-formDropdown-toggle"]`).click();
      await expect(page.locator(`//div[@data-testid="members-formDropdown-menu"]`)).toBeVisible();
      await page
        .locator(`//div[@data-testid="members-formDropdown-menu"]//a[@data-testid="members-formDropdown-menu-item-${member}"]`)
        .click();
    }

    //*************5.7 description
    await expect(page.locator(`//textarea[@data-testid="textarea-control"]`)).toBeVisible();
    await page.locator(`//textarea[@data-testid="textarea-control"]`).click();
    await page.locator(`//textarea[@data-testid="textarea-control"]`).fill(newTicket.data.description);

    //************* 6. can submit the new ticket
    await page.locator(`//button[@data-testid="createTicketForm-create-button"]//div[text()="Créer"]`).isVisible();
    await page.locator(`//button[@data-testid="createTicketForm-create-button"]//div[text()="Créer"]`).click();

    //************* 7. can see the new ticket in the tickets list of the associated project
    await page.goto(`/projects/${newTicket.project.id}`);
    await expect(
      page.locator(`//div[@data-testid="ProjectDetailsCard-${newTicket.project.id}-name" and text()="${newTicket.project.name}"]`)
    ).toBeVisible();
    await expect(
      page.locator(
        `//div[@data-testid="swimlane"]//div[@data-testid="swimlane-header" and text()="A FAIRE"]//following-sibling::div[@data-testid="swimlane-tickets-list"]//a[text()="${newTicket.data.title}"]`
      )
    ).toBeVisible();

    //************* 8. can delete the new ticket in the tickets list
  });

  //************* logout
  logout();
});
