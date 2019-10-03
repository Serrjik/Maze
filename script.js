const COLUMNS_SIZE = 151 // количество колонок в лабиринте
const ROWS_SIZE = 151 // количество строк в лабиринте
const FIELD_SIZE = 7 // размер клетки в лабиринте
const PADDING = 10 // рамка (отступ внутри канваса)
// количество тракторов, которые должны быть на поле
const TRACTORS_NUMBER = 20

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const map = generatMaze(COLUMNS_SIZE, ROWS_SIZE, TRACTORS_NUMBER)

// начальная позиция (будем искать по щелчку мыши)
let startPosition = null
// конечная позиция (будем искать по щелчку мыши)
let finishPosition = null

init()
start()

// функция изначально регистрирует функцию tick() в requestAnimationFrame
function start () {
	// requestAnimationFrame() позволяет регистрировать функцию, которая будет вызвана перед обновлением экрана
	requestAnimationFrame(tick)
	/*
		функция принимает аргументы (за каким DOM-элементом следить,
		функция_которая принимает аргумент mouse и с этим аргументом можно делать манипуляции)
	*/
	mouseWatcher(canvas, function (mouse) {
		if (mouse.x <= PADDING
			|| mouse.y <= PADDING
			|| mouse.x >= canvas.width - PADDING
			|| mouse.y >= canvas.height - PADDING
		) {
			return
		}

		const coordinats = {
			x: parseInt((mouse.x - PADDING) / FIELD_SIZE),
			y: parseInt((mouse.y - PADDING) / FIELD_SIZE)
		}

		console.log(coordinats)

		// рассматривается ячейка, над которой в данный момент находится мышь
		// если в ячейке не стена, то пусть эта ячейка будет финишной позицией
		// иначе финишной позицией останется последняя актуальная финишная позиция
		if (getField(coordinats.x, coordinats.y) === 'space') {
			finishPosition = coordinats
		}
	})
}

/*
	функция tick() принимает timestamp, потому что вызывается с помощью requestAnimationFrame
	timestamp - количество миллисекунд с момента открытия, обновления страницы
*/
function tick (timestamp) {
	clearCanvas()
	drawMap()

	// Если определены начальная и конечная точки, искать путь
	if (startPosition && finishPosition) {
		const way = getWay(map, startPosition, finishPosition)
		// console.log(way)
		drawWay(way)
	}

	requestAnimationFrame(tick)
}

// функция инициализирует стартовые данные
function init () {
	// размеры канваса
	canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE
	canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE

	/*
		по клику на лабиринт определим начальную позицию пути
		координаты стартовой позиции будут определяться совпадающими
		с координатами финишной позиции
	*/
	canvas.addEventListener('click', function (event) {
		if (finishPosition) {
			startPosition = {
				x: finishPosition.x,
				y: finishPosition.y
			}
		}
	})
}

// функция отрисовывает карту
function drawMap () {
	for (let x = 0; x < COLUMNS_SIZE; x++) {
		for (let y = 0; y < ROWS_SIZE; y++) {
			if (getField(x, y) === 'wall') {
				context.fillStyle = 'black'
				context.beginPath()
				context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
				context.fill()
			}
		}
	}
}

// функция рисует путь от начальной ячейки к конечной
function drawWay (way) {
	// так как каждая ячейка это по сути массив с координатами x, y,
	// то их в цикле можно сразу забрать в переменную [x, y]
	for (const [x, y] of way) {
		context.fillStyle = 'red'
		context.beginPath()
		context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
		context.fill()
	}
}

// функция очищает canvas
function clearCanvas () {
	// Здесь создается рамка (черное поле, затем внутри нарисуем белое)
	// каким цветом делать заливку
	context.fillStyle = 'black'
	// создать новую элементарную геометрическую фигуру
	context.beginPath()
	// прямоугольник (верхний левый угол, ширина и высота прямоугольника)
	context.rect(0, 0, canvas.width, canvas.height)
	// залить фигуру выбранным для заливки цветом
	context.fill()

	// здесь создается белое поле внутри рамки
	context.fillStyle = 'white'
	context.beginPath()
	context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2)
	context.fill()
}

// получить значение из матрицы
function getField (x, y) {
	if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
		return null
	}

	return map[y][x]
}

// записать значение в матрицу
function setField (x, y, value) {
	if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
		return null
	}

	map[y][x] = value
}
