interface Part {
    x: number
    y: number
}

const snake: Part[] = [{ x: 4, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }, {x: 0, y: 0}]

let direction: 'up' | 'down' | 'left' | 'right' = 'right'

input.onButtonPressed(Button.A, () => {
    switch (direction) {
        case 'up':
            direction = 'left'
            break
        case 'down':
            direction = 'right'
            break
        case 'left':
            direction = 'down'
            break
        case 'right':
            direction = 'up'
            break
    }
})

input.onButtonPressed(Button.B, () => {
    switch (direction) {
        case 'up':
            direction = 'right'
            break
        case 'down':
            direction = 'left'
            break
        case 'left':
            direction = 'up'
            break
        case 'right':
            direction = 'down'
            break
    }
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

    if (nextSpot.x >= 5 || nextSpot.x < 0 || nextSpot.y >= 5 || nextSpot.y < 0 || nextSpot.x in snake) {
        control.reset()
    }

    snake.unshift(nextSpot)

    for (const part of snake) {
        led.plot(part.x, part.y)
    }
})