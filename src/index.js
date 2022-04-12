import Phaser from 'phaser';
import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';

const WIDTH = 1600;
const HEIGHT = 625;


const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT
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
            // debug: true
        }
    },
    scene: initScenes()
}
new Phaser.Game(config);
