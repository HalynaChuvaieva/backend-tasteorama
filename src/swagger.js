import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Tasteorama API',
    version: '1.0.0',
    description:
      'Повнофункціональний API для управління рецептами, інгредієнтами та улюбленими рецептами. Включає аутентифікацію користувачів, управління профілем, створення та пошук рецептів.',
    contact: {
      name: 'Tasteorama Support',
      email: 'support@tasteorama.com',
    },
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json'],
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'accessToken',
      description: 'JWT токен у cookie для аутентифікації',
    },
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', format: 'email', example: 'john@example.com' },
        avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
        favorites: {
          type: 'array',
          items: { type: 'string' },
          example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
    Ingredient: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        name: { type: 'string', example: 'Chicken' },
        desc: { type: 'string', example: 'Fresh chicken breast' },
        img: { type: 'string', example: 'https://example.com/chicken.jpg' },
      },
    },
    RecipeIngredient: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        measure: { type: 'string', example: '500g' },
      },
    },
    Recipe: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        title: { type: 'string', example: 'Chicken Pasta' },
        description: {
          type: 'string',
          example: 'Delicious Italian pasta with chicken',
        },
        time: { type: 'number', example: 30 },
        calories: { type: 'number', example: 450 },
        category: { type: 'string', example: 'main course' },
        ingredients: {
          type: 'array',
          items: { $ref: '#/definitions/RecipeIngredient' },
        },
        instructions: {
          type: 'string',
          example: 'Cook pasta, add chicken, mix sauce',
        },
        image: { type: 'string', example: 'https://example.com/pasta.jpg' },
        owner: { type: 'string', example: '507f1f77bcf86cd799439011' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
    Category: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        name: { type: 'string', example: 'Main Courses' },
      },
    },
    RecipesListResponse: {
      type: 'object',
      properties: {
        page: { type: 'number', example: 1 },
        perPage: { type: 'number', example: 10 },
        totalRecipes: { type: 'number', example: 100 },
        totalPages: { type: 'number', example: 10 },
        recipes: {
          type: 'array',
          items: { $ref: '#/definitions/Recipe' },
        },
      },
    },
    Error: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Error message' },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Endpoints для аутентифікації користувачів',
    },
    {
      name: 'Recipes',
      description: 'Endpoints для управління рецептами',
    },
    {
      name: 'Favorites',
      description: 'Endpoints для управління улюбленими рецептами',
    },
    {
      name: 'Categories',
      description: 'Endpoints для отримання категорій рецептів',
    },
    {
      name: 'Ingredients',
      description: 'Endpoints для отримання списку інгредієнтів',
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = [
  './routes/authRoutes.js',
  './routes/userRoutes.js',
  './routes/recipesRoutes.js',
  './routes/categoriesRoutes.js',
  './routes/ingredientsRoute.js',
];

swaggerAutogen()(outputFile, routes, doc);
