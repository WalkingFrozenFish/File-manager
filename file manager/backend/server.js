// Подключаем express
const express = require("express");

// Создание приложения, в котором будет идти вся работа
const app = express();

// Создание порта, в котором будет работать приложение
const port = 8000;

// Настроим подключение
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});

// Подключаем файл с роутами 
require("./routes/index")(app);

// Запускаем сервер, передаем порт для прослушки и коллбек функцию которая будет выполнена при запуске порта
app.listen(port, () => {
    console.log(`Server work on ${port} port`);
});