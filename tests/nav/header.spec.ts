import { test, expect } from '../../fixtures/test-fixtures';
import { Header } from '../../pages/components/Header';

test.describe('@smoke Header', () => {
  test('Go to contact from the Header', async ({ page, homePage }) => {
    await homePage.open();
    const header = new Header(page);
    await header.goToContact();
    await expect(page).toHaveURL(/\/contact-us/i);
    await expect(
      page.locator('iframe[name="htmlComp-iframe"], iframe[src*="filesusr.com/html/8cc6cb_"]').first()
    ).toBeAttached({ timeout: 8000 });
  });

  test('Clicking the logo returns to Home', async ({ page, homePage }) => {
    await page.goto('/contact-us', { waitUntil: 'domcontentloaded' });

    const header = new Header(page);
    await header.clickLogo();

    await expect(page).toHaveURL(/^https?:\/\/(?:www\.)?avodah\.com\/?$/i);
    await expect(
      page.getByRole('link', { name: /Explore Avodah(Med|Connect)/i }).first()
    ).toBeVisible({ timeout: 7000 });
  });
});
