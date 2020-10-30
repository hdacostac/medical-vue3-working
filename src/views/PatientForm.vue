/* eslint-disable vue/no-deprecated-slot-attribute */
<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="validationSchema" v-slot="{ meta }">
      <Tabs :model="tabModel"></Tabs>
      <div id="tab1" class="container is-fluid">
        <h1 class="title">{{ $t('patient.form.tab.personal.data.title') }}</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <AvatarUpload :avatar="avatar.images[avatar.selected]" @onSuccess="onAvatarChange" :url="patient.url1FileName"></AvatarUpload>
          </div>
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-half">
                <InputText id="name" :label="$t('patient.form.name')" 
                  :placeHolder="$t('patient.form.placeholder.name')" v-model="patient.name"></InputText>
              </div>
              <div class="column is-half">
                <InputText id="lastName" :label="$t('patient.form.lastname')" 
                  :placeHolder="$t('patient.form.placeholder.lastname')" v-model="patient.lastName"></InputText>
              </div>
              <div class="column is-half">
                <IdentityDocument id="identityDocument" :label="$t('patient.form.identity.document')" :documentType="identityDocumentsTypeSelected"
                  :placeHolder="$t('patient.form.placeholder.identity.document')" @change="onChangeDocumentType" v-model="patient.identityDocument"
                  item-value="description" :items="identityDocumentsTypesItems"></IdentityDocument>
              </div>
              <div class="column is-half">
                <InputText id="sanitaryDocument" :label="$t('patient.form.sanitary.document')" 
                  :placeHolder="$t('patient.form.placeholder.sanitary.document')" v-model="patient.sanitaryDocument"></InputText>
              </div>
              <div class="column is-half">
                <RadioOptions id="sexId" :label="$t('patient.form.sex')" item-key="id" item-value="description" 
                  :items="sexItems" v-model="patient.sexId" @change="onChangeSex($event)"></RadioOptions>
              </div>
              <div class="column is-half">
                <SelectOptions id="bloodGroupId" :label="$t('patient.form.blood.group')" item-key="id" item-value="description" 
                  :items="bloodGroupsItems" :placeHolder="$t('patient.form.placeholder.blood.group')" v-model="bloodGroupSelected"></SelectOptions>
              </div>
              <div class="column is-half">
                <Calendar id="birthDate" :label="$t('patient.form.birth.date')"
                  :placeHolder="$t('patient.form.placeholder.birth.date')" v-model="patient.birthDate"></Calendar>
              </div>
              <div class="column is-half has-text-centered">
                <div v-if="!calculateAge.isValid">
                  <div class="tile is-parent">
                    <article class="tile is-child notification has-background-light">
                      <p class="is-size-4">{{ calculateAge.msg }}</p>
                    </article>
                  </div>
                </div>
                <div v-else>
                  <div class="tile is-parent">
                    <article class="tile is-child notification is-primary">
                      <p class="is-size-4">{{ $t('patient.form.placeholder.birth.date.calculated.label') }}</p>
                      <p class="is-size-3">{{ calculateAge.msg }}</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 class="title">Información de contacto</h1>
        <div class="columns is-multiline">
          <div class="column is-one-third">
            <InputText id="mobilePhone" label="Teléfono móvil" type="tel" pattern="[0-9]{3} [0-9]{9} [0-9]{3}"
              placeHolder="Móvil" v-model="patient.mobilePhone"></InputText>
          </div>
          <div class="column is-one-third">
            <InputText id="homePhone" label="Teléfono de casa" type="tel" pattern="[0-9]{3} [0-9]{9} [0-9]{3}"
              placeHolder="Teléfono" v-model="patient.homePhone"></InputText>
          </div>
          <div class="column is-one-third">
            <InputText id="email" label="Email" type="email"
              placeHolder="Correo electrónico" v-model="patient.email"></InputText>
          </div>
          <div class="column is-full">
            <InputText id="addressLine1" label="Dirección 1" 
              placeHolder="Dirección 1" v-model="patient.addressLine1"></InputText>
          </div>
          <div class="column is-full">
            <InputText id="addressLine2" label="Dirección 2" 
              placeHolder="Dirección 2" v-model="patient.addressLine2"></InputText>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-narrow">
            <SelectOptions id="provinceId" label="Provincia" item-key="id" item-value="description" 
              :items="provinceItems" v-model="provinceSelected" @change="onChangeProvince($event)"></SelectOptions>
          </div>
          <div class="column is-narrow">
            <SelectOptions id="municipalityId" label="Municipalidad" item-key="id" item-value="description" 
              :items="municipalityItems" v-model="municipalitySelected" @change="onChangeMunicipality($event)"></SelectOptions>
          </div>
          <div class="column is-narrow">
            <SelectOptions id="postalCodeId" label="Código postal" item-key="id" item-value="code" 
              :items="postalCodeItems" v-model="postalCodeSelected"></SelectOptions>
          </div>
        </div>
      </div>
      <div id="tab2" class="container is-fluid">
        <p>Hola</p>
      </div>
      <div class="section">
        <PrimeToolbar>
          <template v-slot:right>
            Formulario tocado:{{ meta.touched}} Formulario manipulado {{ meta.dirty }}
            <PrimeButton label="Salvar" :icon="saveIcon" iconPos="right" type="submit" :disabled="isSubmitting" />
          </template>
        </PrimeToolbar>
      </div>
    </Form>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import { useI18n } from "vue-i18n";

// @ is an alias to /src
import Tabs from '@/components/Tabs.vue';
import AvatarUpload from '@/components/AvatarUpload.vue';
import InputText from '@/components/InputText.vue';
import SelectOptions from '@/components/SelectOptions.vue';
import RadioOptions from '@/components/RadioOptions.vue';
import Calendar from '@/components/Calendar.vue';
import IdentityDocument from '@/components/IdentityDocument.vue';

