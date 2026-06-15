# ✅ Tasteorama API - QA Тестовий Чек-лист

## 📋 Інструкції з тестування

Цей чек-лист містить **53+ тестових сценаріїв** для комплексного тестування API проекту Tasteorama.

- **Використовуйте Postman, cURL або вбудований Swagger UI**
- **Виконуйте тести в порядку, як вони перелічені**
- **Для кожного тесту позначте статус**: ✅ Pass / ❌ Fail
- **Документуйте помилки з номерами версії та часом**

---

## 🔐 **ТЕСТИ АУТЕНТИФІКАЦІЇ (11 тестов)**

### TC-AUTH-001: Успішна реєстрація з валідними даними

- **Запит**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "Іван Петров",
    "email": "ivan.petrov@example.com",
    "password": "SecurePass123"
  }
  ```
- **Очікування**:
  - Status: 201 Created
  - Response містить user об'єкт з \_id, name, email
  - Cookies встановлені (accessToken, refreshToken, sessionId)
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-002: Реєстрація з існуючим email

- **Запит**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "Новий Користувач",
    "email": "ivan.petrov@example.com",
    "password": "AnotherPass123"
  }
  ```
- **Очікування**:
  - Status: 400 Bad Request
  - Message містить "Email вже використовується" або "Email already exists"
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-003: Реєстрація без email

- **Запит**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "Користувач",
    "password": "SecurePass123"
  }
  ```
- **Очікування**:
  - Status: 400 Bad Request
  - Повідомлення про відсутність email
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-004: Реєстрація з коротким паролем (< 8 символів)

- **Запит**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "User",
    "email": "user@example.com",
    "password": "Pass12"
  }
  ```
- **Очікування**:
  - Status: 400 Bad Request
  - Повідомлення про мінімальну довжину пароля
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-005: Реєстрація з ім'ям > 16 символів

- **Запит**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "IvanPetrovVeryLongName",
    "email": "ivan@example.com",
    "password": "SecurePass123"
  }
  ```
- **Очікування**:
  - Status: 400 Bad Request
  - Повідомлення про максимальну довжину ім'я
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-006: Успішний вхід з валідними даними

- **Запит**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "ivan.petrov@example.com",
    "password": "SecurePass123"
  }
  ```
- **Очікування**:
  - Status: 200 OK
  - Response містить user об'єкт
  - Cookies встановлені (accessToken, refreshToken, sessionId)
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-007: Вхід з невірним паролем

- **Запит**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "ivan.petrov@example.com",
    "password": "WrongPassword123"
  }
  ```
- **Очікування**:
  - Status: 401 Unauthorized
  - Message: "Невірні облікові дані" або "Invalid credentials"
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-008: Вхід з неіснуючим email

- **Запит**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "notexist@example.com",
    "password": "AnyPassword123"
  }
  ```
- **Очікування**:
  - Status: 401 Unauthorized
  - Message про помилку облікових даних
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-009: Успішне оновлення сесії (refresh)

- **Запит**: `POST /auth/refresh`
- **Cookies вимагаються**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 200 OK
  - Message: "Сесія оновлена" або "Session refreshed"
  - НОВИЙ accessToken у cookies
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-010: Оновлення без cookies

- **Запит**: `POST /auth/refresh` (БЕЗ cookies)
- **Очікування**:
  - Status: 401 Unauthorized
  - Message: "Відсутні облікові дані" або "No credentials"
- **Статус**: [ ] Pass / [ ] Fail

### TC-AUTH-011: Успішний вихід

- **Запит**: `POST /api/auth/logout`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 204 No Content
  - Cookies очищені
- **Статус**: [ ] Pass / [ ] Fail

---

## 👤 **ТЕСТИ КОРИСТУВАЧІВ (3 тести)** 🆕

### TC-USER-001: Отримання інформації про поточного користувача

