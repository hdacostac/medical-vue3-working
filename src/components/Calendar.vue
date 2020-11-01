<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <PrimeCalendar :id="id" v-model="value" v-bind="$attrs" v-mask="'##/##/####'" dateFormat="dd/mm/yy" 
            :yearNavigator="true" yearRange="1900:2100" :monthNavigator="true" :manualInput="true" showIcon="true"
            :locale="this[this.$i18n.locale]" :showButtonBar="true" />
      </div>
   </div>
</template>

<style lang="postcss" scoped>
   .p-calendar {
      width: 100%;
   }
</style>

<script>
import {mask} from 'vue-the-mask';

export default {
   name: 'Calendar',
   inheritAttrs: false,
   directives: {mask},
   mounted() {
      this.locale = this.$i18n.locale;
   },
   data() {
      return {
         locale: null,
         es: {
            firstDayOfWeek: 1,
            dayNames: [ "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado" ],
            dayNamesShort: [ "Dom","Lun","Mar","Mié","Jue","Vie","Sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
            monthNamesShort: [ "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic" ],
            today: 'Hoy',
            clear: 'Borrar',
            weekHeader: 'Sm'
         },
         fr: {
            firstDayOfWeek: 1,
            dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
            dayNamesShort: [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ],
            dayNamesMin: [ "D","L","M","M","J","V","S" ],
            monthNames: [ "janvier", "février", "mars", "avril", "mai", "juin",
               "juillet", "août", "septembre", "octobre", "novembre", "décembre" ],
            monthNamesShort: [ "janv.", "févr.", "mars", "avr.", "mai", "juin",
               "juil.", "août", "sept.", "oct.", "nov.", "déc." ],
            today: "Aujourd'hui",
            clear: 'Fermer',
            weekHeader: 'Sm'
         }
      }
   },
   props: {
      id: {
         type: String 
      },
      modelValue: {
         type: Object,
      },
      label: {
         type: String
      }
   },
   computed: {
      value: {
         get() {
            return this.modelValue
         },
         set(value) {
            this.$emit('update:modelValue', value)
         }
      }
   }
}
</script>