// Validation part
import { Form } from 'vee-validate';
import * as Yup from "yup";

import { fillArrayFromRest } from '@/configuration/rest.config';
import patientDTO from '@/model/PatientDTO';
import PatientFormController from '@/controllers/PatientFormController';

export default {
  name: 'PatientForm',
  components: {
    Tabs, 
    AvatarUpload, 
    InputText, 
    SelectOptions, 
    RadioOptions, 
    Calendar,
    Form,
    IdentityDocument
  },
  setup() {
    const validationEntity = {
      name: Yup.string().required().label('Nombres')
    };

    const validationSchema = markRaw(Yup.object().shape(validationEntity));

    const {t, locale} = useI18n();

    return {
      validationEntity,
      validationSchema,
      t, locale
    }
  },
  data() {
    return {
      patient: patientDTO,
      sexItems: [{id: 1, description: "Loading data..."}],
      bloodGroupSelected: null,
      bloodGroupsItems: [{id: 1, description: "Loading data..."}],
      provinceSelected: null,
      provinceItems: [{id: 1, description: "Loading data..."}],
      municipalitySelected: null,
      municipalityItems: [{id: 1, description: "Loading data..."}],
      postalCodeSelected: null,
      postalCodeItems: [{id: 1, code: "Loading data..."}],
      identityDocumentsTypeSelected: null,
      identityDocumentsTypesItems: [{id: 1, code: "Loading data..."}],
      tabModel: [{
        tabId: 'tab1',
        title: 'Datos principales',
        isActive: true
      },{
        tabId: 'tab2',
        title: 'Antecedentes',
      }],
      avatar: {
        images: [{
          name: 'unisex',
          src: require('@/assets/images/unisex_photo_placeholder.jpg')
        },
        {
          name: 'male',
          src: require('@/assets/images/male_photo_placeholder.jpg')
        },
        {
          name: 'female',
          src: require('@/assets/images/female_photo_placeholder.png')
        }],
        selected: 0
      },
      isSubmitting: false
    }
  },
  mounted() {
    this.patientFormController = new PatientFormController('/v1/patients', '/v1/patients', true);

    this.getSexItems();
    this.getBloodGroupsItems();
    this.getProvinceItems();
    this.getIdentityDocumentTypesItems();
  },
  computed: {
    saveIcon: function() {
      return this.isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-check';
    },
    calculateAge: function () {
      if(this.patient.birthDate == null) {
        return {
          isValid: false,
          msg: this.t('patient.form.placeholder.birth.date.calculate.label')
        };
      }

      let ageCalculated = new Date().getFullYear() - new Date(this.patient.birthDate).getFullYear();

      if(ageCalculated >= 0 && ageCalculated <= 200){
        return {
          isValid: true,
          msg: this.t('global.option.years', [ageCalculated])
        };
      }

      let dateParts = this.patient.birthDate.split("/");

      if(dateParts.length == 3) {
        let dateParsed = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let ageCalculated = new Date().getFullYear() - new Date(dateParsed).getFullYear();

        if(ageCalculated >= 0 && ageCalculated <= 200){
          return {
            isValid: true,
            msg: this.t('global.option.years', [ageCalculated])
          };
        }
      }

      return {
        isValid: false,
        msg: this.t('patient.form.placeholder.birth.date.calculate.label')
      };
    }
  },
  // our methods
  methods: {
    onChangeDocumentType: function(event){
      this.identityDocumentsTypeSelected = event.value;

      console.log("Event:" + event.value.code);
      console.log("VAlor en modelo:" + this.identityDocumentsTypeSelected.code);
    },
    onChangeMunicipality: function(event){
      this.postalCodeSelected = null;

      this.getPostalCodeItems(this.provinceSelected.id, event.value.id);
    },
    onChangeProvince: function(event){
      this.postalCodeItems = [];

      this.municipalitySelected = null;
      this.postalCodeSelected = null;

      this.getMunicipalityItems(event.value.id);
    },
    onChangeSex: function(event){
      this.avatar.selected = event;
    },
    onAvatarChange: function(avatarInfo) {
      console.log("Info de la imagen:" + avatarInfo.filePath);

      this.patient.url1FileName = avatarInfo.filePath;
    },
    onSubmit: function(values, { form }) {
      this.patientFormController.save(this.patient, this, form);
    },
    getSexItems: function() {
      fillArrayFromRest('/v1/simple/sex', this, 'sexItems');
    },
    getBloodGroupsItems: function() {
      fillArrayFromRest('/v1/simple/blood-groups', this, 'bloodGroupsItems', null, () => {
          this.bloodGroupsItems.unshift( { id: 0, code: "", description: this.t('global.option.not.selected') } )
      });
    },
    getIdentityDocumentTypesItems: function() {
      fillArrayFromRest('/v1/simple/identity-documents-types', this, 'identityDocumentsTypesItems');
    },
    getProvinceItems: function() {
      fillArrayFromRest('/v1/simple/provinces', this, 'provinceItems');
    },
    getMunicipalityItems: function(provinceId) {
      let queryParams = {
        province_id: provinceId
      }

      fillArrayFromRest('/v1/simple/municipalities', this, 'municipalityItems', queryParams);
    },
    getPostalCodeItems: function(provinceId, municipalityId) {
      let queryParams = {
        province_id: provinceId,
        municipality_id: municipalityId
      }

      fillArrayFromRest('/v1/simple/postal-codes', this, 'postalCodeItems', queryParams, () => {
        if (this.postalCodeItems.length == 1) {
          this.postalCodeSelected = this.postalCodeItems[0];
        }
      });
    }
  }
}
</script>
