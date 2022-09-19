/* functions for playwright testing*/
import { expect, test } from '@playwright/test';

/**
 * @param  {Date} date
 * @returns string
 */
export const formatDate = (date: Date) => {
  let year: number | string = date.getFullYear();
  // add 1 month to today's date
  let month: number | string = date.getMonth() + 2;
  let day: number | string = date.getDate();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  let formatedDate = year + '-' + month + '-' + day;
  return formatedDate;
};

// export interface LoginProps {
//   user: {
//     email: string;
//     password: string;
//   };
// }

// export const login = ({ user }: LoginProps) => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/');
//     await expect(page.locator(`//img[@class="logo-jura-home"]`)).toBeVisible();
//     await expect(page.locator(`//h2[@class="home-title" and text()="TICKETS MANAGER"]`)).toBeVisible();
//     await expect(page.locator(`//p[@class="home-text" and text()="Collaborez sur vos projets et gérez toutes vos tâches"]`)).toBeVisible();
//     await expect(page.locator(`//button//div[text()="Connexion"]`)).toBeVisible();
//     await expect(page.locator(`//button//div[text()="Inscription"]`)).toBeVisible();
//     await page.locator(`//button//div[text()="Connexion"]`).click();
//     await expect(page).toHaveURL('/signin');
//     await expect(page.locator(`//h1[@class="title-signin" and text()="Connexion"]`)).toBeVisible();
//     await expect(page.locator(`//input[@type="email"]`)).toBeVisible();
//     await page.locator(`//input[@type="email"]`).fill(user.email);
//     await expect(page.locator(`//input[@type="password"]`)).toBeVisible();
//     await page.locator(`//input[@type="password"]`).fill(user.password);
//     await page.locator(`//button//div[text()="Se connecter"]`).click();
//   });
// };

export const logout = () => {
  test.afterEach(async ({ page }) => {
    await expect(page.locator(`//div[@class="top-navbar"]//a[@class="header-link"]`)).toBeVisible();
    await page.locator(`//div[@class="top-navbar"]//a[@class="header-link"]`).click();
    await expect(page).toHaveURL('/profile');
    await Promise.all([
      expect(page.locator(`//button//div[text()="Se déconnecter"]`)).toBeVisible(),
      page.waitForNavigation({ url: '/' }),
      page.locator(`//button//div[text()="Se déconnecter"]`).click()
    ]);
  });
};
