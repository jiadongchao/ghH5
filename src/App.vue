<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
</div>
  </div>
</template>

<script>
export default {
  name: 'app',
   mounted:function(){
    this.$router.push('/');
  }
}
</script>

<style>
@import 'style/css.css';

body {
  background-color: #fbf9fe;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
