function Shader(spec) {
  const {
    self,
    screen,
  } = Entity(spec, 'Shader')

  const {
    fullscreen = false,
    xSize = 10,
    ySize = 10,
    quad,
  } = spec

  // console.log('screen', screen)

  const ctx = screen.ctx

  const transform = Transform(spec, self)

  // console.log('quad in shader construction', quad)

  function tick() {
    quad.update()
  }

  function drawLocal() {
    // quad.draw()
    // ctx.drawImage(quad.getBuffer(), -xSize/2, -ySize/2 - 3, xSize, ySize - 3)
  }

  function draw() {
    console.log('SCREEN SIZE', screen.width, screen.height)
    
    quad.draw()
    ctx.drawImage(quad.getBuffer(), 0, 0, screen.width, screen.height)

    // drawLocal()
    // camera.drawThrough(ctx, drawLocal, transform)
  }

  function resize() {
    if (fullscreen) {
      xRes = screen.size.x
      yRes = screen.size.y
    }
  }

  return _.mixIn(self, {
    tick,
    draw,
    resize,

    transform,
  })
}