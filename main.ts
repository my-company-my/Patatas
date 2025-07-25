let times: number[];
let turn: number;
let ls: number;
let psm: number[];
let rc: number;
let ver = "B.0.4.1"
if (ver[0] == "D") {
    blockSettings.writeString("lev", "8")
}

//  Show loading text
let cidk = textsprite.create("Version: " + ver)
cidk.x = 80
cidk.y = 115
pause(1)
music.play(music.createSong(assets.song`title`), music.PlaybackMode.LoopingInBackground)
let lastu = parseInt(blockSettings.readString("lev"))
if (!lastu) {
    lastu = 0
}

//  Tiempos por nivel en listas (índice 0 → nivel 1, índice 4 → nivel 5)
let times_easy = [30, 35, 30, 125, 45]
let times_normal = [24, 30, 26, 120, 40]
let times_hard = [13, 19, 19, 115, 35]
function sq(n: number): number {
    let guess = n / 2
    for (let i = 0; i < 10; i++) {
        guess = (guess + n / guess) / 2
    }
    return guess
}

function lenls(iterable: string[] = null): number {
    let c = 0
    for (let _ of iterable) {
        c += 1
    }
    return c
}

function menudo(menu_type: string, options: string[], unlocked: number[], size: number[] = null): string {
    let square: number;
    let dummy: Sprite;
    let islands: Sprite[];
    let nums: Sprite[];
    let op: number;
    let y: number;
    let x: number;
    let buff: Sprite;
    let tb: TextSprite;
    let sel: number;
    let ant: number;
    let bef: string;
    let bsel: number;
    if (menu_type == "archipelago") {
        if (!size) {
            square = sq(lenls(options))
            if (parseInt("" + square) != square) {
                console.log("menudo received not squarable")
                return "Error"
            }
            
            size = [square, square]
        }
        
        dummy = sprites.create(img`.`, SpriteKind.Projectile)
        islands = [dummy]
        islands.removeAt(0)
        //  quitas el dummy
        nums = [dummy]
        nums.removeAt(0)
        //  quitas el dummy
        op = 0
        for (y = 0; y < size[1]; y++) {
            for (x = 0; x < size[0]; x++) {
                buff = sprites.create(unlocked[y * size[1] + x] ? assets.image`island_no` : assets.image`island_no0`, SpriteKind.Projectile)
                buff.x = x * 30 + 160 - lenls(options) * 30 / 2.5
                buff.y = y * 30 + 120 - lenls(options) * 30 / 3
                tb = textsprite.create("" + options[op])
                tb.x = buff.x
                tb.y = buff.y
                islands.push(buff)
                nums.push(tb)
                op += 1
            }
        }
        sel = 0
        ant = 1
        bef = ""
        while (true) {
            console.log("" + sel)
            console.log("" + ant)
            console.log(unlocked)
            console.log("aire")
            pause(1)
            if (unlocked[ant] == 1) {
                islands[ant].setImage(assets.image`island_no`)
            } else {
                islands[ant].setImage(assets.image`island_no0`)
            }
            
            islands[sel].setImage(assets.image`island_se`)
            if (unlocked[sel] == 0) {
                bsel = sel
                sel = ant
                ant = bsel
            }
            
            // pass
            if (controller.right.isPressed() && bef != "R") {
                bef = "R"
                ant = sel != lenls(options) - 1 ? sel : ant
                sel += sel != lenls(options) - 1 ? 1 : 0
            }
            
            if (!controller.right.isPressed() && bef == "R") {
                bef = ""
            }
            
            if (controller.left.isPressed() && bef != "L") {
                bef = "L"
                ant = sel != 0 ? sel : ant
                sel -= sel != 0 ? 1 : 0
            }
            
            if (!controller.left.isPressed() && bef == "L") {
                bef = ""
            }
            
            if (controller.down.isPressed() && bef != "D") {
                bef = "D"
                ant = sel < lenls(options) - square ? sel : ant
                sel += sel < lenls(options) - square ? square : 0
            }
            
            if (!controller.down.isPressed() && bef == "D") {
                bef = ""
            }
            
            if (controller.up.isPressed() && bef != "U") {
                bef = "U"
                ant = sel >= square ? sel : ant
                sel -= sel >= square ? square : 0
            }
            
            if (!controller.up.isPressed() && bef == "U") {
                bef = ""
            }
            
            if (controller.A.isPressed()) {
                for (let spr of islands) {
                    sprites.destroy(spr)
                }
                for (let sprd of nums) {
                    sprites.destroy(sprd)
                }
                return "" + options[sel]
            }
            
        }
    }
    
    if (menu_type == "list") {
        if (!size) {
            square = lenls(options)
        }
        
        dummy = sprites.create(img`.`, SpriteKind.Projectile)
        islands = [dummy]
        islands.removeAt(0)
        //  quitas el dummy
        nums = [dummy]
        nums.removeAt(0)
        //  quitas el dummy
        op = 0
        for (y = 0; y < size[1]; y++) {
            for (x = 0; x < size[0]; x++) {
                buff = sprites.create(assets.image`rect_no`, SpriteKind.Projectile)
                buff.x = x * 30 + 160 - lenls(options) * 30 / 1.125
                buff.y = y * 30 + 120 - lenls(options) * 30 / 1
                tb = textsprite.create(options[op])
                tb.x = buff.x
                tb.y = buff.y
                islands.push(buff)
                nums.push(tb)
                op += 1
            }
        }
        sel = 0
        ant = 1
        bef = ""
        while (true) {
            pause(1)
            islands[ant].setImage(assets.image`rect_no`)
            islands[sel].setImage(assets.image`rect_se`)
            console.log("" + sel)
            console.log("" + ant)
            console.log(unlocked)
            console.log(sel)
            console.log("aire")
            // if not unlocked[sel]:
            //     sel = ant
            if (controller.right.isPressed() && bef != "R") {
                bef = "R"
                ant = sel != lenls(options) - 1 ? sel : ant
                sel += sel != lenls(options) - 1 ? 1 : 0
            }
            
            if (!controller.right.isPressed() && bef == "R") {
                bef = ""
            }
            
            if (controller.left.isPressed() && bef != "L") {
                bef = "L"
                ant = sel != 0 ? sel : ant
                sel -= sel != 0 ? 1 : 0
            }
            
            if (!controller.left.isPressed() && bef == "L") {
                bef = ""
            }
            
            if (controller.down.isPressed() && bef != "D") {
                bef = "D"
                ant = sel < lenls(options) - square ? sel : ant
                sel += sel < lenls(options) - square ? square : 0
            }
            
            if (!controller.down.isPressed() && bef == "D") {
                bef = ""
            }
            
            if (controller.up.isPressed() && bef != "U") {
                bef = "U"
                ant = sel >= square ? sel : ant
                sel -= sel >= square ? square : 0
            }
            
            if (!controller.up.isPressed() && bef == "U") {
                bef = ""
            }
            
            if (controller.A.isPressed()) {
                for (let sprt of islands) {
                    sprites.destroy(sprt)
                }
                for (let sprf of nums) {
                    sprites.destroy(sprf)
                }
                return "" + options[sel]
            }
            
        }
    }
    
    return "Error"
}

