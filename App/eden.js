worldData = []

worldData.push({
  version: '0.0.0',
  name: 'Eden',
  assets: {
    images: {
      lunchbox_sam_sled: 'ada_jack_sled.png',
      lunchbox_sled: 'jack_sled.png',
      benny_sled: 'jack_sled.png',
      benny_float: 'jack_float_right.png',
      benny_float_dark: '.svg',
      benny_float_left: '.svg',
      sam_sled: 'ada_sled.png',
      sam_float: 'ada_float_right.png',
      sam_float_dark: '.svg',
      sam_float_left: '.svg',
      sam_stand_snowball: 'sam_float_left.svg',
      cabin_1: '.png',
      world_map: '.svg',
      cloud_1: '.png',
      cloud_2: '.png',
      cloud_3: '.png',
      cloud_4: '.png',
      cloud_5: '.png',
      tree_1: '.png',
      tree_2: '.png',
      tree_3: '.png',
      fox: '.png',
      slime: '.png',
      crow: '.png',
      tree_home_1: '.webp',
      tree_home_2: '.png',
      initial_bg:'initial-bg.webp',
      western_slopes_background: '.webp',
      western_slopes_background_no_sky: '.webp',
      logo_text:'.webp',
      rock_1: '.webp',
      rock_2: '.png',
      rock_3: '.png',
      bush_1: '.png',
      bush_2: '.png',
      grass_1: '.png',
    },
    sounds: {
      constant_lake: {
        base: '.mp3',
        pad_1_loopable: '.mp3',
        pad_1: '.mp3',
        pad_2_loopable: '.mp3',
        pad_2: '.mp3',
        pad_3_loopable: '.mp3',
        pad_3: '.mp3',
        pad_swell_1: '.mp3',
        pad_swell_2: '.mp3',
        pad_swell_3: '.mp3',
        swell_1: '.mp3',
        swell_2: '.mp3',
        swell_3: '.mp3',
        wind: '.mp3',
      },
      music: {
        intro: '.mp3',
      },
      map_button: '.mp3',
      next_button: '.mp3',
      enter_level: '.mp3',
      goal_fail: '.mp3',
      goal_success: '.mp3',
      level_success: '.mp3',
      restart_button: '.mp3',
      start_running: '.mp3',
      stop_running: '.mp3',
      map_zoom_in: {
        src: 'woosh_out.wav',
        rate: 1.2,
      },
      map_zoom_out: {
        src: 'woosh_out.wav',
        rate: 0.8,
      },
      map_zoom_highlighted: {
        src: 'woosh_out.wav',
        rate: 0.6,
      },
      map_zoom_show_all: {
        src: 'woosh_out.wav',
        rate: 0.4,
      },
      path_goal_start: '.mp3',
      path_goal_continue: '.mp3',
    },
    shaders: {
      blend_frag: 'blend.frag',
      points_frag: 'points.frag',
      points_vert: 'points.vert',
      lake_frag: 'lake.frag',
      quad_frag: 'quad.frag',
      quad_vert: 'quad.vert',
      sunset_frag: 'sunset.frag',
    }
  },
  levelData: [{
    name: 'Welcome',
    nick: 'HELLO_WORLD',
    colors: Colors.biomes.home,
    x: 0,
    y: 0,
    requirements: [],
    runMusic: 'sounds.music.intro',
    flashRunButton: true,
    defaultExpression: '\\frac{-2}{1+e^{-x+5}}+\\frac{-2}{1+\\left(x-28\\right)^2}',
    hint: 'congratulations, you found the secret hint!',
    camera: {
      offset: {
        x: 0,
        y: 0.53,
      }
    },
    goals: [
      {
        type: 'dynamic',
        x: 6.7,
        y: 0
      },
    ],
    sledders: [{
      x: 0,
      asset: 'images.benny_sled',
      speech: {
        x: 0.3,
        content: 'snow!!',
        direction: Vector2(0.5, 1),
        distance: 1.2,
        color: '#fff',
      }
    }],
    walkers: [{
      x: 7.6,
      victoryX: 10,
      followFlip:false,
      asset: 'images.sam_float',
      range: [7.6, 7.6],
      size: 2,
      flipX: true,
      sloped:true,
      speech: [
        {
          x: -0.3,
          y: 1,
          content: 'now hit the green button ⇲',
          direction: 'up-left',
          distance: 1.6,
          color: '#fff',
          speech: [
            {
              x: -1.5,
              content: 'yes, snow.',
              direction: 'up-up-left',
              distance: 0.8,
              color: '#fff',
              speech: [
              ]
            }
          ]
        },
      ]
    }],
    sprites: [
    {
      asset: 'images.cabin_1',
      size: 6,
      x: -4,
      // offset: [0, -2],
      anchored: true,
    },
    {
      asset: 'images.tree_home_1',
      drawOrder: LAYERS.foreSprites,
      flipX: '*',
      size: 6.1,
      x: 2,
      y: 0,
      offset: Vector2(0, 0.8),
      anchored: true
    },
    {
      asset: 'images.tree_home_1',
      flipX: '*',
      size: 5.4,
      x: -9,
      y: 0,
      offset: Vector2(0, 0.8),
      anchored: true
    },{
      asset: 'images.tree_home_1',
      drawOrder: LAYERS.foreSprites,
      flipX: '*',
      size: 6.7,
      x: -7.5,
      y: 0,
      offset: Vector2(0, 0.8),
      anchored: true
    },
    {
      asset: 'images.tree_home_2',
      flipX: false,
      size: 6.4,
      x: 8,
      y: 0,
      offset: Vector2(0, 0.8),
      anchored: true
    },
    // {
    //   asset: 'images.tree_home_1',
    //   drawOrder: LAYERS.foreSprites,
    //   flipX: '*',
    //   size: 5.2,
    //   x: 21,
    //   y: 0,
    //   offset: Vector2(0, 0.8),
    //   anchored: true
    // },
    // {
    //   asset: 'images.tree_home_1',
    //   flipX: '*',
    //   size: 5.9,
    //   x: 10,
    //   y: 0,
    //   offset: Vector2(0, 0.8),
    //   anchored: true
    // },
    // {
    //   asset: 'images.tree_home_1',
    //   drawOrder: LAYERS.foreSprites,
    //   flipX: '*',
    //   size: 7.1,
    //   x: 34.2,
    //   y: 0,
    //   offset: Vector2(0, 0.7),
    //   anchored: true
    // },
    // {
    //   asset: 'images.tree_home_1',
    //   flipX: '*',
    //   size: 5.6,
    //   x: 36.3,
    //   y: 0,
    //   offset: Vector2(0, 0.8),
    //   anchored:true
    // },
    {
      asset: 'images.crow',
      flipX: '*',
      size: 1,
      x: 31,
      y: 0,
      anchored: true
    },
    {
      asset: 'images.logo_text',
      drawOrder: LAYERS.foreSprites,
      size: 20,
      x: 20,
      y: 13,
      anchored: false,
    }
  ],
    texts: [{
      x: 14,
      y: -5.5,
      size: 0.7,
      fill: '#ffffff',
      content: 'WIP Pre-Alpha. Don’t distribute yet!'
    },{
      x: 14,
      y: -4,
      size: 1.5,
      fill: '#ffffff',
      content: 'A game about love and graphing.'
    }],
    sky: {
      asset:'images.initial_bg',
      margin: 1,
    },
    clouds: {
    },
    snow: {
      density: 0.4,
      maxHeight: 8,
      velocity: {
        x: 0.2,
        y: 0.4
      }
    },
    textBubbles: [{
      content: 'this one!',
      domSelector: '#run-button',
      place: 'top-left',
      destroyOnClick: true,
      style: {fontSize:'1.1rem'},
    }],
  },/*{
    name: 'Random',
    nick: 'RANDOM',
    colors: Colors.biomes.alps,
    x: 35,
    y: -25,
    requirements: [],
    defaultExpression: '0',
    hint: 'Soft eyes, grasshopper.',
    goals: [
      {
        type: 'dynamic',
        x: 6.7,
        y: 0
      },
    ],
    sledders: [{
      x: 0,
    }],
  },*/
  ...SLOPE,
  ...PARABOLA,
  ...WAVE,
  ...LOGISTIC,
  ...TIME,
]})

// Allows you to leave requirements as null to signify dependence on the previous level
for (world of worldData) {
  const levelData = world.levelData

  for (let i = 1; i < levelData.length; i++) {
    const d = levelData[i]

    if (d.requirements == null) {
      d.requirements = [levelData[i-1].nick]
      continue
    }

    for (let j = 0; j < d.requirements.length; j++) {
      if (d.requirements[j] == null) {
        d.requirements[j] = [levelData[i-1].nick]
      }
    }
  }
}