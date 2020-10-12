<template>
  <div class="home">
    <Toast />
    <h2>{{ t('title') }}</h2>
    <button @click="showToastMessage">Click me</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import Toast from 'primevue/toast';

import { useI18n } from 'vue-i18n';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Toast
  },
  setup() {
    const {t, locale} = useI18n();

    return {t, locale};
  },
  methods: {
    showToastMessage: function() {
      console.log("Message showed");
      this.$toast.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000});
    }
  }
}
</script>
