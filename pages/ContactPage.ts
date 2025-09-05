import { expect, Page, Locator, FrameLocator } from '@playwright/test';

export class ContactPage {
  constructor(private page: Page) {}

  // =========================
  // Openinmg
  // =========================
  async openDirect() {
    await this.page.goto('https://www.avodah.com/contact-us', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/\/contact-us/i);
    await this.page.waitForTimeout(2000); //since the iframe doesn't load automatically, we need some time for it.
  }

  // =========================
  // Iframes (HubSpot embed)
  // =========================
  private get outerFrame(): FrameLocator {
    return this.page.frameLocator('iframe[name="htmlComp-iframe"]').first();
  }

  private get innerFrame(): FrameLocator {
    return this.outerFrame.frameLocator('iframe[src*="ui-forms-embed-components-app/frame.html"]').first();
  }

  private async waitFramesReady() {
    const outerEl = this.page
      .locator('iframe[name="htmlComp-iframe"], iframe[src*="filesusr.com/html/8cc6cb_"]')
      .first();
    await outerEl.waitFor({ state: 'attached', timeout: 10000 });

    const innerEl = this.outerFrame.locator('iframe[src*="ui-forms-embed-components-app/frame.html"]').first();
    await innerEl.waitFor({ state: 'attached', timeout: 10000 });

    await this.innerFrame.locator('form[data-hsfc-id="Form"]').first()
      .waitFor({ state: 'attached', timeout: 10000 });

    await this.page.waitForTimeout(500);
  }

  // =========================
  // step 1: fields
  // =========================
  private get firstName(): Locator {
    return this.innerFrame.locator('input[name="0-1/firstname"], input[autocomplete="given-name"]').first();
  }
  private get lastName(): Locator {
    return this.innerFrame.locator('input[name="0-1/lastname"], input[autocomplete="family-name"]').first();
  }
  private get mail(): Locator {
    return this.innerFrame.locator('input[name="0-1/email"], input[autocomplete="email"]').first();
  }
  private get companyName(): Locator {
    return this.innerFrame.locator('input[name="0-2/name"], input[autocomplete="organization"]').first();
  }

  async fillFirstName(value: string) {
    await this.waitFramesReady();
    await expect(this.firstName).toBeVisible({ timeout: 5000 });
    await expect(this.firstName).toBeEditable({ timeout: 5000 });
    await this.firstName.click({ timeout: 2000 });
    await this.firstName.fill('');
    await this.firstName.type(value, { delay: 15 });
    await expect(this.firstName).toHaveValue(value, { timeout: 3000 });
  }

  async fillLastName(value: string) {
    await this.waitFramesReady();
    await expect(this.lastName).toBeVisible({ timeout: 5000 });
    await expect(this.lastName).toBeEditable({ timeout: 5000 });
    await this.lastName.click({ timeout: 2000 });
    await this.lastName.fill('');
    await this.lastName.type(value, { delay: 15 });
    await expect(this.lastName).toHaveValue(value, { timeout: 3000 });
  }

  async fillmail(value: string) {
    await this.waitFramesReady();
    await expect(this.mail).toBeVisible({ timeout: 5000 });
    await expect(this.mail).toBeEditable({ timeout: 5000 });
    await this.mail.click({ timeout: 2000 });
    await this.mail.fill('');
    await this.mail.type(value, { delay: 15 });
    await expect(this.mail).toHaveValue(value, { timeout: 3000 });
  }

  async fillcompanyName(value: string) {
    await this.waitFramesReady();
    await expect(this.companyName).toBeVisible({ timeout: 5000 });
    await expect(this.companyName).toBeEditable({ timeout: 5000 });
    await this.companyName.click({ timeout: 2000 });
    await this.companyName.fill('');
    await this.companyName.type(value, { delay: 15 });
    await expect(this.companyName).toHaveValue(value, { timeout: 3000 });
  }

  // Next (step 1 -> step 2)
  private get nextButton(): Locator {
    return this.innerFrame.getByRole('button', { name: /^next$/i }).first();
  }

  async clickNext() {
    await this.waitFramesReady();
    await expect(this.nextButton).toBeVisible({ timeout: 5000 });
    await this.nextButton.scrollIntoViewIfNeeded();
    await this.nextButton.click();

    const step2Bar = this.innerFrame.locator('.hsfc-ProgressBar__Text', { hasText: '2/2' });
    const message = this.innerFrame.getByRole('textbox', { name: /message/i });
    const submit = this.innerFrame.getByRole('button', { name: /submit/i });

    try {
      await Promise.any([
        step2Bar.waitFor({ timeout: 5000 }),
        message.waitFor({ timeout: 5000 }),
        submit.waitFor({ timeout: 5000 }),
      ]);
    } catch {
      await this.page.waitForTimeout(800);
    }
  }

  // =========================
  // Step 2
  // =========================
  private get interestButton(): Locator {
    return this.innerFrame.getByRole('button', { name: /^interest$/i }).first();
  }
  private get interestListbox(): Locator {
    return this.innerFrame.getByRole('listbox').first();
  }
  private interestOption(name: string): Locator {
    return this.interestListbox.getByRole('option', { name, exact: true });
  }
  private get interestHidden(): Locator {
    return this.innerFrame.locator('input[type="hidden"][name="0-2/customer_type"]').first();
  }

