<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <PrimeDropdown :id="id" v-model="value" v-bind="$attrs" :options="items" :optionLabel="itemValue" placeholder="Choose a blood group">
            <!-- <option value="0" :selected="true">Choose Province</option>
            <option v-for="item in items" :key="item[itemKey]" :value="item[itemKey]">{{ item[itemValue] }}</option> -->
         </PrimeDropdown>
      </div>
   </div>
</template>

<script>
export default {
   name: 'SelectOptions',
   inheritAttrs: false,
   props: {
      id: {
         type: String 
      },
      modelValue: {
         type: Object,
      },
      label: {
         type: String
      },
      items: {
         type: Array
      },
      itemKey: {
         type: Object
      },
      itemValue: {
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