let dif = null
dif = menudo("list", ["Normal", "Facil", "Dificil"], [1, 1, 1], [1, 3])
while (!dif) {
    pause(1)
}
pause(1000)
let unlk : number[] = []
for (let lev = 0; lev < 9; lev++) {
    unlk.push(lev <= lastu ? 1 : 0)
}
let nivel = parseInt(menudo("archipelago", ["1", "2", "3", "4", "5", "6", "7", "8", "9"], unlk))
//  Ask level
// story.show_player_choices("Normal", "Facil", "Dificil")
while (!dif) {
    console.log(dif)
    dif = story.getLastAnswer()
}
console.log(dif)
if (dif == "Normal") {
    times = times_normal
    turn = 100
} else if (dif == "Facil") {
    times = times_easy
    turn = 1000
} else if (dif == "Dificil") {
    times = times_hard
    turn = 50
}

// nivel = game.ask_for_number("¿Cual nivel?", 1)
function itws(sprite: Sprite, k: number): boolean {
    //  Get sprite position in tile coordinates
    let col = Math.idiv(sprite.x, 16)
    let row = Math.idiv(sprite.y, 16)
    //  Check left tile
    let left_tile = tiles.getTileLocation(col - 1, row)
    if (k == 0 && tiles.tileAtLocationEquals(left_tile, assets.tile`ce`) || k == 1 && tiles.tileAtLocationEquals(left_tile, assets.tile`st`)) {
        return true
    }
    
    //  Check right tile
    let right_tile = tiles.getTileLocation(col + 1, row)
    if (k == 0 && tiles.tileAtLocationEquals(right_tile, assets.tile`ce`) || k == 1 && tiles.tileAtLocationEquals(right_tile, assets.tile`st`)) {
        return true
    }
    
    return false
}

