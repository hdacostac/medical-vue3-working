
const patientDTO = {
    id: null,
    code: null,
    name: null,
    lastName: null,
    identityDocument: null,
    sanitaryDocument: null,
    mobilePhone: null,
    homePhone: null,
    email: null,
    addressLine1: null,
    addressLine2: null,
    provinceId: 0,
    municipalityId: 0,
    postalCodeId: 0,
    birthDate: null,
    sexId: null,
    bloodGroupId: 0,
    version: null
}

export default Object.seal(patientDTO);