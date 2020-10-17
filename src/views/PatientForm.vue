/* eslint-disable vue/no-deprecated-slot-attribute */
<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="validationSchema">
      <Tabs :model="tab_model"></Tabs>
      <div id="tab1" class="container is-fluid">
        <h1 class="title">{{ $t('patient.form.tab.personal.data.title') }}</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <AvatarUpload :avatar="avatar.images[avatar.selected]"></AvatarUpload>
          </div>
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-half">
                <InputText id="name" label="Nombres" 
                  placeHolder="Nombre del paciente" v-model="patient.name"></InputText>
              </div>
              <div class="column is-half">
                <InputText id="lastName" label="Apellidos" 
                  placeHolder="Apellido del paciente" v-model="patient.lastName"></InputText>
              </div>
              <div class="column is-half">
                <InputText id="identityDocument" label="(DNI) Documento nacional de identidad" 
                  placeHolder="Documento de identidad" v-model="patient.identityDocument"></InputText>
              </div>
              <div class="column is-half">
                <InputText id="sanitaryDocument" label="Documento sanitario" 
                  placeHolder="Documento sanitario" v-model="patient.sanitaryDocument"></InputText>
              </div>
              <div class="column is-half">
                <RadioOptions id="sexId" label="Sexo" item-key="id" item-value="description" 
                  :items="sex_items" v-model="patient.sexId" @change="onChangeSex($event)"></RadioOptions>
              </div>
              <div class="column is-half">
                <SelectOptions id="bloodGroupId" label="Grupo sanguíneo" item-key="id" item-value="description" 
                  :items="blood_groups_items" v-model="blood_group_selected"></SelectOptions>
              </div>
              <div class="column is-half">
                <Calendar id="birthDate" label="Fecha de nacimiento"
                  placeHolder="Fecha de nacimiento" v-model="patient.birthDate"></Calendar>
              </div>
              <div class="column is-half has-text-centered">
                <span>{{ calculateAge }}</span>
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
              :items="province_items" v-model="province_selected" @change="onChangeProvince($event)"></SelectOptions>
          </div>
          <div class="column is-narrow">
            <SelectOptions id="municipalityId" label="Municipalidad" item-key="id" item-value="description" 
              :items="municipality_items" v-model="municipality_selected" @change="onChangeMunicipality($event)"></SelectOptions>
          </div>
          <div class="column is-narrow">
            <SelectOptions id="postalCodeId" label="Código postal" item-key="id" item-value="code" 
              :items="postal_code_items" v-model="postal_code_selected"></SelectOptions>
          </div>
        </div>
      </div>
      <div id="tab2" class="container is-fluid">
        <p>Hola</p>
      </div>
      <div class="section">
        <PrimeToolbar>
          <template v-slot:right>
            <PrimeButton label="Salvar" icon="pi pi-check" iconPos="right" type="submit" />
          </template>
        </PrimeToolbar>
      </div>
    </Form>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue';
import AvatarUpload from '@/components/AvatarUpload.vue';
import InputText from '@/components/InputText.vue';
import SelectOptions from '@/components/SelectOptions.vue';
import RadioOptions from '@/components/RadioOptions.vue';
import Calendar from '@/components/Calendar.vue';

// Validation part
import { Form } from 'vee-validate';
import * as Yup from "yup";

// eslint-disable-next-line no-unused-vars
import { restApi, fillArrayFromRest } from '@/configuration/rest.config';
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
    Form
  },
  data() {
    const validationEntity = {
      name: Yup.string().required().label('Nombres')
    };

    const validationSchema = Yup.object().shape(validationEntity);
    
    return {
      patient: patientDTO,
      validationEntity,
      validationSchema,
      sex_items: [{id: 1, description: "Loading data..."}],
      blood_group_selected: null,
      blood_groups_items: [{id: 1, description: "Loading data..."}],
      province_selected: null,
      province_items: [{id: 1, description: "Loading data..."}],
      municipality_selected: null,
      municipality_items: [{id: 1, description: "Loading data..."}],
      postal_code_selected: null,
      postal_code_items: [{id: 1, code: "Loading data..."}],
      tab_model: [{
        tab_id: 'tab1',
        title: 'Datos principales',
        is_active: true
      },{
        tab_id: 'tab2',
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
      }
    }
  },
  mounted() {
    this.patientFormController = new PatientFormController('/v1/patients', '/v1/patients', true);

    this.getSexItems();
    this.getBloodGroupsItems();
    this.getProvinceItems();
  },
  computed: {
    calculateAge: function () {
      if(this.patient.birthDate == null) {
        return 'Ingrese una fecha de nacimiento para calcular la edad';
      }

      let ageCalculated = new Date().getFullYear() - new Date(this.patient.birthDate).getFullYear();

      if(ageCalculated >= 0 && ageCalculated <= 200){
        return ageCalculated + ' años';
      }

      let dateParts = this.patient.birthDate.split("/");

      if(dateParts.length == 3) {
        let dateParsed = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let ageCalculated = new Date().getFullYear() - new Date(dateParsed).getFullYear();

        if(ageCalculated >= 0 && ageCalculated <= 200){
          return ageCalculated + ' años';
        }
      }

      return 'Ingrese una fecha de nacimiento para calcular la edad';
    }
  },
  // our methods
  methods: {
    onChangeMunicipality: function(event){
      this.postal_code_selected = null;

      this.getPostalCodeItems(this.province_selected.id, event.value.id);
    },
    onChangeProvince: function(event){
      this.postal_code_items = [];

      this.municipality_selected = null;
      this.postal_code_selected = null;

      this.getMunicipalityItems(event.value.id);
    },
    onChangeSex: function(event){
      this.avatar.selected = event;
    },
    // eslint-disable-next-line no-unused-vars
    onSubmit(values, { form }) {
      this.patientFormController.save(this.patient, this, form);
    },
    getSexItems: function() {
      fillArrayFromRest('/v1/simple/sex', this, 'sex_items');
    },
    getBloodGroupsItems: function() {
      fillArrayFromRest('/v1/simple/bloodGroups', this, 'blood_groups_items', null, () => {
        this.blood_groups_items.unshift({id: 0, description: "Desconocido"});
      });
    },
    getProvinceItems: function() {
      fillArrayFromRest('/v1/simple/provinces', this, 'province_items');
    },
    getMunicipalityItems: function(provinceId) {
      let queryParams = {
        province_id: provinceId
      }

      fillArrayFromRest('/v1/simple/municipalities', this, 'municipality_items', queryParams);
    },
    getPostalCodeItems: function(provinceId, municipalityId) {
      let queryParams = {
        province_id: provinceId,
        municipality_id: municipalityId
      }

      fillArrayFromRest('/v1/simple/postal-codes', this, 'postal_code_items', queryParams, () => {
        if (this.postal_code_items.length == 1) {
          this.postal_code_selected = this.postal_code_items[0];
        }
      });
    }
  }
}
</script>
