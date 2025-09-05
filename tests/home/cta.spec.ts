import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('@smoke Home CTAs', () => {
  test('CTA → Explore AvodahMed opens avodahmed.com', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    const newTab = await home.openAvodahMedFromCTA();
    await expect(newTab).toHaveURL(/avodahmed\.com/i);
    await newTab.close();
  });

  test('CTA → Explore AvodahConnect opens avodahconnect.com', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    const newTab = await home.openAvodahConnectFromCTA();
    await expect(newTab).toHaveURL(/avodahconnect\.com/i);
    await newTab.close();
  });

  
  test('Learn More → AvodahMed opens avodahmed.com', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    const newTab = await home.openAvodahMedFromLearnMore();
    await expect(newTab).toHaveURL(/avodahmed\.com/i);
    await newTab.close();
  });

  test('Learn More → AvodahConnect opens avodahconnect.com', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    const newTab = await home.openAvodahConnectFromLearnMore();
    await expect(newTab).toHaveURL(/avodahconnect\.com/i);
    await newTab.close();
  });
});
