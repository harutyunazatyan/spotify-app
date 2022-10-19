<template>
    <div>
        <div class="artist-block">
            <div class="artist-image">
                <img :src="currentArtist.image">
            </div>
            <div class="artist-info">
                <p class="mb-0">{{ currentArtist.name }}</p>
                <div>
                    <small>Followers: {{ currentArtist.followers }}</small>
                </div>
            </div>
        </div>
        <div>
            <p class="totalAlbum-text">Albums: {{ albumsList.length }}/{{ totalAlbums }}</p>
        </div>
        <div class="album-block">
            <div v-for="album in albumsList" class="album-content" :key="album.id">
                <div @click="getTracksOfAlbum(album.id)" data-bs-toggle="modal" data-bs-target="#myModal">
                    <img :src="album.image">
                </div>
                <p>{{ album.name }}</p>
            </div>
        </div>
        <div class="modal" id="myModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Tracks: </h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div v-for="track in albumTracks" :key="track.id" class="track">
                            <p class="mb-0">{{ track.name }}</p>
                            <audio controls @playing="playHandler(track.id)" :data-id="track.id" class="track-audio">
                                <source :src="track.track" type="audio/ogg" >
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ArtistView',
        data() {
            return {
                token: localStorage.getItem('accessToken'),
                currentArtist: {},
                totalAlbums: '',
                albumsList: [],
                albumTracks: []
            }
        },
        async mounted() {
            this.currentArtist = this.$router.currentRoute.query;
            const response = await fetch(`https://api.spotify.com/v1/artists/${this.currentArtist.id}/albums`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            });
            const data = await response.json();
            this.totalAlbums = data.total;
            this.albumsList = data.items.map(el => el = {
                id: el.id,
                name: el.name,
                image: el.images[0]?.url
            });
        },
        methods: {
            async getTracksOfAlbum(albumId) {
                this.albumTracks = [];
                const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    },
                });
                const data = await response.json();
                this.albumTracks = data.items.map(el => el = {
                    id: el.id,
                    name: el.name,
                    track: el.preview_url,
                });
            },
            playHandler(id) {
                const audiosAll = Array.from(document.querySelectorAll('.track-audio'));
                const disableOnes = audiosAll.filter(each => each.dataset.id !== id);
                disableOnes.forEach(each => {
                    each.currentTime = 0;
                    each.pause();
                });
                const playingOne = audiosAll.find(each => each.dataset.id === id);
                playingOne.play();
            }
        }
    }
</script>

<style scoped>
    .artist-block {
        margin-top: 10px;
        padding: 20px;
        display: flex;
        background-color: #353535;
    }
    .artist-image {
        width: 200px;
        height: 200px;
    }
    .artist-image img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
    }
    .artist-info {
        padding-top: 15px;
        padding-left: 15px;
        color: #fff;
    }
    .artist-info p {
        font-size: 30px;
    }
    .artist-info div {
        font-size: 15px;
    }
    .totalAlbum-text {
        color: #fff;
        text-align: right;
        font-size: 13px;
    }
    .album-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .album-content {
        width: 130px;
        height: 130px;
        margin: 20px;
    }
    .album-content div {
        cursor: pointer;
    }
    .album-content div img {
        width: 100%;
    }
    .album-content p {
        color: #fff;
        font-size: 12px;
        font-style: italic;
    }
    /*.modal-content {*/
    /*    width: 800px !important;*/
    /*}*/
    .track {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid #F1F1F1;
    }
</style>