- **Запит**: `GET /users/current/`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 200 OK
  - Response містить user об'єкт з:
    - `_id` - ObjectId користувача
    - `name` - ім'я користувача
    - `email` - email користувача
    - `avatar` - URL аватара (якщо встановлено)
    - `favorites` - масив ID улюблених рецептів
    - `createdAt` - дата створення
    - `updatedAt` - дата останнього оновлення
  - **ВАЖЛИВО**: Password НЕ повинен бути в відповіді
- **Статус**: [ ] Pass / [ ] Fail

### TC-USER-002: Отримання користувача без аутентифікації

- **Запит**: `GET /users/current/` (БЕЗ cookies)
- **Очікування**:
  - Status: 401 Unauthorized
  - Message про необхідність аутентифікації
- **Статус**: [ ] Pass / [ ] Fail

### TC-USER-003: Отримання користувача з невірним access token

- **Запит**: `GET /users/current/`
- **Cookies**: accessToken (невалідний), refreshToken, sessionId
- **Очікування**:
  - Status: 401 Unauthorized
  - Message: "Невірний токен" або "Invalid token"
- **Статус**: [ ] Pass / [ ] Fail

---

## 🍳 **ТЕСТИ РЕЦЕПТІВ (17 тестів)**

### TC-RECIPE-001: Отримання всіх рецептів (перша сторінка)

- **Запит**: `GET /api/recipes`
- **Очікування**:
  - Status: 200 OK
  - Response містить масив рецептів
  - Кожен рецепт має \_id, title, description, time, category, ingredients, image
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-002: Отримання рецептів з пагінацією

- **Запит**: `GET /api/recipes?page=2&perPage=5`
- **Очікування**:
  - Status: 200 OK
  - Повертаються 5 рецептів зі сторінки 2
  - Total count > 5
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-003: Отримання рецептів з фільтром по категорії

- **Запит**: `GET /api/recipes?category=Основні%20страви`
- **Очікування**:
  - Status: 200 OK
  - Всі рецепти мають category: "Основні страви"
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-004: Отримання рецептів з пошуком по ключовому слову

- **Запит**: `GET /api/recipes?keyword=паста`
- **Очікування**:
  - Status: 200 OK
  - Всі рецепти містять "паста" в title або description
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-005: Отримання рецептів з фільтром по інгредієнту

- **Запит**: `GET /api/recipes?ingredient=Курине%20філе`
- **Очікування**:
  - Status: 200 OK
  - Всі рецепти містять інгредієнт "Курине філе"
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-006: Отримання один рецепт по ID

- **Запит**: `GET /api/recipes/507f1f77bcf86cd799439011`
- **Очікування**:
  - Status: 200 OK
  - Response містить повну інформацію про рецепт
  - Включає масив інгредієнтів з назвами та мірами
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-007: Отримання неіснуючого рецепта

- **Запит**: `GET /api/recipes/507f1f77bcf86cd799439099`
- **Очікування**:
  - Status: 404 Not Found
  - Message: "Рецепт не знайдено" або "Recipe not found"
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-008: Створення рецепта з валідними даними (ІЗ ФАЙЛОМ)

- **Запит**: `POST /api/recipes/` (multipart/form-data)
- **Cookies**: accessToken, refreshToken, sessionId
- **Body**:
  ```
  title: "Паста Карбонара"
  description: "Класичне італійське блюдо"
  time: 30
  calories: 450
  category: ObjectId категорії
  ingredients: [{"id":"507f...","measure":"500g"},{"id":"507f...","measure":"200ml"}]
  instructions: "1. Зварити макаронів\n2. Смажити бекон\n3. Змішати"
  image: <jpg file>
  ```
- **Очікування**:
  - Status: 201 Created
  - Response містить створений рецепт з \_id
  - image містить Cloudinary URL
  - owner має ID користувача
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-009: Створення рецепта без файлу зображення

- **Запит**: `POST /api/recipes/` (БЕЗ image поля)
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 400 Bad Request
  - Message: "Зображення обов'язково" або "Image required"
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-010: Створення рецепта без аутентифікації

- **Запит**: `POST /api/recipes/` (БЕЗ cookies)
- **Очікування**:
  - Status: 401 Unauthorized
  - Message про необхідність аутентифікації
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-011: Створення рецепта з меншою за 2 інгредієнти

