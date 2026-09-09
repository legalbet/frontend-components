import { test, expect } from '@playwright/test';

test.describe('BasePopup Component', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на тестовую страницу
    await page.goto('/tests/popup');
  });

  test('should open popup when button is clicked', async ({ page }) => {
    // Проверяем что попап изначально не видим
    await expect(page.locator('.base-popup-wrap')).not.toBeVisible();

    // Открываем попап
    await page.click('#open-test-popup');

    // Проверяем что попап появился
    await expect(page.locator('.base-popup-wrap')).toBeVisible();
    await expect(page.locator('#popup-title')).toHaveText('Test Popup Title');
    await expect(page.locator('#popup-content')).toHaveText('Test popup message');
  });

  test('should close popup when close button is clicked', async ({ page }) => {
    // Открываем попап
    await page.click('#open-test-popup');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Кликаем на кнопку закрытия
    await page.click('.base-popup__close-btn');

    // Проверяем что попап закрылся
    await expect(page.locator('.base-popup-wrap')).not.toBeVisible();
  });

  test('should close popup when clicking outside (on overlay)', async ({ page }) => {
    // Открываем попап
    await page.click('#open-test-popup');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Кликаем на overlay (вне попапа)
    await page.locator('.base-popup-wrap').click({ position: { x: 5, y: 5 } });

    // Проверяем что попап закрылся
    await expect(page.locator('.base-popup-wrap')).not.toBeVisible();
  });

  test('should NOT show close button when withoutCloseBtn is true', async ({ page }) => {
    // Открываем попап без кнопки закрытия
    await page.click('#open-no-close-btn');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Проверяем что кнопка закрытия отсутствует
    await expect(page.locator('.base-popup__close-btn')).not.toBeVisible();
  });

  test('should NOT close on outside click when withoutCloseByOutsideClick is true', async ({ page }) => {
    // Открываем попап с отключённым закрытием по клику вне попапа
    await page.click('#open-no-outside-click');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Пытаемся кликнуть на overlay
    await page.locator('.base-popup-wrap').click({ position: { x: 5, y: 5 } });

    // Проверяем что попап всё ещё открыт
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Но кнопка закрытия должна работать
    await page.click('.base-popup__close-btn');
    await expect(page.locator('.base-popup-wrap')).not.toBeVisible();
  });

  test('should show loader when isLoading is true', async ({ page }) => {
    // Открываем попап в состоянии загрузки
    await page.click('#open-loading-popup');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Проверяем что попап имеет класс loading
    await expect(page.locator('.base-popup--loading')).toBeVisible();

    // Проверяем что лоадер виден
    await expect(page.locator('.base-popup-wrap .app-loader')).toBeVisible();
  });

  test('should render footer when hasFooter is true', async ({ page }) => {
    // Открываем попап с футером
    await page.click('#open-with-footer');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Проверяем что футер отображается
    await expect(page.locator('.base-popup__footer')).toBeVisible();
    await expect(page.locator('#popup-footer')).toBeVisible();
    await expect(page.locator('#footer-action-btn')).toBeVisible();
  });

  test('should render header with title', async ({ page }) => {
    // Открываем попап
    await page.click('#open-test-popup');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Проверяем что хедер отображается
    await expect(page.locator('.base-popup__header')).toBeVisible();
    await expect(page.locator('#popup-title')).toBeVisible();
  });

  test('should have proper structure with header, content, and close button', async ({ page }) => {
    // Открываем попап
    await page.click('#open-test-popup');
    await expect(page.locator('.base-popup-wrap')).toBeVisible();

    // Проверяем структуру попапа
    const popup = page.locator('.base-popup');
    await expect(popup).toBeVisible();
    await expect(popup.locator('.base-popup__header')).toBeVisible();
    await expect(popup.locator('.base-popup__content')).toBeVisible();
    await expect(popup.locator('.base-popup__close-btn')).toBeVisible();
  });
});
