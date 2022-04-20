import Phaser from 'phaser';
import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';

const MAP_WIDTH = 1600;

const WIDTH = document.body.offsetWidth;
const HEIGHT = 625;


const SHARED_CONFIG = {
    mapOffSet: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
    width: WIDTH,
    height: HEIGHT,
    debug : true
}

const Scenes = [
    PreloadScene,
    PlayScene
];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG));

const config = {
    type: Phaser.CANVAS,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: SHARED_CONFIG.debug
        }
    },
    scene: initScenes()
}
new Phaser.Game(config);
