import AbstractActionForm from './AbstractActionForm';

class PatientFormController extends AbstractActionForm {

    validate(entity, validatingOnAction) {
        super.validate(entity, validatingOnAction);

        entity.provinceId = this.ctx.provinceSelected ? this.ctx.provinceSelected.id : null;
        entity.municipalityId = this.ctx.municipalitySelected ? this.ctx.municipalitySelected.id : null;
        entity.postalCodeId = this.ctx.postalCodeSelected ? this.ctx.postalCodeSelected.id : null;
        entity.bloodGroupId = this.ctx.bloodGroupSelected ? this.ctx.bloodGroupSelected.id : null;
    }

}

export default PatientFormController;