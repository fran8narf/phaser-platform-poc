export default anims => {
    anims.create({
        key: 'idle',
        frames: anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 10,
        repeat : -1
    });

    anims.create({
        key: 'run-right',
        frames: anims.generateFrameNumbers('player', { start: 11, end: 16 }),
        frameRate: 10,
        repeat : -1
    });  
}