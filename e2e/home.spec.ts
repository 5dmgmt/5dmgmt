import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/');

    // ヘッダーが表示されていることを確認
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // ロゴが存在することを確認
    const logo = page.locator('img[alt="五次元経営株式会社"]');
    await expect(logo).toBeVisible();
  });

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');

    // タイトルを確認
    await expect(page).toHaveTitle(/五次元経営/);

    // meta description を確認
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /イマココ/);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    // お問い合わせリンクをクリック
    await page.click('text=お問い合わせ');

    // URLが変わったことを確認
    await expect(page).toHaveURL(/\/company\/contact/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // モバイルメニューボタンが表示されていることを確認
    const menuButton = page.locator('button[aria-label*="メニュー"]');
    await expect(menuButton).toBeVisible();
  });
});

test.describe('Diagnosis Page', () => {
  test('should load the diagnosis form', async ({ page }) => {
    await page.goto('/unki/shindan');

    // 診断フォームが表示されていることを確認
    await expect(page.locator('h1, h2')).toContainText(/診断|宿曜/);
  });
});
