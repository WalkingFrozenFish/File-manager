// Файл с роутами routes/index.js

// Подключаем роуты
const mainRoutes = require("./main");

module.exports = function (app) {
    mainRoutes(app);
}