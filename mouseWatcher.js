// https://gist.github.com/Aleksey-Danchin/aeb89174608c55c64078659063d52f4b
function mouseWatcher (element, callback, avtoStart = true) {
	let started = false

	const mouse = {
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
	}

	const manager = {
		start () {
			if (!started) {
				element.addEventListener('mousemove', mouseMoveHandler)
			}

			return started = true
		},

		finish () {
			if (started) {
				element.removeEventListener('mousemove', mouseMoveHandler)
			}

			return started = false
		},

		toggle () {
			return this[started ? 'finish' : 'start']()
		},

		get active () {
			return started
		},

		set active (value) {
			if (Boolean(value) !== started) {
				this.toggle()
			}

			return value
		},

		get mouse () {
			return getMouseCopy()
		}
	}

	if (avtoStart) {
		manager.start()
	}

	return manager

	function mouseMoveHandler (event) {
		const rect = element.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		mouse.dx = x - mouse.x
		mouse.dy = y - mouse.y

		mouse.x = x
		mouse.y = y

		callback(getMouseCopy())
	}

	function getMouseCopy () {
		return {
			x: mouse.x,
			y: mouse.y,
			dx: mouse.dx,
			dy: mouse.dy,
		}
	}
}