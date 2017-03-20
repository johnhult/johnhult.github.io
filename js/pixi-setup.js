var canvas;
var renderer;
var bgContainer;
var landingBgSprite;

function setupPixi() {

    PIXI.loader
    .add(
        'landingBg', 'res/img/me-side.jpg'
    )
    .on("progress", loadProgressHandler)
    .load(allLoaded);

    function loadProgressHandler(loader, resource) {
        
        //Display the file `url` currently being loaded
        // console.log("loading: " + resource.url); 

        //Display the precentage of files currently loaded
        $('.procent-loading-text').html(loader.progress + '%');

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


        // Create sprite from image that we later add to our container
        landingBgSprite = new PIXI.Sprite(PIXI.loader.resources.landingBg.texture);
        landingBgSprite.alpha = 0;
        landingBgSpriteSize = {x: landingBgSprite.width, y: landingBgSprite.height};


        //Create a container object called the `bgContainer` and add our sprite
        bgContainer = background({x: vw, y: vh}, landingBgSprite, 'cover');

        // landingBgSprite.scale = new PIXI.Point(0.2, 0.2);
        // bgContainer = new PIXI.Container();
        // bgContainer.addChild(landingBgSprite);


        
        //Tell the `renderer` to `render` the container (`bgContainer`)
        renderer.render(bgContainer);

        
        // Add alpha fade in and add contents
        firstAnimateBgIn();
        addContents();

    }
}

function firstAnimateBgIn() {

    // Return once alpha is set to 1
    if (landingBgSprite.alpha > 1) {
        landingBgSprite.alpha = 1;
        renderer.render(landingBgSprite);

        return;
    }
    // Increment alpha until it's fully visible
    else {
        landingBgSprite.alpha += 0.01;
    };

    // Render for each incrementation
    renderer.render(landingBgSprite);
    requestAnimationFrame(firstAnimateBgIn);
}


/*
*  PixiJS Background Cover/Contain Script
*   Returns PixiJS Container
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
    landingBgSprite.scale = new PIXI.Point(1, 1);

    // Set the bgContainer to use the cover function.
    bgContainer = background({x: vw, y: vh}, landingBgSprite, 'cover');

    // Render bgContainer again.
    renderer.render(bgContainer);
}

function changeBackground() {
    
}