music.stopAllSounds()
let fen = [-1]
//  Load tilemap
if (nivel == 1) {
    tiles.setCurrentTilemap(tilemap`
        nivel1
    `)
    ls = 13
    //  coins/lives
    // rc = int(levs[dif][0])  # timer
    // rc = 24
    psm = [30]
    music.play(music.createSong(assets.song`back1`), music.PlaybackMode.LoopingInBackground)
} else if (nivel == 2) {
    tiles.setCurrentTilemap(tilemap`
        nivel2
    `)
    ls = 13
    //  coins/lives
    rc = 25
    //  timer
    psm = [30]
    music.play(music.createSong(assets.song`back2`), music.PlaybackMode.LoopingInBackground)
} else if (nivel == 3) {
    tiles.setCurrentTilemap(tilemap`
        nivel0
    `)
    ls = 6
    //  coins/lives
    rc = 24
    //  timer
    music.play(music.createSong(assets.song`back3`), music.PlaybackMode.LoopingInBackground)
} else if (nivel == 4) {
    tiles.setCurrentTilemap(tilemap`
        nivel10
    `)
    //  6
    ls = 5
    //  coins/lives 2
    rc = 40
    //  timer 15
    psm = [-50, -50, -50, -50, -50, -50, -50, -50]
    fen = [1, 2]
    music.play(music.createSong(assets.song`back4`), music.PlaybackMode.LoopingInBackground)
} else if (nivel == 5) {
    tiles.setCurrentTilemap(tilemap`nivel8`)
    ls = 3
    psm = [-30, 50, 70, 90, 110, 30, 150, 170, 100, 300, 500]
    rc = 40
    music.play(music.createSong(assets.song`back5`), music.PlaybackMode.LoopingInBackground)
} else if (nivel == 9) {
    tiles.setCurrentTilemap(tilemap`
        test
    `)
    ls = 3
    //  coins/lives
    rc = 9999
    //  timer
    psm = [30, 40, 50, 60]
} else {
    // psm = [300,300,300,1000]
    game.splash("Nivel no válido")
    game.reset()
}

rc = times[nivel - 1]
pause(1)
//  UI
let timercount = textsprite.create("" + rc)
let patatacount = textsprite.create("" + ls)
timercount.setOutline(1, 6)
patatacount.setOutline(1, 6)
//  Game state
let rscoins_ins : Sprite[] = []
let enmyss_ins : Sprite[] = []
let enmyssg1_ins : Sprite[] = []
let fwrs : Sprite[] = []
let isj = false
//  is jumping
function load1() {
    let sb_tile: Image;
    let coin: Sprite;
    let enmyns: Sprite;
    let fwrb: Sprite;
    let ins_tile = assets.tile`
        ins
    `
    if (nivel == -1 || nivel == 1 || nivel == 3 || nivel == 5) {
        sb_tile = assets.tile`sb`
    } else {
        sb_tile = assets.tile`sb0`
    }
    
    let floor_tile1 = assets.tile`
        ce
    `
    let floor_tile2 = assets.tile`
        flbasic
    `
    let enmy_tile1 = assets.tile`e1`
    let enmy_tile2 = assets.tile`e2`
    //  Place coins
    let ins_locations = tiles.getTilesByType(ins_tile)
    let enmy1_locations = tiles.getTilesByType(enmy_tile1)
    let enmy2_locations = tiles.getTilesByType(enmy_tile2)
    for (let loc1 of ins_locations) {
        tiles.setTileAt(loc1, sb_tile)
        coin = sprites.create(assets.image`rscoin`, SpriteKind.Food)
        rscoins_ins.push(coin)
        tiles.placeOnTile(coin, loc1)
        pause(1)
    }
    for (let loc2 of enmy1_locations) {
        tiles.setTileAt(loc2, sb_tile)
        enmyns = sprites.create(assets.image`se1`, SpriteKind.Enemy)
        enmyns.ay = 30
        enmyss_ins.push(enmyns)
        tiles.placeOnTile(enmyns, loc2)
        fwrb = sprites.create(assets.image`fwr`, SpriteKind.Projectile)
        fwrb.follow(enmyns, 1000, turn)
        fwrb.setStayInScreen(true)
        fwrb.setFlag(SpriteFlag.Ghost, true)
        fwrs.push(fwrb)
        pause(1)
    }
    for (let loc3 of enmy2_locations) {
        tiles.setTileAt(loc3, sb_tile)
        enmyns = sprites.create(assets.image`proy0`, SpriteKind.Projectile)
        enmyssg1_ins.push(enmyns)
        tiles.placeOnTile(enmyns, loc3)
        pause(1)
    }
}

