<template>
  <div id="app">
    <TopNavbar/>
    <div class="content">
      <div v-if="!accessToken" class="isLogin-block">
        <p>For using the website functionality you need to <a :href="`https://accounts.spotify.com/en/authorize?client_id=${clientId}&redirect_uri=${host}&response_type=token`">Sign In.</a></p>
      </div>
      <router-view v-if="accessToken" />
    </div>
  </div>
</template>

<script>
import TopNavbar from './components/TopNavbar';
export default {
  name: 'App',
  data() {
    return {
      clientId: '11d84f353e01404885ab982803828d25',
      accessToken: localStorage.getItem('accessToken') ?? '',
      host: 'http://localhost:8080'
    }
  },
  components: {
    TopNavbar,
  },
  mounted() {
    if(location.href.search('access_token') > 0) {
      let fullPath = this.$router.currentRoute.hash;
      let lastElementIndex = fullPath.indexOf('&', 0);
      this.accessToken = fullPath.slice(14, lastElementIndex);
      if(this.accessToken !== '') {
        localStorage.setItem('accessToken', this.accessToken);
        location.href = 'http://localhost:8080/';
      }
    }
  }
}
</script>

<style>
  .isLogin-block p {
    margin-top: 10px;
    color: #fff;
  }
  .isLogin-block p a {
    color: #1ED760;
  }
  .isLogin-block p a:hover {
    color: #1ED760;
  }
</style>