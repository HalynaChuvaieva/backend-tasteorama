# 🚀 Tasteorama API - Швидкий довідник

## 📚 Документація

- **Повна документація**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **QA Чек-лист**: [QA_TESTING_CHECKLIST.md](QA_TESTING_CHECKLIST.md)
- **Swagger JSON**: `src/swagger-output.json`
- **Swagger Конфіг**: `src/swagger.js`

---

## 🔗 API BASE URL

```
http://localhost:3000
```

---

## 🗂️ API ENDPOINTS - ШВИДКА СПРАВКА

### 🔐 Аутентифікація

```
POST   /auth/register              # Реєстрація
POST   /auth/login                 # Вхід
POST   /auth/refresh               # Оновити сесію
POST   /api/auth/logout            # Вихід (вимагає auth)
```

### 🍳 Рецепти

```
GET    /api/recipes                # Всі рецепти (фільтрація, пошук, пагінація)
GET    /api/recipes/{id}           # Один рецепт
POST   /api/recipes/               # Створити рецепт (вимагає auth, multipart)
GET    /api/my/recipes             # Мої рецепти (вимагає auth)
```

### ⭐ Улюблені

```
POST   /api/recipes/{id}/favorite  # Додати до улюблених (вимагає auth)
DELETE /api/recipes/{id}/favorite  # Видалити з улюблених (вимагає auth)
GET    /api/recipes/favorites      # Отримати улюблене (вимагає auth)
```

### 🏷️ Категорії та Інгредієнти

```
GET    /api/categories             # Всі категорії
GET    /api/ingredients            # Всі інгредієнти
```

---

## 📝 ПРИКЛАДИ BODY

### Реєстрація

```json
{
  "name": "Ivan Petrov",
  "email": "ivan@example.com",
  "password": "SecurePass123"
}
```

### Вхід

```json
{
  "email": "ivan@example.com",
  "password": "SecurePass123"
}
```

### Створення Рецепта (form-data)

```
title:       "Pasta Carbonara"
description: "Classic Italian dish"
time:        30
calories:    450
category:    "Main Courses"
ingredients: [{"id":"507f...","measure":"500g"},{"id":"507f...","measure":"200ml"}]
instructions:"1. Cook pasta\n2. Fry bacon\n3. Mix"
image:       <file>
```

---

## 🔍 QUERY ПАРАМЕТРИ

### Пошук та Фільтр Рецептів

```
GET /api/recipes
  ?page=1              # Номер сторінки (за замовчуванням: 1)
  &perPage=10          # Кількість елементів на сторінці (за замовчуванням: 10, max: 50)
  &category=Desserts   # Фільтр за категорією
  &ingredient=Sugar    # Фільтр за назвою інгредієнта
  &keyword=chocolate   # Пошук у назві/описі
```

### Пагінація

```
GET /api/my/recipes
  ?page=1
  &perPage=10
```

---

## 🍪 COOKIES (Аутентифікація)

Після успішного входу/реєстрації cookies автоматично встановлюються:

```
accessToken   # JWT токен для запитів API (短-lived)
refreshToken  # Токен для отримання нового accessToken (long-lived)
sessionId     # ID сесії в базі даних
```

Всі автентифіковані запити автоматично надсилають ці cookies.

---

## ❌ ВІДПОВІДІ ПРИ ПОМИЛКАХ

```json
{
  "status": 400,
  "message": "Error description"
}
```

### Частіші Помилки

- **400 Bad Request**: Валідація не пройшла
- **401 Unauthorized**: Не аутентифіковано або невірні облікові дані
- **404 Not Found**: Ресурс не знайдено
- **500 Internal Server Error**: Помилка сервера

---

## 🧪 ШВИДКИЙ ТЕСТ З CURL

### Реєстрація

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "email":"test@example.com",
    "password":"Pass123456"
  }'
```

### Вхід (отримати cookies)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email":"test@example.com",
    "password":"Pass123456"
  }'
```

### Отримати Всі Рецепти

```bash
curl http://localhost:3000/api/recipes
```

### Отримати Рецепт за ID

```bash
curl http://localhost:3000/api/recipes/{id}
```

### Отримати Мої Рецепти (з cookies)

```bash
curl http://localhost:3000/api/my/recipes \
  -b cookies.txt
```

### Створити Рецепт (з cookies та файлом)

```bash
curl -X POST http://localhost:3000/api/recipes/ \
  -b cookies.txt \
  -F "title=Pasta" \
  -F "description=Italian" \
  -F "time=30" \
  -F "category=Main Courses" \
  -F "ingredients=[{\"id\":\"507f...\",\"measure\":\"500g\"}]" \
  -F "instructions=Cook pasta" \
  -F "image=@./image.jpg"
```

### Додати до Улюблених (з cookies)

```bash
curl -X POST http://localhost:3000/api/recipes/{id}/favorite \
  -b cookies.txt
```

### Отримати Улюблене

```bash
curl http://localhost:3000/api/recipes/favorites \
  -b cookies.txt
```

### Вихід

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

---

## 📊 ТАБЛИЦЯ ПРАВИЛ ВАЛІДАЦІЇ

