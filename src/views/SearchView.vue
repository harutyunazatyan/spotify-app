<template>
    <div>
        <p class="search-title">Search artists...</p>
        <div class="search-form">
            <input type="text" placeholder="Artist name" v-model="artistName" @keyup.enter="searchArtist()">
            <button @click="searchArtist()">Search</button>
        </div>
        <div v-if="allArtistsBySearch.length > 0" class="artist-block">
            <div v-for="artist in allArtistsBySearch" :key="artist.id" class="artist-content">
                <div class="artist-image-block">
                    <img :src="artist.image" @click="getAlbumsOfArtist(artist)">
                </div>
                <p>{{ artist.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchView',
        data() {
            return {
                token: localStorage.getItem('accessToken'),
                artistName: '',
                allArtistsBySearch: []
            }
        },
        methods: {
            async searchArtist() {
                if(this.artistName !== '') {
                    this.allArtistsBySearch = [];
                    const response = await fetch(`https://api.spotify.com/v1/search?q=${this.artistName}&type=artist&limit=50`,{
                        method: 'get',
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        },
                    });
                    const data = await response.json();
                    this.allArtistsBySearch = data.artists.items.map(item => item = {
                        id: item.id,
                        name: item.name,
                        image: item.images[0]?.url ? item.images[0].url : 'https://i.scdn.co/image/ab6761610000e5eb617f0585c7aa4750589fd7ce',
                        followers: item.followers.total
                    });
                }
            },
            getAlbumsOfArtist(artist) {
                this.$router.push({ path: `/artist/${artist.id}`, query: artist });
            },
        }
    }
</script>

<style scoped>
    .search-title {
        font-size: 2.5rem;
        margin-top: 10px;
        color: #fff;
    }
    .search-form {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .search-form input {
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 8px;
        padding-left: 15px;
        outline: none;
    }
    .search-form button {
        margin-top: 10px;
        width: 120px;
        height: 40px;
        border-radius: 8px;
        border: none;
        background-color: #1ED760;
        color: #202124;
        cursor: pointer;
    }
    .artist-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }
    .artist-content {
        margin: 15px;
    }
    .artist-content p {
        margin-top: 5px;
        color: #fff;
        font-size: 12px;
        font-style: italic;
        word-break: break-word;
    }
    .artist-image-block {
        width: 180px;
        height: 180px;
        cursor: pointer;
    }
    .artist-image-block img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>