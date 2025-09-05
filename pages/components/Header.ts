import { Page, Locator, expect } from '@playwright/test';
import { SEL } from '../../utils/selectors';

export class Header {
  constructor(private page: Page) {}

  // ====== CONTACT ======
  private get contactLinkById(): Locator {
    return this.page
      .locator(`#${SEL.header.contact.liId}`)
      .locator(SEL.header.contact.linkCss)
      .first();
  }

  async goToContact() {
    const clickAndWait = async (loc: Locator) => {
      await Promise.all([
        this.page.waitForURL(SEL.header.contact.expectedUrl, { waitUntil: 'domcontentloaded' }),
        loc.click(),
      ]);
      await this.page
        .locator('iframe[name="htmlComp-iframe"], iframe[src*="filesusr.com/html/8cc6cb_"]')
        .first()
        .waitFor({ state: 'attached', timeout: 8000 })
        .catch(() => {});
    };

    if (await this.contactLinkById.isVisible().catch(() => false)) {
      await clickAndWait(this.contactLinkById);
      return;
    }

    const byText = this.page.getByRole('link', { name: /contact us/i }).first();
    await clickAndWait(byText);
  }

  // ====== LOGO → HOME ======
  private get logoPrimary(): Locator {
    return this.page.locator(
      'header a.j7pOnl[data-testid="linkElement"][href^="https://www.avodah.com"]'
    ).first();
  }

  private get logoByImgId(): Locator {
    return this.page.locator('header a:has(img#img_comp-kwwlr694)').first();
  }

  private get logoGeneric(): Locator {
    return this.page.locator(
      [
        'header a[href="/"]',
        'header a[href="https://www.avodah.com/"]',
        'header a[href="https://www.avodah.com"]',
        'header a:has(img[alt*="avodah" i])',
        'header a[data-testid="linkElement"]'
      ].join(', ')
    ).first();
  }

  private async resolveLogo(): Promise<Locator> {
    for (const loc of [this.logoPrimary, this.logoByImgId, this.logoGeneric]) {
      if (await loc.isVisible().catch(() => false)) return loc;
    }
    throw new Error('No pude encontrar un link de logo visible en el header.');
  }

  async clickLogo() {
    const logo = await this.resolveLogo();

    await Promise.all([
      this.page.waitForURL(/^https?:\/\/(?:www\.)?avodah\.com\/?$/i, {
        waitUntil: 'domcontentloaded'
      }),
      logo.click()
    ]);

    await expect(
      this.page.getByRole('link', { name: /Explore Avodah(Med|Connect)/i }).first()
    ).toBeVisible({ timeout: 7000 });
  }
}
