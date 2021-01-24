import AbstractActionForm from '@/controllers/AbstractActionForm';

export const transformNullValues = (operationType, value, valueType) => {
    if (operationType == AbstractActionForm.VALIDATING_ON_INSERT) {
        console.log('Executing transformNullValues() on insert');

        return value ?? null;
    } else if (operationType == AbstractActionForm.VALIDATING_ON_UPDATE) {
        console.log('Executing transformNullValues() on update');

        if("Date" == valueType) {
            return value ? value : '01/01/1900';
        } else if("Combo" == valueType) {
            return value ?? -1;
        }

        return value ?? '@@DELETE';
    } 
}
