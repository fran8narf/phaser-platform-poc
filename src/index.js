import Phaser from 'phaser';
import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';

const WIDTH = 1280;
const HEIGHT = 600;


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
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    scene: initScenes()
}
new Phaser.Game(config);
