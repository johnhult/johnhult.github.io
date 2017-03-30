var canvas;
var renderer;
var bgContainer;
var landingBgSprite;
var bgSprites = [];
var parentContainer;
var loader;


function setupPixi() {

    loader = PIXI.loader;

    loader
    .add([
        {name: 'home', url: 'res/img/me-side.jpg'},
        {name: 'work', url: 'res/img/work-bg.jpg'},
        {name: 'blog', url: 'res/img/blog-bg.jpg'}
    ])
    .on("progress", loadProgressHandler)
    .load(allLoaded);

}

function loadProgressHandler(loader, resource) {
    
    //Display the file `url` currently being loaded
    // console.log("loading: " + resource.url); 

    //Display the precentage of files currently loaded
    $('.procent-loading-text').html(Math.floor(loader.progress) + '%');

    //If you gave your files names as the first argument 
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
}

function allLoaded() {

    // Remove loading text
    $('.procent-loading-text').css('opacity', '0');


    //Create the renderer
    renderer = PIXI.autoDetectRenderer(vw, vh);


    //Add the canvas to the HTML document and draw bg
    $('.add-pixi')[0].appendChild(renderer.view);


    // Create container for all bgs
    parentContainer = new PIXI.Container();

    // Create sprite from image that we later add to our container
    bgSprites.push(new PIXI.Sprite(loader.resources.home.texture));
    bgSprites.push(new PIXI.Sprite(loader.resources.work.texture));
    bgSprites.push(new PIXI.Sprite(loader.resources.blog.texture));
    $.each(bgSprites, function(index, value) {
        parentContainer.addChild(background({x: vw, y: vh}, bgSprites[index], 'cover'));
        parentContainer.children[index].alpha = 0;
    });
    renderer.render(parentContainer);
    // landingBgSprite = bgSprites[currentMainNavNumber];
    // landingBgSprite.alpha = 0;

    // //Create a container object called the `bgContainer` and add our sprite
    // bgContainer = background({x: vw, y: vh}, landingBgSprite, 'cover');

    // // landingBgSprite.scale = new PIXI.Point(0.2, 0.2);
    // // bgContainer = new PIXI.Container();
    // // bgContainer.addChild(landingBgSprite);


    
    // //Tell the `renderer` to `render` the container (`bgContainer`)
    // renderer.render(bgContainer);

    
    // Add contents once all is loaded (menus and correct page)
    addContents();

    // Resolve routing i.e. do the functions for the specified route
    router.resolve();

    // // Set correct bg sprite that is depending on the main navigation
    // setBgSprite();

    // Set alpha to 0 for first animate in and then animate it to visible
    animateBgFirstTime();

}

function setBgSprite() {
    landingBgSprite = bgSprites[currentMainNavNumber];

    //Create a container object called the `bgContainer` and add our sprite
    // bgContainer = background({x: vw, y: vh}, landingBgSprite, 'cover');
}

function switchMainNavBg() {
    // var oldContainer = bgContainer;
    // renderer.render(oldContainer);

    console.log(oldPageNr);
    // if(oldPageNr || oldPageNr === 0) {
    //     animateBgOut(parentContainer.children[oldPageNr]);
    // }

    // Change to new current main navigation page
    animateBg();

    //Tell the `renderer` to `render` the container (`bgContainer`)
    // renderer.render(bgContainer);
}

// function animateBgOut() {
//     console.log("animating OUUUUT" + parentContainer.children[oldPageNr].alpha);

//     // Return once alpha is set to 0
//     if (parentContainer.children[oldPageNr].alpha <= 0) {
//         parentContainer.children[oldPageNr].alpha = 0;
//         renderer.render(parentContainer.children[oldPageNr]);

//         cancelAnimationFrame(animateBgOut);
//     }
//     // Decrement alpha until it's fully visible
//     else {
//         parentContainer.children[oldPageNr].alpha -= 1/(60*0.6);
//     };

//     // Render for each incrementation
//     renderer.render(parentContainer.children[oldPageNr]);
//     requestAnimationFrame(animateBgOut);
// }

