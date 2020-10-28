<template>
   <div>
      <select v-model="locale">
         <option>es</option>
         <option>ca</option>
         <option>pt</option>
         <option>fr</option>
      </select>     
   </div>
</template>

<script>
export default {
   name: 'Locale',
   data() {
      return {
         locale: null
      }
   },
   watch: {
      locale(val) {
         this.$i18n.locale = val;
      }
  },
  mounted() {
      this.locale = this.$i18n.locale;
  }
}
</script>