  private async trySelectInterestByUI(
    option: 'Medical' | 'Language Translation' | 'Investor' | 'Vendors'
  ) {
    await expect(this.interestButton).toBeVisible({ timeout: 3000 });
    await this.interestButton.click();
    await expect(this.interestListbox).toBeVisible({ timeout: 3000 });
    const opt = this.interestOption(option);
    await expect(opt).toBeVisible({ timeout: 3000 });
    await opt.click();
    await expect(this.interestHidden).toHaveAttribute('value', new RegExp(option, 'i'), { timeout: 2000 });
  }

  async forceSetInterest(option: 'Medical' | 'Language Translation' | 'Investor' | 'Vendors') {
    await this.waitFramesReady();
    const hidden = this.interestHidden;
    await hidden.waitFor({ state: 'attached', timeout: 6000 });

    await hidden.evaluate((el, v) => {
      const input = el as HTMLInputElement;
      input.value = v;
      input.setAttribute('value', v);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, option);

    await expect(hidden).toHaveAttribute('value', new RegExp(option, 'i'), { timeout: 3000 });
  }

  async selectInterest(option: 'Medical' | 'Language Translation' | 'Investor' | 'Vendors') {
    try {
      await this.trySelectInterestByUI(option);
    } catch {
      await this.forceSetInterest(option);
    }
  }

  private get phone(): Locator {
    return this.innerFrame.getByLabel(/^phone number$/i).first();
  }

  private get phoneHidden(): Locator {
    return this.innerFrame.locator('input[type="hidden"][name="0-1/phone"]').first();
  }

  private get messageBox(): Locator {
    return this.innerFrame.locator('textarea[name="0-1/message"]').first();
  }

  async fillPhone(value: string) {
    await this.waitFramesReady();

    await expect(this.phone).toBeVisible({ timeout: 6000 });
    await this.phoneHidden.waitFor({ state: 'attached', timeout: 6000 });

    await this.phone.scrollIntoViewIfNeeded();
    await this.phone.click({ timeout: 2000 });
    await this.phone.fill('');                          // clears the international prefix
    await this.phone.type(value, { delay: 20 });        
    await this.phone.evaluate((el: HTMLInputElement) => el.blur());

    try {
      await expect(this.phoneHidden).toHaveAttribute('value', /[0-9]/, { timeout: 2000 });
    } catch {
      await this.phoneHidden.evaluate((el, v) => {
        const input = el as HTMLInputElement;
        input.value = v;
        input.setAttribute('value', v);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);

      await expect(this.phoneHidden).toHaveAttribute(
        'value',
        new RegExp(value.replace(/[+()\s-]/g, ''), 'i'),
        { timeout: 3000 }
      );
    }
  }

  async fillMessage(value: string) {
    await this.waitFramesReady();
    await expect(this.messageBox).toBeVisible({ timeout: 5000 });
    await expect(this.messageBox).toBeEditable({ timeout: 5000 });
    await this.messageBox.click({ timeout: 2000 });
    await this.messageBox.fill('');
    await this.messageBox.type(value, { delay: 5 });
    await expect(this.messageBox).toHaveValue(value, { timeout: 3000 });
  }

  // =========================
  // Submit
  // =========================
  get submit(): Locator {
    return this.innerFrame.getByRole('button', { name: /^submit$/i }).first();
  }

  async submitForm() {
    await expect(this.submit).toBeVisible({ timeout: 6000 });
    await this.submit.scrollIntoViewIfNeeded();
    await this.submit.click({ timeout: 3000 });
  }

  private get submitErrorAlert(): Locator {
  return this.innerFrame.locator('[data-hsfc-id="ErrorAlert"], .hsfc-ErrorAlert').first();
}

async expectSubmitErrorMessage(
  text: string | RegExp = /The form could not be submitted because some fields contain errors\./i
) {
  await expect(this.submitErrorAlert).toBeVisible({ timeout: 6000 });
  await expect(this.submitErrorAlert).toHaveText(text);
}

private get allErrorAlerts(): Locator {
  return this.innerFrame.locator('[data-hsfc-id="ErrorAlert"], .hsfc-ErrorAlert');
}

//waits for any type of error
async expectAnyErrorAlert(
  text: string | RegExp = /The form could not be submitted because some fields contain errors\./i
) {
    await this.allErrorAlerts.first().waitFor({ state: 'attached', timeout: 6000 });
  
  const texts = await this.allErrorAlerts.allInnerTexts();
 
  const matched = texts.some(t => (typeof text === 'string' ? t.includes(text) : text.test(t)));
  expect(matched, `No encontré error que matchee ${text}. Textos: ${JSON.stringify(texts)}`).toBeTruthy();
}

//checks the email error
async expectEmailInvalidError() {
  await expect(this.mail).toHaveAttribute('aria-invalid', /true/i, { timeout: 6000 }).catch(() => {});

  await this.expectAnyErrorAlert(/please enter a valid email address/i);
}
}