function animateBgFirstTime() {

    // Return once alpha is set to 1
    if (parentContainer.children[currentMainNavNumber].alpha >= 1) {
        parentContainer.children[currentMainNavNumber].alpha = 1;
        renderer.render(parentContainer);

        return;
    }
    // Increment alpha until it's fully visible
    else {
        parentContainer.children[currentMainNavNumber].alpha += 1/(60*0.6);
    };

    // Render for each incrementation
    renderer.render(parentContainer);
    requestAnimationFrame(animateBgFirstTime);
}

function animateBg() {

    // TODO: MAKE SURE WE HANDLE "FAST NAV"

    // Return once alpha is set to 1
    if (parentContainer.children[currentMainNavNumber].alpha >= 1 || parentContainer.children[oldPageNr].alpha <= 0) {
        parentContainer.children[oldPageNr].alpha = 0;
        parentContainer.children[currentMainNavNumber].alpha = 1;
        renderer.render(parentContainer);

        return;
    }
    // Increment alpha until it's fully visible
    else {
        parentContainer.children[oldPageNr].alpha -= 1/(60*0.4);
        parentContainer.children[currentMainNavNumber].alpha += 1/(60*0.4);
    };

    // Render for each incrementation
    renderer.render(parentContainer);
    requestAnimationFrame(animateBg);
}


/*
*  PixiJS Background Cover/Contain Script
*   Returns PixiJS Container that contains the inputSprite!
*   ARGS:
*   bgSize: Object with x and y representing the width and height of background. Example: {x:1280,y:720}
*   inputSprite: Pixi Sprite containing a loaded image or other asset.  Make sure you preload assets into this sprite.
*   type: String, either "cover" or "contain".
*   forceSize: Optional object containing the width and height of the source sprite, example:  {x:1280,y:720}
*/
function background(bgSize, inputSprite, type, forceSize) {
    var sprite = inputSprite;
    var bgCoverContainer = new PIXI.Container();
    var mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0,0, bgSize.x, bgSize.y).endFill();
    bgCoverContainer.mask = mask;
    bgCoverContainer.addChild(mask);
    bgCoverContainer.addChild(sprite);


    var sp = {x:sprite.width,y:sprite.height};
    if(forceSize) sp = forceSize;
    var winratio = bgSize.x/bgSize.y;
    var spratio = sp.x/sp.y;
    var scale = 1;
    var pos = new PIXI.Point(0,0);
    if(type == 'cover' ? (winratio > spratio) : (winratio < spratio)) {
        //photo is wider than background
        scale = bgSize.x/sp.x;
        pos.y = -((sp.y*scale)-bgSize.y)/2
    } else {
        //photo is taller than background
        scale = bgSize.y/sp.y;
        pos.x = -((sp.x*scale)-bgSize.x)/2
    }


    sprite.scale = new PIXI.Point(scale,scale);
    sprite.position = pos;

    // console.log('Sprite width: ' + sprite.width + '\n' + 'Sprite height: ' + sprite.height + '\n' + 'Sprite scale: ' + sprite.scale.x);
    // console.log('bgCoverContainer width: ' + bgCoverContainer.width + '\n' + 'bgCoverContainer height: ' + bgCoverContainer.height);
    return bgCoverContainer;
}


function rerender() {
    // Resize renderer.
    renderer.resize(vw, vh);
    // console.log('renderer width: ' + renderer.width + '\n' + 'renderer height: ' + renderer.height);
    
    // Reset scale to be sure.
    parentContainer.removeChildren();


    // TODO: MAKE SURE THIS DOESN'T FUCK UP SIZE OF SPRITES
    $.each(bgSprites, function(index, value) {
        bgSprites[index].scale = new PIXI.Point(1, 1);
        parentContainer.addChild(background({x: vw, y: vh}, bgSprites[index], 'cover'));
        parentContainer.children[index].alpha = 0;
    });

    parentContainer.children[currentMainNavNumber].alpha = 1;

    // Set the bgContainer to use the cover function.
    // bgContainer = background({x: vw, y: vh}, parentContainer.children[currentMainNavNumber], 'cover');

    // Render bgContainer again.
    renderer.render(parentContainer);
}
