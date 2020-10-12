<template>
  <component :is="this.$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>
