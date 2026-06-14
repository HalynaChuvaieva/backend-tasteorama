# 📚 Tasteorama API - Повна Swagger Документація

## ✅ Що було зроблено

Створена **повна професійна Swagger 2.0 документація** для API проекту Tasteorama. Документація готова для використання QA-інженерами та фронтенд-розробниками.

### 📋 Структура документації

#### 1. **Інформація про API**

- Назва: Tasteorama API
- Версія: 1.0.0
- Контакт: support@tasteorama.com
- Опис: Повнофункціональний API для управління рецептами, інгредієнтами та улюбленими рецептами

#### 2. **Схеми (Definitions)**

Визначені всі основні моделі даних з повними описами:

- `User` - Модель користувача (окрім пароля у відповідях)
- `RegisterRequest` - Запит реєстрації
- `LoginRequest` - Запит входу
- `Ingredient` - Інгредієнт з описом та зображенням
- `Recipe` - Повна схема рецепта
- `Category` - Категорія рецепта
- `RecipesListResponse` - Відповідь з пагінацією
- `FavoritesResponse` - Відповідь з улюбленими рецептами
- `ErrorResponse` - Стандартна помилка

#### 3. **Теги (Tags) - Групування endpoints**

```
- Authentication (4 endpoint)
- Recipes (3 endpoint)
- Favorites (3 endpoint)
- Categories (1 endpoint)
- Ingredients (1 endpoint)
```

#### 4. **Endpoints - Повний список**

### 🔐 **AUTHENTICATION (Аутентифікація)**

#### POST /auth/register

- **Опис**: Реєстрація нового користувача
- **Body**: `{ name, email, password }`
- **Відповідь**: 201 - User об'єкт
- **Помилки**: 400 - Email вже існує або некоректні дані

#### POST /auth/login

- **Опис**: Вхід в акаунт
- **Body**: `{ email, password }`
- **Відповідь**: 200 - User об'єкт
- **Помилки**: 401 - Невірні облікові дані

#### POST /auth/refresh

- **Опис**: Оновлення сесії
- **Вимагає**: sessionId та refreshToken у cookies
- **Відповідь**: 200 - Message "Сесія оновлена"
- **Помилки**: 401 - Відсутні облікові дані або сесія закінчилася

#### POST /api/auth/logout

- **Опис**: Вихід з акаунта
- **Вимагає**: Authentication (cookie з accessToken)
- **Відповідь**: 204 - No Content
- **Помилки**: 401 - Не аутентифіковано

---

### 🍳 **RECIPES (Рецепти)**

#### GET /api/recipes

- **Опис**: Отримати всі рецепти з фільтруванням та пошуком
- **Query параметри**:
  - `page` (за замовчуванням: 1) - Номер сторінки
  - `perPage` (за замовчуванням: 10, max: 50) - Рецептів на сторінці
  - `category` - Фільтр за категорією
  - `ingredient` - Фільтр за назвою інгредієнта
  - `keyword` - Пошук за назвою/описом
- **Відповідь**: 200 - RecipesListResponse (масив з пагінацією)
- **Помилки**: 400 - Некоректні параметри

#### GET /api/recipes/{recipeId}

- **Опис**: Отримати один рецепт з повною інформацією про інгредієнти
- **Path параметри**: `recipeId` (MongoDB ObjectId)
- **Відповідь**: 200 - RecipeDetailResponse
- **Помилки**: 404 - Рецепт не знайдено

#### POST /api/recipes/

- **Опис**: Створити новий рецепт (ВИМАГАЄ AUTHENTICATION)
- **Content-Type**: multipart/form-data
- **Form Data**:
  - `title` (string, max: 64) - Назва рецепта
  - `description` (string, max: 200) - Опис
  - `time` (number, 1-360) - Час у хвилинах
  - `calories` (number, опціонально, 1-10000) - Калорійність
  - `category` (string) - Категорія (повинна існувати)
  - `ingredients` (JSON string) - JSON масив інгредієнтів:
    ```json
    [
      { "id": "507f...", "measure": "500g" },
      { "id": "507f...", "measure": "200ml" }
    ]
    ```
    Мінімум 2, максимум 16
  - `instructions` (string, max: 1200) - Покрокові інструкції
  - `image` (file, binary) - Файл зображення
- **Відповідь**: 201 - Recipe об'єкт
- **Помилки**:
  - 400 - Відсутнє зображення, категорія не знайдена, некоректні дані
  - 401 - Не аутентифіковано

#### GET /api/my/recipes

- **Опис**: Отримати мої рецепти (ВИМАГАЄ AUTHENTICATION)
- **Query параметри**:
  - `page` (за замовчуванням: 1)
  - `perPage` (за замовчуванням: 10, max: 50)
- **Відповідь**: 200 - MyRecipesResponse (рецепти поточного користувача)
- **Помилки**: 401 - Не аутентифіковано

---

### ⭐ **FAVORITES (Улюблені рецепти)**

#### POST /api/recipes/{recipeId}/favorite

- **Опис**: Додати рецепт до улюблених (ВИМАГАЄ AUTHENTICATION)
- **Path параметри**: `recipeId`
- **Відповідь**: 200 - AddToFavoritesResponse з масивом ID улюблених
- **Помилки**:
  - 401 - Не аутентифіковано
  - 404 - Рецепт не знайдено

#### DELETE /api/recipes/{recipeId}/favorite

- **Опис**: Видалити рецепт з улюблених (ВИМАГАЄ AUTHENTICATION)
- **Path параметри**: `recipeId`
- **Відповідь**: 200 - RemoveFromFavoritesResponse
- **Помилки**:
  - 401 - Не аутентифіковано
  - 404 - Рецепт не знайдено