load1()
//  Create player
let playersprite = sprites.create(assets.image`player`, SpriteKind.Player)
playersprite.setVelocity(0, 0)
playersprite.ay = 300
//  gravity
scene.cameraFollowSprite(playersprite)
sprites.destroy(cidk)
//  Update UI with camera
timer.background(function update_ui() {
    while (true) {
        timercount.setPosition(scene.cameraProperty(CameraProperty.X) - 68, scene.cameraProperty(CameraProperty.Y) - 50)
        patatacount.setPosition(scene.cameraProperty(CameraProperty.X) + 68, scene.cameraProperty(CameraProperty.Y) - 50)
        pause(120)
    }
})
//  Movement and win logic
timer.background(function controller_loop() {
    
    while (true) {
        playersprite.vx = controller.dx(controller.B.isPressed() ? 3750 : 2200)
        pause(10)
    }
})
//  Countdown timer
timer.background(function countdown() {
    
    while (true) {
        pause(1000)
        rc -= 1
        timercount.setText("" + rc)
        if (rc < 0 && ls > 0) {
            music.stopAllSounds()
            music.play(music.createSong(assets.song`lose`), music.PlaybackMode.InBackground)
            game.splash("Has perdido")
            music.stopAllSounds()
            game.reset()
        }
        
    }
})
timer.background(function enmydel() {
    let ce: number;
    let ps = psm
    if (ps == null) {
        return
    }
    
    let xs = [0]
    while (true) {
        ce = 0
        pause(2000)
        for (let ei of enmyss_ins) {
            ei.vx = ps[ce]
            if (xs[ce] == ei.x) {
                ei.vy = -30
            }
            
            xs[ce] = ei.vy
            if (itws(ei, 0)) {
                ps[ce] = -ps[ce]
                ei.vy = -30
            }
            
            if (Math.percentChance(25) && ei.isHittingTile(CollisionDirection.Bottom)) {
                ei.vy = -30
            }
            
        }
    }
})
timer.background(function enmydel2() {
    let sc: any;
    let cgn: number;
    let prs : Sprite[] = []
    while (true) {
        pause(1000)
        sc = parseInt("" + Math.trunc(game.runtime()) / 1000)
        cgn = 0
        for (let gn of enmyssg1_ins) {
            console.log(gn.x)
            if (sc % 2 == 0 == (parseInt("" + (gn.x - 5) / 16) % 2 == 0)) {
                sprites.destroy(prs[cgn])
                prs[cgn] = sprites.create(assets.image`proy`, SpriteKind.Enemy)
                prs[cgn].ay = 100
                prs[cgn].x = gn.x
                prs[cgn].y = gn.y
            }
            
            cgn += 1
        }
    }
})
//  Collect coins
timer.background(function collect_coins() {
    
    while (true) {
        if (ls == 0) {
            if (lastu < nivel) {
                blockSettings.writeString("lev", "" + nivel)
            }
            
            music.stopAllSounds()
            music.play(music.createSong(assets.song`win`), music.PlaybackMode.InBackground)
            game.splash("Has ganao")
            music.stopAllSounds()
            game.reset()
        }
        
        for (let c of rscoins_ins) {
            if (playersprite.overlapsWith(c)) {
                sprites.destroy(c)
                rscoins_ins.removeAt(rscoins_ins.indexOf(c))
                ls -= 1
                patatacount.setText("" + ls)
                music.play(music.createSoundEffect(WaveShape.Noise, 1038, 1286, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
            }
            
        }
        pause(20)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`lose`), music.PlaybackMode.InBackground)
    game.splash("Has perdido")
    music.stopAllSounds()
    game.reset()
})
//  Check if on ground using tile collision
timer.background(function check_ground() {
    let p: number;
    
    while (true) {
        isj = playersprite.isHittingTile(CollisionDirection.Bottom) || itws(playersprite, 1)
        pause(10)
        if (isj == false) {
            p = playersprite.x
            while (playersprite.x == p && !playersprite.isHittingTile(CollisionDirection.Bottom)) {
                pause(1)
            }
            isj = true
        }
        
    }
})
//  Jump logic using gravity
timer.background(function jump_loop() {
    
    while (true) {
        if (controller.A.isPressed() && isj) {
            isj = false
            music.play(music.createSoundEffect(WaveShape.Sine, 500, 600, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            playersprite.vy = controller.B.isPressed() ? -175 : -150
        }
        
        pause(1)
    }
})
