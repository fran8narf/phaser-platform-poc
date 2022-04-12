import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

const WIDTH = 1280;
const HEIGHT = 600;


const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT
}

const Scenes = [
    PlayScene
];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG));

const config = {
    type: Phaser.AUTO,
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
