import AbstractActionForm from './AbstractActionForm';

class PatientFormController extends AbstractActionForm {

    validate(entity, validatingOnAction) {
        console.log('Value for validation:' + validatingOnAction);

        if (validatingOnAction == AbstractActionForm.VALIDATING_ON_INSERT) {
            console.log('Executing validate() on insert overwrited');
            
            entity.provinceId = this.ctx.province_selected ? this.ctx.province_selected.id : null;
            entity.municipalityId = this.ctx.municipality_selected ? this.ctx.municipality_selected.id : null;
            entity.postalCodeId = this.ctx.postal_code_selected ? this.ctx.postal_code_selected.id : null;
            entity.bloodGroupId = this.ctx.blood_group_selected ? this.ctx.blood_group_selected.id : null;
		} else if (validatingOnAction == AbstractActionForm.VALIDATING_ON_UPDATE) {
			console.log('Executing validate() on update overwrited');
		} else if (validatingOnAction == AbstractActionForm.VALIDATING_ON_DELETE) {
			console.log('Executing validate() on delete overwrited');

			return;
		}
    }

}

export default PatientFormController;