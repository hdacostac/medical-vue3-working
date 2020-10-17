import AbstractActionForm from './AbstractActionForm';

class PatientFormController extends AbstractActionForm {

    validate(entity, validatingOnAction) {
        super.validate(entity, validatingOnAction);

        entity.provinceId = this.ctx.province_selected ? this.ctx.province_selected.id : null;
        entity.municipalityId = this.ctx.municipality_selected ? this.ctx.municipality_selected.id : null;
        entity.postalCodeId = this.ctx.postal_code_selected ? this.ctx.postal_code_selected.id : null;
        entity.bloodGroupId = this.ctx.blood_group_selected ? this.ctx.blood_group_selected.id : null;
    }

}

export default PatientFormController;