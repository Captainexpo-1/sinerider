function World(spec) {
  const self = Entity(spec, 'World')

  const {
    ui,
    screen,
    levelData,
    requestDraw,
    tickDelta,
    version,
  } = spec

  let running = false
  let runTime = 0

  const globalScope = {
    get t() {return runTime},
    dt: tickDelta,
    lerp: (a, b, t) => {
      t = math.clamp01(t)
      return a*(1-t)+b*t
    },

    get running() {return running},
  }

  let navigating = false
  let editing = false

  let waterQuad = null
  let sunsetQuad = null

  function loadQuad() {
    waterQuad = WaterQuad(assets)
    sunsetQuad = SunsetQuad(assets)
  } 

  const assets = Assets({
    paths: spec.assets,
    callbacks: {
      complete: assetsComplete,
      progress: assetsProgress,
    }
  })

  const clickableContext = ClickableContext({
    entity: self,
  })

  let navigator

  let level
  let levelDatum
  let levelBubble

  function start() {
  }

  function tick() {
    if (window.innerHeight != screen.height || window.innerWidth != screen.width)
      screen.resize()

    if (running) runTime += tickDelta
  }

  function draw() {
  }

  function loadingVeilClicked() {
    ui.loadingVeil.setAttribute('hide', true)

    navigator = Navigator({
      ui,
      screen,
      assets,
      levelData,
      getEditing,
      setLevel,
      active: false,
      parent: self,
      drawOrder: LAYERS.navigator,
    })

    if (_.endsWith(location.href, '#random'))
      setLevel('RANDOM')
    else
      setLevel(levelData[0].nick)
  }

  function assetsComplete() {
    loadQuad()

    ui.loadingVeilString.innerHTML = 'click to begin'
    ui.loadingVeil.addEventListener('click', loadingVeilClicked)
  }

  function assetsProgress(progress, total) {
    ui.loadingVeilString.innerHTML = `loading…<br>${Math.round(100*progress/total)}%`
  }

  function setLevel(nick) {
    if (level) level.destroy()

    levelBubble = navigator.getBubbleByNick(nick)

    if (nick == 'RANDOM')
      levelDatum = generateRandomLevel()
    else
      levelDatum = _.find(levelData, v => v.nick == nick)

    level = Level({
      ui,
      screen,
      assets,
      parent: self,
      name: levelDatum.nick,
      datum: levelDatum,
      globalScope,
      active: !navigating,
      levelCompleted,
      tickDelta,
      isBubbleLevel: false,
      sunsetQuad,
      waterQuad,
    })

    level.playOpenMusic()
    level.reset()

    ui.levelText.value = levelDatum.name
    ui.levelButtonString.innerHTML = levelDatum.name

    setNavigating(false)
  }

  function setNavigating(_navigating) {
    navigating = _navigating

    if (navigating)
      self.sendEvent('onToggleMap', [_navigating])

    level.active = !navigating
    navigator.active = navigating

    if (!navigating)
      self.sendEvent('onToggleMap', [_navigating])

    ui.controlBar.setAttribute('hide', navigating)
    ui.navigatorFloatingBar.setAttribute('hide', !navigating)
    // ui.topBar.setAttribute('hide', navigating)

    if (navigating) {
      navigator.revealHighlightedLevels(levelDatum.nick)
      navigator.refreshBubbles()
    }
    else {
      // ui.variablesBar.setAttribute('hide', true)

      navigator.showAll = false
      // if (navigator.showAllUsed)
        ui.showAllButton.setAttribute('hide', false)
    }
  }

  function levelCompleted(soft=false) {
    if (soft) {
      nextLevel(2.5)
    }
    else {
      ui.victoryBar.setAttribute('hide', false)
      ui.controlBar.setAttribute('hide', true)
      ui.showAllButton.setAttribute('hide', true)
    }

    levelBubble.complete()
  }

  function transitionNavigating(_navigating, duration=1, cb) {
    ui.veil.setAttribute('style', `transition-duration: ${duration}s;`)
    ui.veil.setAttribute('hide', false)

    if (_navigating)
      self.sendEvent('onLevelFadeOut', [_navigating, duration])
    else
      self.sendEvent('onMapFadeOut', [_navigating, duration])
    
    setTimeout(() => {
      // HACK: to fix camera flicker
      setTimeout(() => {
        ui.veil.setAttribute('style', `transition-duration: ${1}s;`)
        ui.veil.setAttribute('hide', true)
      }, 100)
      setNavigating(_navigating)

      if (_navigating)
        self.sendEvent('onMapFadeIn', [_navigating, duration])
      else
        self.sendEvent('onLevelFadeIn', [_navigating, duration])

      if (cb) cb()
    }, duration*1000)
  }

  function nextLevel(transitionDuration=1) {
    console.log('LEVEL COMPLETED')
    if (teaser)
      ui.teaser.setAttribute('hide', false)
    else {
      transitionNavigating(true, transitionDuration, () => {
        stopRunning(false)
      })
    }
  }

  function onClickNextButton() {
    assets.sounds.next_button.play()
    nextLevel()
  }

  function getEditing() {
    return editing
  }

  function setEditing(_editing) {
    editing = _editing
  }

  function startRunning() {
    running = true

    ui.mathField.blur()
    ui.expressionEnvelope.setAttribute('disabled', true)
    ui.menuBar.setAttribute('hide', true)

    ui.runButton.setAttribute('hide', true)
    ui.stopButton.setAttribute('hide', false)
    ui.navigatorButton.setAttribute('hide', true)
    ui.resetButton.setAttribute('hide', true)

    assets.sounds.start_running.play()

    self.sendEvent('startRunning', [])

    requestDraw()
  }

  function stopRunning(playSound=true) {
    runTime = 0
    running = false

    ui.mathField.blur()
    ui.expressionEnvelope.setAttribute('disabled', false)
    ui.menuBar.setAttribute('hide', false)
    ui.victoryBar.setAttribute('hide', true)

    ui.controlBar.setAttribute('hide', navigating)
    ui.navigatorButton.setAttribute('hide', false)
    ui.runButton.setAttribute('hide', false)
    ui.stopButton.setAttribute('hide', true)
    ui.resetButton.setAttribute('hide', false)

    if (!navigating) {
      // HACK: Timed to avoid bug in Safari (at least) that causes whole page to be permanently offset when off-screen text input is focused
      setTimeout(() => ui.expressionText.focus(), 250)
    }

    if (playSound)
      assets.sounds.stop_running.play()

    self.sendEvent('stopRunning', [])

    requestDraw()
  }

  function toggleRunning() {
    if (running) stopRunning()
    else startRunning()
  }

  function generateRandomLevel() {
    const goalCount = _.random(2, 5)
    const goals = []

    for (let i = 0; i < goalCount; i++) {
      const goalPosition = {}

      do {
        goalPosition.x = _.random(-10, 10)
        goalPosition.y = _.random(-10, 10)
      } while (_.find(goals, v => v.x == goalPosition.x && v.y == goalPosition.y))

      goals.push(goalPosition)
    }

    const sledderCount = 1
    const sledders = []

    for (let i = 0; i < sledderCount; i++) {
      let sledderX

      do {
        sledderX = _.random(-10, 10)
      } while (_.find(goals, v => v.x == sledderX) || _.find(sledders, v => v.x == sledderX))

      sledders.push({x: sledderX})
    }

    const biomes = _.values(Colors.biomes)

    return {
      name: 'Random Level',
      nick: 'RANDOM',
      drawOrder: LAYERS.level,
      x: -10,
      y: 0,
      colors: biomes[_.random(0, biomes.length)],
      defaultExpression: '0',
      hint: 'Soft eyes, grasshopper.',
      goals,
      sledders,
    }
  }

  function onClickMapButton() {
    transitionNavigating(!navigating)
    assets.sounds.map_button.play()
  }

  function onClickResetButton() {
    level.reset()
    assets.sounds.restart_button.play()
  }

  function onMathFieldFocus() {
    self.sendEvent('mathFieldFocused')
  }

  function onMathFieldBlur() {
    self.sendEvent('mathFieldBlurred')
  }

  return self.mix({
    start,
    tick,
    draw,

    toggleRunning,

    nextLevel,
    setLevel,

    clickableContext,

    setNavigating,
    transitionNavigating,

    onClickMapButton,
    onClickResetButton,
    onClickNextButton,

    onMathFieldFocus,
    onMathFieldBlur,

    get navigator() {return navigator},

    get editing() {return editing},
    set editing(v) {setEditing(v)},

    get level() {return level},

    get navigating() {return navigating},
    set navigating(v) {setNavigating(v)},
  })
}