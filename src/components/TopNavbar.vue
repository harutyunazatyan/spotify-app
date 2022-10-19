<template>
    <div class="def-container">
        <div class="content">
            <div class="header">
                <div class="logo">
                    <img src="https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM" width="30px" alt="">
                    <p class="mb-0">Spotify</p>
                </div>
                <ul class="main-menu mb-0">
                    <li class="list-items"><router-link to="/search">Search</router-link></li>
                    <li v-if="isLogin" class="list-items logout" @click="logout()"><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TopNavbar',
        data() {
            return {
                isLogin: false,
            }
        },
        async mounted() {
            if(await localStorage.getItem('accessToken')) {
                this.isLogin = true;
            }
        },
        methods: {
             logout() {
                localStorage.removeItem('accessToken');
                location.href = 'http://localhost:8080/';
            }
        }
    }
</script>

<style scoped>
    .def-container {
        background-color: #202124;
    }
    .logo {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 3px;
        color: #1ED760;
    }
    .header {
        display: flex;
        justify-content: space-between;
        height: 70px;
        align-items: center;
    }
    .main-menu {
        display: flex;
    }
    .main-menu li a {
        display: inline-block;
        padding: 10px 20px;
        color: #fff;
    }
    .logout {
        cursor: pointer;
    }
    .logout:hover {
        color: #fff;
    }
</style>