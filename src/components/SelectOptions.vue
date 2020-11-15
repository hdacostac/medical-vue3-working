<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <Field :name="id" v-slot="{ field }">
            <PrimeDropdown :id="id" v-model="value" :options="items" :optionLabel="itemValue" v-bind="field" 
               :placeholder="placeHolder" @change="this.$emit('change', $event)" :filter="filter">
            </PrimeDropdown>
            <ErrorMessage :name="id" v-slot="{ message }" as="div">
               <InlineMessage v-if="message">{{ $t(message.key, message.values) }}</InlineMessage>
            </ErrorMessage>
         </Field>
      </div>
   </div>
</template>

<style lang="postcss" scoped>
   .p-dropdown {
      width: 100%;
   }
</style>

<script>
import { Field, ErrorMessage } from 'vee-validate';
import InlineMessage from 'primevue/inlinemessage';

export default {
   name: 'SelectOptions',
   inheritAttrs: false,
   components: {
      Field,
      ErrorMessage,
      InlineMessage
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
      },
      items: {
         type: Array
      },
      itemValue: {
         type: String
      },
      placeHolder: {
         type: String
      },
      filter: {
         type: Boolean,
         default: false
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