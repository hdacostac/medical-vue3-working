<template>
   <div class="field">
      <label :for="id" class="label">{{ label }}</label>
      <div class="control">
         <Field :name="id" v-slot="{ field }">
            <div class="columns is-gapless is-multiline">
               <div class="column is-narrow">
                  <PrimeDropdown :id="`${id}Type`" v-model="documentTypeValue" :options="items" :optionLabel="itemValue" 
                     :placeholder="$t('component.identity.document.type.label')" @change="this.$emit('change', $event)">
                  </PrimeDropdown>
               </div>
               <div class="column">
                  <PrimeInputText :id="id" :name="id" :label="label" class="input" v-model="value" v-bind="field" :placeHolder="placeHolder" />
               </div>
               <div class="column is-full">
                  <ErrorMessage :name="id" v-slot="{ message }">
                     <InlineMessage v-if="message">{{ $t(message.key, message.values) }}</InlineMessage>
                  </ErrorMessage>
               </div>
            </div>
         </Field>
      </div>
   </div>
</template>

<style lang="postcss" scoped>
   #identityDocumentType.p-dropdown {
      height: 40px;
   }
</style>

<script>
import { Field, ErrorMessage } from 'vee-validate';
import InlineMessage from 'primevue/inlinemessage';

export default {
   name: 'IdentityDocument',
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
      documentType: {
         type: Object,
      },
      label: {
         type: String
      },
      placeHolder: {
         type: String
      },
      trim: {
         type: Boolean,
         default: true
      },
      items: {
         type: Array
      },
      itemValue: {
         type: String
      }
   },
   computed: {
      documentTypeValue: {
         get() {
            return this.documentType
         },
         set(value) {
            this.$emit('update:documentType', value)
         }
      },
      value: {
         get() {
            return this.modelValue
         },
         set(value) {
            this.$emit('update:modelValue', this.trim ? value.trim() : value)
         }
      }
   }
}
</script>