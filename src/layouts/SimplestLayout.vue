<template>
  <div>
    <H1>Simplest layour</H1>
    <div id="nav">
        <router-link to="/">Home Layout A </router-link> |
        <router-link to="/about">About Layout B</router-link> |
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "SimplestLayout"
};
</script>