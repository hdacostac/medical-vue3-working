<template>
   <div>
      <select v-model="locale">
         <option>en</option>
         <option>es</option>
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