- **Запит**: `POST /api/recipes/` з 1 інгредієнтом
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 400 Bad Request
  - Message: "Мінімум 2 інгредієнти" або "Minimum 2 ingredients"
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-012: Створення рецепта з більшою за 16 інгредієнтів

- **Запит**: `POST /api/recipes/` з 17 інгредієнтами
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 400 Bad Request
  - Message про максимальну кількість інгредієнтів
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-013: Створення рецепта з часом > 360 хвилин

- **Запит**: `POST /api/recipes/` з time: 361
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 400 Bad Request
  - Message про максимальний час приготування
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-014: Отримання моїх рецептів

- **Запит**: `GET /api/my/recipes`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 200 OK
  - Повертаються тільки рецепти поточного користувача
  - Кожен рецепт має owner ID = поточний користувач
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-015: Отримання моїх рецептів без аутентифікації

- **Запит**: `GET /api/my/recipes` (БЕЗ cookies)
- **Очікування**:
  - Status: 401 Unauthorized
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-016: Отримання рецептів з некоректним page

- **Запит**: `GET /api/recipes?page=0`
- **Очікування**:
  - Status: 400 Bad Request
  - Або повернути сторінку 1
- **Статус**: [ ] Pass / [ ] Fail

### TC-RECIPE-017: Отримання рецептів з perPage > 50

- **Запит**: `GET /api/recipes?perPage=100`
- **Очікування**:
  - Status: 400 Bad Request
  - Або обмежити до 50
- **Статус**: [ ] Pass / [ ] Fail

---

## ⭐ **ТЕСТИ УЛЮБЛЕНИХ (7 тестів)**

### TC-FAV-001: Додання рецепта до улюблених

- **Запит**: `POST /api/recipes/507f1f77bcf86cd799439011/favorite`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 200 OK
  - Response містить масив ID улюблених рецептів
  - ID щойно доданого рецепта в масиві
- **Статус**: [ ] Pass / [ ] Fail

### TC-FAV-002: Додання неіснуючого рецепта до улюблених

- **Запит**: `POST /api/recipes/507f1f77bcf86cd799439999/favorite`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 404 Not Found
  - Message: "Рецепт не знайдено"
- **Статус**: [ ] Pass / [ ] Fail

### TC-FAV-003: Додання до улюблених без аутентифікації

- **Запит**: `POST /api/recipes/{id}/favorite` (БЕЗ cookies)
- **Очікування**:
  - Status: 401 Unauthorized
- **Статус**: [ ] Pass / [ ] Fail

### TC-FAV-004: Видалення рецепта з улюблених

- **Запит**: `DELETE /api/recipes/507f1f77bcf86cd799439011/favorite`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 200 OK
  - Response містить оновлений масив улюблених
  - ID видаленого рецепта НЕ в масиві
- **Статус**: [ ] Pass / [ ] Fail

### TC-FAV-005: Видалення неіснуючого рецепта з улюблених

- **Запит**: `DELETE /api/recipes/507f1f77bcf86cd799439999/favorite`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 404 Not Found
- **Статус**: [ ] Pass / [ ] Fail

### TC-FAV-006: Отримання всіх улюблених рецептів

- **Запит**: `GET /api/recipes/favorites`
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 200 OK
  - Response містить масив улюблених рецептів
  - Містить total count
- **Статус**: [ ] Pass / [ ] Fail

### TC-FAV-007: Отримання улюблених без аутентифікації

- **Запит**: `GET /api/recipes/favorites` (БЕЗ cookies)
- **Очікування**:
  - Status: 401 Unauthorized
- **Статус**: [ ] Pass / [ ] Fail

---

## 🏷️ **ТЕСТИ КАТЕГОРІЙ (1 тест)**

### TC-CAT-001: Отримання всіх категорій

- **Запит**: `GET /api/categories`
- **Очікування**:
  - Status: 200 OK
  - Response містить масив категорій
  - Кожна категорія має \_id та name
  - Мінімум 3 категорії в масиві
