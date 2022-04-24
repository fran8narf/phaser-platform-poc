export default {
    isPlayingAnims (anims) {
        console.log(anims)
        this.anims.isPlaying && this.anims.getCurrentKey() === anims
    } 
}