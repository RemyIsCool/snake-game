interface Part {
    x: number
    y: number
}

const snake: Part[] = [{ x: 2, y: 0 }, { x: 1, y: 0 }, {x: 0, y: 0}]

let direction: 'up' | 'down' | 'left' | 'right' = 'right'

input.onButtonPressed(Button.A, () => {
    if (direction === 'right') return
    direction = 'left'
})

input.onButtonPressed(Button.B, () => {
    if (direction === 'left') return
    direction = 'right'
})

input.onPinPressed(TouchPin.P0, () => {
    if (direction === 'down') return
    direction = 'up'
})

input.onPinPressed(TouchPin.P1, () => {
    if (direction === 'up') return
    direction = 'down'
})

loops.everyInterval(1000, () => {
    for (const part of snake) {
        led.unplot(part.x, part.y)
    }

    snake.pop()
    
    let nextSpot: Part

    const head = snake[0]

    switch (direction) {
        case 'up':
            nextSpot = {x: head.x, y: head.y - 1}
            break
        case 'down':
            nextSpot = { x: head.x, y: head.y + 1 }
            break
        case 'left':
            nextSpot = { x: head.x - 1, y: head.y }
            break
        case 'right':
            nextSpot = { x: head.x + 1, y: head.y }
            break
    }

    if (nextSpot.x >= 5 || nextSpot.x < 0 || nextSpot.y >= 5 || nextSpot.y < 0) {
        control.reset()
    }

    snake.unshift(nextSpot)

    for (const part of snake) {
        led.plot(part.x, part.y)
    }
})