| Поле         | Мін | Макс  | Тип    | Обов'язково |
| ------------ | --- | ----- | ------ | ----------- |
| name         | 1   | 16    | string | ✓           |
| email        | -   | 128   | email  | ✓           |
| password     | 8   | 128   | string | ✓           |
| title        | 1   | 64    | string | ✓           |
| description  | 1   | 200   | string | ✓           |
| time         | 1   | 360   | number | ✓           |
| calories     | 1   | 10000 | number | ✗           |
| ingredients  | 2   | 16    | array  | ✓           |
| instructions | 1   | 1200  | string | ✓           |
| page         | 1   | -     | number | ✗           |
| perPage      | 1   | 50    | number | ✗           |

---

## 🔐 ПОТОк АУТЕНТИФІКАЦІЇ

```
1. POST /auth/register
   → 201 Created + cookies (accessToken, refreshToken, sessionId)

2. POST /auth/login
   → 200 OK + cookies (НОВИЙ accessToken, refreshToken, sessionId)

3. Використовувати accessToken у Cookie для захищених endpoints
   → 401 якщо токен закінчився

4. POST /auth/refresh (якщо accessToken близький до закінчення)
   → 200 OK + НОВИЙ cookies

5. POST /api/auth/logout
   → 204 No Content + cookies очищені
```

---

## 📋 МОДЕЛІ ДАНИХ

### User

```
_id: ObjectId
name: string (16 max)
email: string (унікальний, email формат)
password: string (захеширований, ніколи не повертається)
avatar: string (url)
favorites: ObjectId[] (ID рецептів)
createdAt: timestamp
updatedAt: timestamp
```

### Recipe

```
_id: ObjectId
title: string (64 max)
description: string (200 max)
time: number (1-360 хвилин)
calories: number (опціонально)
category: string (з Categories)
ingredients: [{id: ObjectId, measure: string}]
instructions: string (1200 max)
image: string (Cloudinary URL)
owner: ObjectId (User ID)
createdAt: timestamp
updatedAt: timestamp
```

### Ingredient

```
_id: ObjectId
name: string
desc: string
img: string (url)
```

### Category

```
_id: ObjectId
name: string
```

---

## 🛠️ КОРИСНІ ІНСТРУМЕНТИ

### Імпорт Postman Collection

Скопіюйте URL для імпорту в Postman:

```
http://localhost:3000/swagger-output.json
```

### Тестування в Браузері

Всі GET endpoints можна протестувати в браузері:

```
http://localhost:3000/api/recipes
http://localhost:3000/api/categories
http://localhost:3000/api/ingredients
```

### cURL з JSON файлом

```bash
curl -X POST http://localhost:3000/api/recipes/ \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d @recipe.json
```

---

## 🔄 КОДИ СТАТУСУ ВІДПОВІДЕЙ

| Код | Значення     | Приклад             |
| --- | ------------ | ------------------- |
| 200 | OK           | GET запит успішний  |
| 201 | Created      | POST запит успішний |
| 204 | No Content   | Вихід успішний      |
| 400 | Bad Request  | Помилка валідації   |
| 401 | Unauthorized | Не аутентифіковано  |
| 404 | Not Found    | Рецепт не існує     |
| 500 | Server Error | Помилка бази даних  |

---

## 📌 ЧАСТІШІ ПОМИЛКИ

❌ **Забуття використовувати form-data для POST /api/recipes/**

- Повинно бути multipart/form-data, а не application/json
- Включити файл зображення

❌ **Не передавати ingredients як JSON string**

- Form поле "ingredients" повинно бути: `[{"id":"...","measure":"..."}]`
- Не звичайний текст

❌ **Використовування неправильної назви категорії**

- Повинна існувати в колекції Categories
- Порівняння без урахування регістру

❌ **Невірний формат MongoDB ObjectId**

- Повинен бути 24-символьна hex строка
- Приклад: `507f1f77bcf86cd799439011`

❌ **Забуття cookies в автентифікованих запитах**

- Передати `-b cookies.txt` у curl
- Cookies встановлюються автоматично у браузері

---

## ✅ НАЙКРАЩІ ПРАКТИКИ

✓ Завжди перевіряйте код статусу відповіді спочатку
✓ Обробіть помилки 400 з повідомленням валідації на фронтенді
✓ Оновіть сесію перед тим, як accessToken закінчиться
✓ Зберігайте refreshToken безпечно
✓ Валідуйте вхідні дані на фронтенді перед відправленням
✓ Використовуйте пагінацію з розумним значенням perPage
✓ Кешуйте категорії та інгредієнти локально
✓ Відображайте кількість user.favorites у UI

---

## 🚀 ПОЧАТОК РОБОТИ

```bash
# Встановити залежності
npm install

# Запустити сервер розробки
npm run dev

# Генерувати документацію Swagger
npm run swagger

# Сервер запуститься на:
# http://localhost:3000

# Документація Swagger доступна за:
# swagger-output.json (JSON файл)
```

---

**Питання? Перевірте [API_DOCUMENTATION.md](API_DOCUMENTATION.md) або [QA_TESTING_CHECKLIST.md](QA_TESTING_CHECKLIST.md)** 📖
