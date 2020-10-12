<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <Field :name="id" v-slot="{ field }">
            <PrimeInputText :id="id" :name="id" class="input" :type="type" v-model="value" v-bind="field" :placeHolder="placeHolder" />
            <ErrorMessage :name="id" v-slot="{ message }">
               <InlineMessage v-show="message">{{ message }}</InlineMessage>
            </ErrorMessage>
         </Field>
      </div>
   </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';
import InlineMessage from 'primevue/inlinemessage';

export default {
   name: 'InputText',
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
      type: {
         type: String,
         default: 'text'
      },
      placeHolder: {
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