- **Статус**: [ ] Pass / [ ] Fail

---

## 🥘 **ТЕСТИ ІНГРЕДІЄНТІВ (1 тест)**

### TC-ING-001: Отримання всіх інгредієнтів

- **Запит**: `GET /api/ingredients`
- **Очікування**:
  - Status: 200 OK
  - Response містить масив інгредієнтів
  - Кожен інгредієнт має \_id, name, desc, img
  - Мінімум 5 інгредієнтів в масиві
- **Статус**: [ ] Pass / [ ] Fail

---

## ⚠️ **ТЕСТИ EDGE CASES (5 тестів)**

### EC-001: Додання рецепта вже до улюблених

- **Запит**: `POST /api/recipes/{id}/favorite` ДВА РАЗИ для одного рецепта
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Перший запит: 200 OK
  - Другий запит: 200 OK (або 400 якщо не дозволяє дублювання)
  - Рецепт повинен бути один раз в улюблених
- **Статус**: [ ] Pass / [ ] Fail

### EC-002: Отримання рецептів з невалідним ObjectId

- **Запит**: `GET /api/recipes/notavalidid`
- **Очікування**:
  - Status: 400 Bad Request
  - Або 404 Not Found
- **Статус**: [ ] Pass / [ ] Fail

### EC-003: Пошук з спеціальними символами

- **Запит**: `GET /api/recipes?keyword=<script>alert(1)</script>`
- **Очікування**:
  - Status: 200 OK
  - Немає результатів пошуку (безпека XSS)
- **Статус**: [ ] Pass / [ ] Fail

### EC-004: Створення рецепта з дуже довгим описом

- **Запит**: `POST /api/recipes/` з description (> 200 символів)
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 400 Bad Request
  - Message про максимальну довжину опису
- **Статус**: [ ] Pass / [ ] Fail

### EC-005: Отримання рецептів з порожнім пошуком

- **Запит**: `GET /api/recipes?keyword=`
- **Очікування**:
  - Status: 200 OK
  - Повертаються всі рецепти (або перші 10)
- **Статус**: [ ] Pass / [ ] Fail

---

## ⚡ **ТЕСТИ PERFORMANCE (4 перевірки)**

### PERF-001: Час відповіді GET /api/recipes

- **Запит**: `GET /api/recipes` 10 разів підряд
- **Очікування**:
  - Кожна відповідь < 500ms
  - Немає timeout помилок
- **Статус**: [ ] Pass / [ ] Fail

### PERF-002: Час відповіді GET /api/recipes/{id}

- **Запит**: `GET /api/recipes/{id}` 10 разів підряд
- **Очікування**:
  - Кожна відповідь < 300ms
  - Немає timeout помилок
- **Статус**: [ ] Pass / [ ] Fail

### PERF-003: Час завантаження файлу

- **Запит**: `POST /api/recipes/` з 2MB jpg файлом
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Час завантаження < 5 секунд
  - Файл успішно завантажено на Cloudinary
- **Статус**: [ ] Pass / [ ] Fail

### PERF-004: Максимальний розмір файлу

- **Запит**: `POST /api/recipes/` з 100MB jpg файлом
- **Cookies**: accessToken, refreshToken, sessionId
- **Очікування**:
  - Status: 400 або 413 Payload Too Large
  - Message про максимальний розмір файлу
- **Статус**: [ ] Pass / [ ] Fail

---

## 🔒 **ТЕСТИ БЕЗПЕКИ (4 перевірки)**

### SEC-001: SQL Injection спроба

- **Запит**: `GET /api/recipes?keyword=1' OR '1'='1`
- **Очікування**:
  - Status: 200 OK
  - Немає SQL помилок в response
  - Результати безпечні
- **Статус**: [ ] Pass / [ ] Fail

### SEC-002: NoSQL Injection спроба

- **Запит**: `GET /api/recipes?keyword={"$gt":""}`
- **Очікування**:
  - Status: 200 OK
  - Немає несподіваних результатів
