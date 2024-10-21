import { chromium, Browser, Page } from 'playwright';

describe('Ozon Favorites Functionality', () => {
  let browser: Browser;
  let page: Page;

  // Перед каждым тестом запускаем браузер и открываем страницу
  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://www.ozon.ru/');
  });

  // После каждого теста закрываем браузер
  afterAll(async () => {
    await browser.close();
  });

  test('Add item to favorites', async () => {
    // Логин в аккаунт (логин и пароль нужно заменить на реальные данные)
    await page.click('text=Войти'); // Кликаем по кнопке "Войти"
    await page.fill('input[name="login"]', 'your-email@example.com'); // Заполняем поле email
    await page.fill('input[name="password"]', 'your-password'); // Заполняем поле пароль
    await page.click('text=Войти'); // Нажимаем на кнопку "Войти"

    // Поиск товара
    await page.fill('input[placeholder="Искать на Ozon"]', 'ноутбук');
    await page.click('text=Найти'); // Кликаем по кнопке "Найти"

    // Кликаем по первому товару в списке
    await page.click('.a0c4 a[data-widget="productCard"]');

    // Добавляем товар в избранное
    await page.click('button[aria-label="Добавить в избранное"]');

    // Переход в раздел "Избранное"
    await page.goto('https://www.ozon.ru/my/favorites');

    // Проверяем, что товар добавлен в избранное
    const favoriteItem = await page.$('.a0c4 a[data-widget="productCard"]');
    expect(favoriteItem).not.toBeNull();
  });

  test('Remove item from favorites', async () => {
    // Переход в раздел "Избранное"
    await page.goto('https://www.ozon.ru/my/favorites');

    // Удаляем товар из избранного
    await page.click('button[aria-label="Удалить из избранного"]');

    // Проверяем, что товар удален
    const favoriteItem = await page.$('.a0c4 a[data-widget="productCard"]');
    expect(favoriteItem).toBeNull();
  });
});
