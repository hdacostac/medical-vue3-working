/* eslint-disable vue/no-deprecated-slot-attribute */
<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="validationSchema">
      <Tabs :model="tabModel"></Tabs>
      <div id="tab1" class="container is-fluid">
        <h1 class="title">{{ $t('patient.form.tab.personal.data.title') }}</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{{ $t('avatar.patient.title') }}</p>
              </header>
              <div class="card-content" style="text-align: center">
                <AvatarUpload :avatar="avatar.images[avatar.selected]" @onSuccess="onAvatarChange" :url="patient.url1FileName"></AvatarUpload>
              </div>
          </div>
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
                <Calendar id="birthDate" :label="$t('patient.form.birth.date')"
                  :placeHolder="$t('patient.form.placeholder.birth.date')" v-model="currentBirthDate"></Calendar>
              </div>
              <div class="column is-half">
                <div class="columns is-multiline">
                  <div class="column is-full">
                    <SelectOptions id="bloodGroupId" :label="$t('patient.form.blood.group')" item-key="id" item-value="description" 
                      :items="bloodGroupsItems" :placeHolder="$t('patient.form.placeholder.blood.group')" v-model="bloodGroupSelected"></SelectOptions>
                  </div>
                  <div class="column is-full">
                    <SelectOptions id="countryId" :label="$t('patient.form.country')" item-key="id" item-value="description" 
                      :items="countryItems" :placeHolder="$t('patient.form.placeholder.country')" v-model="countrySelected"
                      filter="true"></SelectOptions>
                  </div>
                </div>
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
        <h1 class="title">{{ $t('patient.form.tab.personal.data.contact.info.title') }}</h1>
        <div class="columns is-multiline">
          <div class="column is-one-third">
            <InputText id="mobilePhone" :label="$t('patient.form.mobile.phone')" type="tel" pattern="[0-9]{3} [0-9]{9} [0-9]{3}"
              :placeHolder="$t('patient.form.placeholder.mobile.phone')" v-model="patient.mobilePhone"></InputText>
          </div>
          <div class="column is-one-third">
            <InputText id="homePhone" :label="$t('patient.form.home.phone')" type="tel" pattern="[0-9]{3} [0-9]{9} [0-9]{3}"
              :placeHolder="$t('patient.form.placeholder.home.phone')" v-model="patient.homePhone"></InputText>
          </div>
          <div class="column is-one-third">
            <InputText id="email" :label="$t('patient.form.email')" type="email"
              :placeHolder="$t('patient.form.placeholder.email')" v-model="patient.email"></InputText>
          </div>
          <div class="column is-full">
            <InputText id="addressLine1" :label="$t('patient.form.address.first.part')" 
              :placeHolder="$t('patient.form.placeholder.address.first.part')" v-model="patient.addressLine1"></InputText>
          </div>
          <div class="column is-full">
            <InputText id="addressLine2" :label="$t('patient.form.address.second.part')" 
              :placeHolder="$t('patient.form.placeholder.address.second.part')" v-model="patient.addressLine2"></InputText>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-narrow">
            <SelectOptions id="provinceId" :label="$t('patient.form.address.province')" item-key="id" item-value="description" 
              :items="provinceItems" v-model="provinceSelected" @change="onChangeProvince($event)"
              :placeHolder="$t('patient.form.placeholder.address.province')" filter="true"></SelectOptions>
          </div>
          <div class="column is-narrow">
            <SelectOptions id="municipalityId" :label="$t('patient.form.address.municipality')" item-key="id" item-value="description" 
              :items="municipalityItems" v-model="municipalitySelected" @change="onChangeMunicipality($event)"
              :placeHolder="$t('patient.form.placeholder.address.municipality')" filter="true"></SelectOptions>
          </div>
          <div class="column is-narrow">
            <SelectOptions id="postalCodeId" :label="$t('patient.form.address.postal.code')" item-key="id" item-value="code" 
              :items="postalCodeItems" v-model="postalCodeSelected"
              :placeHolder="$t('patient.form.placeholder.address.postal.code')" filter="true"></SelectOptions>
          </div>
        </div>
      </div>
      <div id="tab2" class="container is-fluid">
        <p>Hola</p>
      </div>
      <div class="section">
        <PrimeToolbar>
          <template v-slot:right>
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

// Connection part
import { fillArrayFromRest } from '@/configuration/rest.config';

// Controller part
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
    IdentityDocument,
    Form
  },
  setup() {
    const {t, locale} = useI18n();

    const validationEntity = {
      // name: Yup.string().max(64).required().label(t('patient.form.name')),
      // lastName: Yup.string().max(64).required().label(t('patient.form.lastname')),
      // identityDocumentTypeId: Yup.number().required().label(t('patient.form.identity.document')),
      // identityDocument: Yup.string().max(64).required().label(t('patient.form.identity.document')),
      // sanitaryDocument: Yup.string().max(64).label(t('patient.form.sanitary.document')),
      // mobilePhone: Yup.string().max(32).required().label(t('patient.form.mobile.phone')),
      // addressLine1: Yup.string().required().label(t('patient.form.address.first.part'))
      // postalCodeId: Yup.number().required().label(t('patient.form.address.postal.code'))
    }

    const validationSchema = markRaw(Yup.object().shape(validationEntity));

    return {
      validationEntity,
      validationSchema,
      t, 
      locale
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
      countrySelected: null,
      countryItems: [{id: 1, code: "Loading data..."}],
      identityDocumentsTypeSelected: null,
      identityDocumentsTypesItems: [{id: 1, code: "Loading data..."}],
      currentBirthDate: null,
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
    this. $nextTick(function () {
      document.querySelector('#pageloader').classList.remove("is-active");
    })

    this.patientFormController = new PatientFormController('/v1/persons', '/v1/persons', true);

    this.getSexItems();
    this.getBloodGroupsItems();
    this.getProvinceItems();
    this.getIdentityDocumentTypesItems();
    this.getCountryItems();
  },
  computed: {
    saveIcon: function() {
      return this.isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-check';
    },
    calculateAge: function () {
      if(this.currentBirthDate == null) {
        return {
          isValid: false,
          msg: this.t('patient.form.placeholder.birth.date.calculate.label')
        };
      }

      let ageCalculated = new Date().getFullYear() - new Date(this.currentBirthDate).getFullYear();

      if(ageCalculated >= 0 && ageCalculated <= 200){
        return {
          isValid: true,
          msg: this.t('global.option.years', [ageCalculated])
        };
      }

      let dateParts = this.currentBirthDate.split("/");

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
      console.log("Valor en modelo:" + this.identityDocumentsTypeSelected.code);
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
          this.bloodGroupsItems.unshift( { id: -1, code: "", description: this.t('global.option.not.selected') } )
      });
    },
    getIdentityDocumentTypesItems: function() {
      fillArrayFromRest('/v1/simple/identity-documents-types', this, 'identityDocumentsTypesItems');
    },
    getProvinceItems: function() {
      fillArrayFromRest('/v1/simple/provinces', this, 'provinceItems');
    },
    getCountryItems: function() {
      fillArrayFromRest('/v1/simple/countries', this, 'countryItems', null, () => {
          this.countryItems.unshift( { id: -1, code: "", description: this.t('global.option.not.selected') } )
      });
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
