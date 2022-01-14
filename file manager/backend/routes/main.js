// Главный роутинг routing main /

// Подключаем модуль файловой системы
const fs = require("fs");

// Если кто то будет посылать запросы на данный адрес, то мы отвечаем данным роутингом на запрос
module.exports = function (app) {
    // Функция для проверки пути
    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
    }

    // app.get - когда идет обращение к "/" роутингу с методом get
    // То запрос будет в переменной req а ответ в res
    app.get("/", (req, res) => {
        // Базовый путь
        const base = "./files/";
        // Путь который передает пользователь
        let path = "";

        if ("path" in req.query) {
            path = req.query.path;
        }

        // Проверяем путь
        if (isFolder(base + path)) {
            // item - имя файла, проверяем каждый item, директория или нет
            let files = fs.readdirSync(base + path).map(item => {
                // Проверяем, директория или нет
                const isDir = fs.lstatSync(base + path + "/" + item).isDirectory();
                let size = 0;
                if (!isDir) {
                    // Если не директория, то записываем размер файла
                    size = fs.statSync(base + path + "/" + item);
                    console.log(size.size);
                }

                // Возвращаем объект с названием, размером и булевым значение, директория или нет
                return {
                    name: item,
                    dir: isDir,
                    size: size.size ?? 0
                };
            });
            res.json({
                path: path,
                result: true,
                files: files
            });
        }

        // res.end закончит обращение и выведет ответ
        // res.end("main");
    });
}