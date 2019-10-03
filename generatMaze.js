// функция построит лабиринт (процесс построения на экране виден не будет)
function generatMaze (columnsNumber, rowsNumber, tractorsNumber = 1) {
	const map = []
	// Тракторы, которые будут очищать дорожки в лабиринте
	const tractors = []

	for (let y = 0; y < rowsNumber; y++) {
		const row = []

		for (let x = 0; x < columnsNumber; x++) {
			row.push('wall')
		}

		map.push(row)
	}

	const startX = getRandomFrom(Array(columnsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))
	const startY = getRandomFrom(Array(rowsNumber).fill(0).map((item, index) => index).filter(x => isEven(x)))

	// создаем тракторы
	for (let i = 0; i < tractorsNumber; i++) {
		tractors.push({ x: startX, y: startY })
	}

	// сделаем ячейку, в которой изначально стоит трактор, пустой
	setField(startX, startY, 'space')

	// если лабиринт ещё не готов, рисовать трактор и регистрировать функцию tick() ещё раз
	while (!isMaze()) {
		moveTractors()
	}

	return map

	// получить значение из матрицы
	function getField (x, y) {
		if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
			return null
		}

		return map[y][x]
	}

	// записать значение в матрицу
	function setField (x, y, value) {
		if (x < 0 || x >= columnsNumber || y < 0 || y >= rowsNumber) {
			return null
		}

		map[y][x] = value
	}

	// функция возвращает случайный элемент из переданного ей массива
	function getRandomFrom (array) {
		// получаем случайным образом индекс элемента массива
		// число будет в диапазоне от 0 до количества элементов в массиве - 1
		const index = Math.floor(Math.random() * array.length)
		// возвращаем элемент массива с полученным случайным индексом
		return array[index]
	}

	/*
		функция проверяет четное число или нет
		если возвращает true - четное
	*/
	function isEven (n) {
		return n % 2 === 0
	}

	// функция проверяет, готов лабиринт или ещё нет
	// возвращает true, если лабиринт готов, false если ещё нет
	function isMaze () {
		for (let x = 0; x < columnsNumber; x++) {
			for (let y = 0; y < rowsNumber; y++) {
				if (isEven(x) && isEven(y) && getField(x, y) === 'wall') {
					return false
				}
			}
		}

		return true
	}

	/*
		функция заставляет трактора двигаться
		трактор должен двигаться на 2 клетки
		если вторая клетка со стеной, то нужно очистить первую и вторую
	*/
	function moveTractors () {
		for (const tractor of tractors) {
			// массив с возможными направлениями трактора
			const directs = []

			if (tractor.x > 0) {
				directs.push('left')
			}

			if (tractor.x < columnsNumber - 2) {
				directs.push('right')
			}

			if (tractor.y > 0) {
				directs.push('up')
			}

			if (tractor.y < rowsNumber - 2) {
				directs.push('down')
			}

			// случайным образом выбрать направление, в котором можно пойти
			const direct = getRandomFrom(directs)

			switch (direct) {
				case 'left':
					if (getField(tractor.x - 2, tractor.y) === 'wall') {
						setField(tractor.x - 1, tractor.y, 'space')
						setField(tractor.x - 2, tractor.y, 'space')
					}
					tractor.x -= 2
					break
				case 'right':
					if (getField(tractor.x + 2, tractor.y) === 'wall') {
						setField(tractor.x + 1, tractor.y, 'space')
						setField(tractor.x + 2, tractor.y, 'space')
					}
					tractor.x += 2
					break
				case 'up':
					if (getField(tractor.x, tractor.y - 2) === 'wall') {
						setField(tractor.x, tractor.y - 1, 'space')
						setField(tractor.x, tractor.y - 2, 'space')
					}
					tractor.y -= 2
					break
				case 'down':
					if (getField(tractor.x, tractor.y + 2) === 'wall') {
						setField(tractor.x, tractor.y + 1, 'space')
						setField(tractor.x, tractor.y + 2, 'space')
					}
					tractor.y += 2
					break
			}
		}
	}
}