- **Статус**: [ ] Pass / [ ] Fail

### SEC-003: JWT Token подвійне використання

- **Запит**: Старий accessToken (після refresh)
- **Очікування**:
  - Status: 401 Unauthorized
  - Старий токен більше не валіден
- **Статус**: [ ] Pass / [ ] Fail

### SEC-004: CSRF атака спроба

- **Запит**: `POST /api/recipes/` з неправильного origin
- **Очікування**:
  - Status: 403 Forbidden
  - Або CORS помилка
  - Запит заблокований
- **Статус**: [ ] Pass / [ ] Fail

---

## 🔄 **REGRESSION TEST SUITE (15 базових тестів)**

Ці тести повинні проходити щоразу після будь-яких змін:

```
[ ] REG-001: Реєстрація → Вхід → Отримання рецептів
[ ] REG-002: Вхід → Створення рецепта → Отримання моїх рецептів
[ ] REG-003: Вхід → Додання до улюблених → Отримання улюблених
[ ] REG-004: Отримання категорій → Фільтрування по категорії
[ ] REG-005: Отримання інгредієнтів → Фільтрування по інгредієнту
[ ] REG-006: Поточний користувач має правильний масив улюблених
[ ] REG-007: Рецепт має власника (creator)
[ ] REG-008: Вихід → Спроба отримати моїх рецептів → 401
[ ] REG-009: Помилка валідації має правильну структуру
[ ] REG-010: Пагінація працює коректно
[ ] REG-011: Пошук та фільтрація працюють разом
[ ] REG-012: Cookies встановлюються та передаються коректно
[ ] REG-013: Refresh токен оновлює сесію коректно
[ ] REG-014: Зображення завантажується на Cloudinary
[ ] REG-015: Помилки мають консистентний формат
```

---

## 📊 **ТАБЛИЦЯ РЕЗУЛЬТАТІВ**

### Статистика за категоріями

| Категорія      | Кількість | Passed | Failed | % Pass   |
| -------------- | --------- | ------ | ------ | -------- |
| Аутентифікація | 11        | \_     | \_     | \_\_     |
| Рецепти        | 17        | \_     | \_     | \_\_     |
| Улюблені       | 7         | \_     | \_     | \_\_     |
| Категорії      | 1         | \_     | \_     | \_\_     |
| Інгредієнти    | 1         | \_     | \_     | \_\_     |
| Edge Cases     | 5         | \_     | \_     | \_\_     |
| Performance    | 4         | \_     | \_     | \_\_     |
| Безпека        | 4         | \_     | \_     | \_\_     |
| Regression     | 15        | \_     | \_     | \_\_     |
| **ВСЬОГО**     | **65**    | **\_** | **\_** | **\_\_** |

---

## 🎯 **КРИТЕРІЇ ПРИЙНЯТТЯ**

- ✅ **Pass**: Всі основні тести (11 + 17 + 7 + 1 + 1) = **37 тестів MUST PASS**
- ✅ **Good**: Плюс 80% Edge Cases та Performance = **42 тести**
- ✅ **Excellent**: Плюс 100% Security та Regression = **65 тестів**

---

## 📝 **ЛОГУВАННЯ ПОМИЛОК**

При виявленні помилки заповніть:

```
Test ID: ___________
Date: ___________
Status Code: ___________
Expected: ___________
Actual: ___________
Error Message: ___________
Steps to Reproduce: ___________
Severity: [ ] Critical [ ] Major [ ] Minor [ ] Trivial
```

---

## 🚀 **ПРИЛАШТУВАННЯ ДО ТЕСТУВАННЯ**

```bash
# Перед тестуванням
1. Запустити сервер: npm run dev
2. Переконатися, що MongoDB запущена
3. Очистити базу або використати test DB
4. Скопіювати swagger-output.json в Postman
5. Встановити environment variables для API URL
```

---

**Статус**: ✅ ГОТОВИЙ ДО ТЕСТУВАННЯ  
**QA Рівень**: 📚 Комплексний чек-лист
