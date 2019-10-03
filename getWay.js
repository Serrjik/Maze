// функция возвращает массив всех точек, которые составляют путь от первой выбранной точки до второй выбранной точки
function getWay (map, startPosition, finishPosition) {
	/*
		В JS массивы и объекты являются ссылочными сущностями
		Чтобы не создавать случайной мутации данных, создадим копию объекта map
	*/
	map = JSON.parse(JSON.stringify(map))

	/*
		Везде, где на карте проход - "space", поставим бесконечность
		В JS бесконечность обозначается числом Infinity
	*/
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (getField(x, y) === 'space') {
				setField(x, y, Infinity)
			}
		}
	}

	// В стартовой позиции поставим цифру 0
	setField(startPosition.x, startPosition.y, 0)

	/*
		Нужно выстроить в числовом порядке все те шаги,
		которые нужно проделать,
		чтобы добраться до последней ячейки
	*/

	/*
		Пройдем по всем элементам массива и для всех элементов, у которых значение число, но не Infinity,
		проведем определенную логику распространения этого значения - это будет само это значение + 1
	*/
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			// значение текущего элемента
			const value = getField(x, y)

			// если значение элемента число, и его значение не Infinity,
			// проведем распространение этого значения на соседние ячейки
			if (typeof value === 'number' && value !== Infinity) {
				if (x > 0 && typeof getField(x - 1, y) === 'number') {
					// ставим минимальное значение между значениями текущего элемента и соседнего
					const currentValue = getField(x - 1, y)
					setField(x - 1, y, Math.min(currentValue, value + 1))
				}

				if (x < map[y].length - 1 && typeof getField(x + 1, y) === 'number') {
					// ставим минимальное значение между значениями текущего элемента и соседнего
					const currentValue = getField(x + 1, y)
					setField(x + 1, y, Math.min(currentValue, value + 1))
				}
				// сверху
				if (y > 0 && typeof getField(x, y - 1) === 'number') {
					// ставим минимальное значение между значениями текущего элемента и соседнего
					const currentValue = getField(x, y - 1)
					setField(x, y - 1, Math.min(currentValue, value + 1))
				}
				// снизу
				if (y < map.length - 1 && typeof getField(x, y + 1) === 'number') {
					// ставим минимальное значение между значениями текущего элемента и соседнего
					const currentValue = getField(x, y + 1)
					setField(x, y + 1, Math.min(currentValue, value + 1))
				}
			}
		}
	}

	// повторять пока не найдем путь от начальной точки до конечной
	while (!isWay()) {
		/*
			Пройдем по всем элементам массива и для всех элементов, у которых значение число, но не Infinity,
			проведем определенную логику распространения этого значения - это будет само это значение + 1
		*/
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				// значение текущего элемента
				const value = getField(x, y)

				// если значение элемента число, и его значение не Infinity,
				// проведем распространение этого значения на соседние ячейки
				if (typeof value === 'number' && value !== Infinity) {
					// слева
					if (x > 0 && typeof getField(x - 1, y) === 'number') {
						const currentValue = getField(x - 1, y)
						// ставим минимальное значение между значениями текущего элемента и соседнего
						setField(x - 1, y, Math.min(currentValue, value + 1))
					}
					// справа
					if (x < map[y].length - 1 && typeof getField(x + 1, y) === 'number') {
						const currentValue = getField(x + 1, y)
						// ставим минимальное значение между значениями текущего элемента и соседнего
						setField(x + 1, y, Math.min(currentValue, value + 1))
					}
					// сверху
					if (y > 0 && typeof getField(x, y - 1) === 'number') {
						const currentValue = getField(x, y - 1)
						// ставим минимальное значение между значениями текущего элемента и соседнего
						setField(x, y - 1, Math.min(currentValue, value + 1))
					}
					// снизу
					if (y < map.length - 1 && typeof getField(x, y + 1) === 'number') {
						const currentValue = getField(x, y + 1)
						// ставим минимальное значение между значениями текущего элемента и соседнего
						setField(x, y + 1, Math.min(currentValue, value + 1))
					}
				}
			}
		}
	}

	// массив всех элементов, которые соответствуют нашему пути
	const fields = []

	// финиш
	const position = {
		x: finishPosition.x,
		y: finishPosition.y
	}

	fields.push([position.x, position.y])
	// number - это число, которое записано в ячейке
	let number = getField(position.x, position.y) - 1

	/*
		ищем ячейку среди соседних с текущей ячейкой,
		число в которой на 1 меньше чем в ячейке "финиша"
	*/
	while (number > -1) {
		// слева
		if (position.x > 0 && getField(position.x - 1, position.y) === number) {
			fields.push([position.x - 1, position.y])
			position.x--
		}
		// справа
		else if (position.x < map[0].length - 1 && getField(position.x + 1, position.y) === number) {
			fields.push([position.x + 1, position.y])
			position.x++
		}
		// сверху
		else if (position.y > 0 && getField(position.x, position.y - 1) === number) {
			fields.push([position.x, position.y - 1])
			position.y--
		}
		// снизу
		else if (position.y < map.length - 1 && getField(position.x, position.y + 1) === number) {
			fields.push([position.x, position.y + 1])
			position.y++
		}

		number--
	}
	
	// console.log(map)

	return fields

	// функция должна возвращать true только в том случае, если был найден выход из лабиринта
	function isWay () {
		return getField(finishPosition.x, finishPosition.y) !== Infinity
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
}