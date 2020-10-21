var isMobile = /iPad|iPod|iPhone|Android/.test(navigator.userAgent),
    isWx = /MicroMessenger/.test(navigator.userAgent),
    loadMask = document.getElementById("loading");

var mainwrap= document.getElementById("mainwrap");
var app = new PIXI.Application({
    width: 1450,
    height: 750,
    backgroundColor: 0x061639
});

//app.renderer.backgroundColor = 0x061639;

var rootCanvas = app.view;
mainwrap.appendChild(rootCanvas);

/* loader */
var loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.

var sprites = {};

loader.add('bg', 'img/bg.jpg')
    .add('ship', 'img/ship.png')
    .load(function(loader, resources) {
            sprites.bg = new PIXI.Sprite(resources.bg.texture);

            sprites.ship = new PIXI.Sprite(resources.ship.texture);
            sprites.ship2 = new PIXI.Sprite(resources.ship.texture);

            sprites.ship.x = 10;
            sprites.ship.interactive = true;
            sprites.ship.buttonMode = true;
            sprites.ship.on('pointerdown', function onClick() {
                this.scale.x *= 1.25;
                this.scale.y *= 1.25;
            })

            sprites.ship2.x = 100;
        });

loader.onProgress.add(function() {
    console.log(loader.progress);
});

loader.onComplete.add(function() {
    app.stage.addChild(sprites.bg, sprites.ship, sprites.ship2);
    gsap.to(loadMask, {
        duration: 1,
        opacity: 0,
        onComplete: function() {
            loadMask.className += " hide";
        }
    });
});



/* main */
var winH = window.outerHeight;
var maxMoveVal = winH*5;
var storyMoveVal = 0;
var storylastPos = 0;

var tipsText = document.getElementById("tipsText");
var mc = new Hammer(app.view);
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
/* mc.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
}); */

mc.on('panmove', function(e) {
    storyMoveVal = e.deltaX + storylastPos;
    tipsText.textContent = "移动距离："+storyMoveVal;


    //console.log(storyMoveVal);
    if(storyMoveVal<=0){
        storyMoveVal = 0;
    }else if(storyMoveVal>=maxMoveVal){
        storyMoveVal = maxMoveVal;
    }
    sprites.ship.x = storyMoveVal;
});

mc.on('panend', function(e) {
    storylastPos += e.deltaX;

    if (storylastPos<0) {
        storylastPos = 0;
    }else if(storylastPos>maxMoveVal){
        storylastPos = maxMoveVal;
    }
});