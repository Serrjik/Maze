# Генерация лабиринта на JS и поиск пути между 2-мя пунктами в нём

![maze](https://raw.githubusercontent.com/Serrjik/Maze/master/maze.jpg)

Создано во время интенсива школы [Webcademy.ru](https://webcademy.ru)

Ссылка на проект [https://serrjik.github.io/Maze/](https://serrjik.github.io/Maze/)

### Примененные технологии в проекте:

* HTML5
* canvas
* JavaScript

### Особенности генерации лабиринта

* Изначально лабиринт полностью заполнен стенами
* Ходы в лабиринте расчищают "тракторы"
* "Тракторы" "ходят" на 2 клетки в 4-х направлениях
* "Тракторы" изначально появляются в случайных четных клетках лабиринта
* Между любыми 2-мя клетками лабиринта только 1 путь

### Как ищутся пути

* Путь ищется от клетки, на которой кликнули мышью,
* до клетки, над которой стоит курсор
* Если курсор стоит над стеной, то путь будет показан до последней свободной клетки, над которой был курсор
* Если кликнуть на клетке со стеной, то после наведения курсора на свободную клетку путь начнет искаться от последней свободной клетки, над которой был курсор перед кликом на клетку со стеной
