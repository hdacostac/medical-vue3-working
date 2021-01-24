import AbstractActionForm from './AbstractActionForm';
import { transformNullValues } from '@/utils/ControllerUtils';

class PatientFormController extends AbstractActionForm {

    validate(entity, validatingOnAction) {
        super.validate(entity, validatingOnAction);

        entity.identityDocumentTypeId = transformNullValues(validatingOnAction, this.ctx.identityDocumentsTypeSelected?.id, "Combo");
        entity.bloodGroupId = transformNullValues(validatingOnAction, this.ctx.bloodGroupSelected?.id, "Combo");
        entity.countryBirthId = transformNullValues(validatingOnAction, this.ctx.countrySelected?.id, "Combo");
        entity.provinceId = transformNullValues(validatingOnAction, this.ctx.provinceSelected?.id, "Combo");
        entity.municipalityId = transformNullValues(validatingOnAction, this.ctx.municipalitySelected?.id, "Combo");
        entity.postalCodeId = transformNullValues(validatingOnAction, this.ctx.postalCodeSelected?.id, "Combo");

        this.ctx.currentBirthDate ? entity.birthDate = this.ctx.currentBirthDate.toLocaleDateString() : entity.birthDate = transformNullValues(validatingOnAction, this.ctx.currentBirthDate, "Date");

        console.log("Fecha de naciemitno:'" + entity.birthDate + "'");
    }

    handleExceptions(entity, e) {
        super.handleExceptions(entity, e);

        if(e.response.data.code == "8000" && e.response.data.messageKey == "exception.patient.already.exists") {
            console.log("Paciente que ya existe");
        }

        this.setSubmittingFlag(false);
    }

    setFieldError(errorField) {
        if(errorField[1].field == 'identityDocumentTypeId') {
            this.form.setFieldError('identityDocument', { key: 'patient.form.identity.document.type.required' });
        } else {
            super.setFieldError(errorField);
        }
    }

}

export default PatientFormController;