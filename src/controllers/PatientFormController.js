import AbstractActionForm from './AbstractActionForm';

class PatientFormController extends AbstractActionForm {

    validate(entity, validatingOnAction) {
        super.validate(entity, validatingOnAction);

        entity.identityDocumentTypeId = this.ctx.identityDocumentsTypeSelected ? this.ctx.identityDocumentsTypeSelected.id : null;
        entity.bloodGroupId = this.ctx.bloodGroupSelected ? this.ctx.bloodGroupSelected.id : null;
        entity.countryBirthId = this.ctx.countrySelected ? this.ctx.countrySelected.id : null;
        entity.provinceId = this.ctx.provinceSelected ? this.ctx.provinceSelected.id : null;
        entity.municipalityId = this.ctx.municipalitySelected ? this.ctx.municipalitySelected.id : null;
        entity.postalCodeId = this.ctx.postalCodeSelected ? this.ctx.postalCodeSelected.id : null;

        entity.birthDate ? entity.birthDate = entity.birthDate.toLocaleDateString() : entity.birthDate = null;
    }

    setFieldError(item) {
        if(item[1].field == 'identityDocumentTypeId') {
            this.form.setFieldError('identityDocument', { key: 'patient.form.identity.document.type.required' });
        } else {
            super.setFieldError(item);
        }
    }

}

export default PatientFormController;