#### GET /api/recipes/favorites

- **Опис**: Отримати всі улюблені рецепти (ВИМАГАЄ AUTHENTICATION)
- **Відповідь**: 200 - FavoritesResponse (масив улюблених рецептів + total)
- **Помилки**: 401 - Не аутентифіковано

---

### 🏷️ **CATEGORIES (Категорії)**

#### GET /api/categories

- **Опис**: Отримати всі доступні категорії рецептів
- **Відповідь**: 200 - Масив Category об'єктів
- **Приклад**:
  ```json
  [
    { "_id": "507f...", "name": "Основні страви" },
    { "_id": "507f...", "name": "Сніданки" },
    { "_id": "507f...", "name": "Десерти" }
  ]
  ```

---

### 🥘 **INGREDIENTS (Інгредієнти)**

#### GET /api/ingredients

- **Опис**: Отримати повний список доступних інгредієнтів
- **Відповідь**: 200 - Масив Ingredient об'єктів
- **Структура**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Курине філе",
    "desc": "Свіже курине філе високої якості",
    "img": "https://example.com/chicken.jpg"
  }
  ```

---

## 🔐 **SECURITY (Безпека)**

- **Тип**: Cookie-based authentication with JWT
- **Токени у cookies**:
  - `accessToken` - Основний токен доступу
  - `refreshToken` - Токен для оновлення сесії
  - `sessionId` - ID сесії в БД

**Всі endpoints, що вимагають аутентифікації, позначені маркером** 🔒

---

## 📊 **VALIDATION RULES (Правила валідації)**

### Користувач

- `name`: max 16 символів
- `email`: valid email format, max 128, унікальний
- `password`: min 8, max 128 символів

### Рецепт

- `title`: max 64 символи
- `description`: max 200 символів
- `time`: 1-360 хвилин
- `calories`: 1-10000 (опціонально)
- `ingredients`: 2-16 інгредієнтів
- `instructions`: max 1200 символів

### Пагінація

- `page`: мінімум 1, ціле число
- `perPage`: 1-50, ціле число

---

## 🎯 **ПРИКЛАДИ ВИКОРИСТАННЯ**

### Реєстрація

```bash
POST /auth/register
Content-Type: application/json

{
  "name": "Іван Петров",
  "email": "ivan@example.com",
  "password": "SecurePassword123"
}
```

### Вхід та отримання cookies

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "ivan@example.com",
  "password": "SecurePassword123"
}
# Відповідь включає cookies: accessToken, refreshToken, sessionId
```

### Створення рецепта

```bash
POST /api/recipes/
Content-Type: multipart/form-data
Cookie: accessToken=...

--form "title=Паста Карбонара"
--form "description=Класичне італійське блюдо"
--form "time=30"
--form "category=Основні страви"
--form "ingredients=[{\"id\":\"507f...\",\"measure\":\"500g\"},{\"id\":\"507f...\",\"measure\":\"4\"}]"
--form "instructions=1. Зварити макаронів\n2. Смажити бекон\n3. Змішати"
--form "image=@/path/to/image.jpg"
```

### Отримання рецептів з фільтром

```bash
GET /api/recipes?page=1&perPage=10&category=Основні%20страви&keyword=паста
```

### Додати до улюблених

```bash
POST /api/recipes/507f1f77bcf86cd799439011/favorite
Cookie: accessToken=...
```

---

## 📝 **HTTP STATUS CODES**

- `200 OK` - Успішний запит
- `201 Created` - Ресурс успішно створено
- `204 No Content` - Успішна операція без тіла відповіді (logout)
- `400 Bad Request` - Некоректні дані або валідація не пройшла
- `401 Unauthorized` - Вимагається аутентифікація або невірні облікові дані
- `404 Not Found` - Ресурс не знайдено
- `500 Internal Server Error` - Помилка сервера

---

## 🔄 **WORKFLOW - Типовий життєвий цикл**

1. **Реєстрація** → POST /auth/register
2. **Вхід** → POST /auth/login (отримуємо cookies)
3. **Перегляд рецептів** → GET /api/recipes (з фільтруванням)
4. **Перегляд деталей** → GET /api/recipes/{id}
5. **Створення рецепта** → POST /api/recipes/ (вимагає auth)
6. **Додання до улюблених** → POST /api/recipes/{id}/favorite
7. **Перегляд улюбленого** → GET /api/recipes/favorites
8. **Оновлення сесії** → POST /auth/refresh (якщо токен скоро закінчиться)
9. **Вихід** → POST /api/auth/logout

---

## 📋 **ТЕСТУВАННЯ У SWAGGER UI**

Документація доступна за URL:

```
http://localhost:3000/api-docs
```

Там можна:

- Переглянути всі endpoints та їх описи
- Посмотрити приклади запитів та відповідей
- Скопіювати curl команди
- Протестувати endpoints прямо з UI (якщо включена підтримка)

---

## 🛠️ **ФАЙЛИ**

- **swagger.js** - Конфігурація Swagger (визначення моделей, метадані)
- **swagger-output.json** - Згенерована документація у форматі Swagger 2.0

---

## 📌 **ЗАМІТКИ ДЛЯ QA**

✅ Всі endpoints задокументовані з прикладами
✅ Всі параметри включають описи та обмеження
✅ Всі можливі коди відповідей описані
✅ Всі помилки включають приклади
✅ Формат запитів/відповідей чітко визначено
✅ Вимоги щодо Authentication явно вказані
✅ Правила валідації задокументовані

---

Документація готова до використання для повного тестування API проекту! 🚀
