import { restApi } from '@/configuration/rest.config';

class AbstractActionForm {
    static VALIDATING_ON_INSERT = 1;
    static VALIDATING_ON_UPDATE = 2;
    static VALIDATING_ON_DELETE = 3;

    static BUNDLED_KEY_ELEMENT_UPDATED = 'element.updated';
    static BUNDLED_KEY_ELEMENT_ADDED = 'element.added';

    constructor(postUrl, patchUrl, doValidation = true) {
        this.postUrl = postUrl;
        this.patchUrl = patchUrl;
        this.doValidation = doValidation;
    }

    save(entity, vueContext, form) {
        console.log('Executing save');

        this.ctx = vueContext;
        this.form = form;

        this.currentVersion = this.getCurrentVersion(entity);

        this.validateEntity(entity);

        this.persistEntity(entity);

        this.doValidation = true;
    }

    getCurrentVersion(entity) {
        let retValue = 'version' in entity ? entity.version : null;

        console.log('Getting the current version:' + retValue);

        return retValue;
    }

    validateEntity(entity) {
        if(this.doValidation) {
            if(this.checkIfPersisted(entity)){
                this.validate(entity, AbstractActionForm.VALIDATING_ON_UPDATE);
            } else {
                this.validate(entity, AbstractActionForm.VALIDATING_ON_INSERT);
            }
        }
    }

    checkIfPersisted(entity) {
        let retValue = this.getKeyForEntity(entity) != null;

        console.log('Value of checkIfPersisted:' + retValue);

        return retValue;
    }

    getKeyForEntity(entity) {
        let retValue = 'id' in entity ? entity.id : null;

        console.log('Value of getKeyForEntity:' + retValue);

        return retValue;
    }

    validate(entity, validatingOnAction) {
        if (validatingOnAction == AbstractActionForm.VALIDATING_ON_INSERT) {
			console.log('Executing validate() on insert');
		} else if (validatingOnAction == AbstractActionForm.VALIDATING_ON_UPDATE) {
			console.log('Executing validate() on update');
		} else if (validatingOnAction == AbstractActionForm.VALIDATING_ON_DELETE) {
			console.log('Executing validate() on delete');

			return;
        }

        let formValues = this.form.values;
        
        for (let key in formValues) {
            console.log("typeof " + key + ":" + typeof formValues[key]);

            if(typeof formValues[key] === "string") {
                if(formValues[key] == '' || formValues[key] == null){
                    console.log("\tSetting " + key + " to null");

                    this.form.setFieldValue(key, null);

                    if(key in entity) { 
                        entity[key] = '@@DELETE';
                    }
                }
            }
        }
    }

    persistEntity(entity) {
        console.log('Trying to persist entity:' + entity.id);

        if(this.checkIfPersisted(entity)) {
            this.updateObjectMethod(entity);
        } else {
            this.saveObjectMethod(entity);
        }
    }

    saveObjectMethod(entity) {
        console.log('Executing method saveObjectMethod:' + entity);

        restApi.post(this.postUrl, entity)
        .then(response => {
            Object.assign(entity, response.data);

            this.setValuesToForm(entity);

            this.onSuccessSave();
        })
        .catch(e => {
            this.ctx.$toast.add({severity:'error', summary: 'Problemas al salvar', detail:e.response.data.messageKey, life: 3000});

            this.handleExceptions(entity, e);

            this.revertEntityPreviousState(entity, this.currentVersion);
        });
    }

    updateObjectMethod(entity) {
        console.log('Executing method updateObjectMethod:' + entity.id);

        restApi.patch(`${this.patchUrl}/${entity.id}`, entity)
        .then(response => {
            Object.assign(entity, response.data);

            this.setValuesToForm(entity);

            this.onSuccessUpdate();
        })
        .catch(e => {
            this.ctx.$toast.add({severity:'error', summary: 'Problemas al actualizar', detail:e.response.data.messageKey, life: 3000});

            this.handleExceptions(entity, e);

            this.revertEntityPreviousState(entity, this.currentVersion);
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleExceptions(entity, e) {
        console.log('Handling exceptions');

        if(e.response.data.code == "5000"){
            Object.entries(e.response.data.fieldErrors).forEach(item => { 
                this.form.setFieldError(item[1].field, item[1].message);
            });
        }
    }

    onSuccessSave() {
        console.log('Executing method onSuccessSave()');

		this.ctx.$toast.add({severity:'success', summary: 'Salvado', detail:'Registro salvado correctamente', life: 3000});
    }

    onSuccessUpdate() {
        console.log('Executing method onSuccessUpdate()');

		this.ctx.$toast.add({severity:'success', summary: 'Salvado', detail:'Registro actualizado correctamente', life: 3000});
    }

    setValuesToForm(entity) {
        for (let key in entity) {
            this.form.setFieldValue(key, entity[key]);
        }
    }

    revertEntityPreviousState(entity, currentVersion) {
        if(this.checkIfPersisted(entity)) {
            if('version' in entity) {
                entity.version = currentVersion;
            }
        } else {
            if('id' in entity) {
                entity.id = null;
            }

            if('version' in entity) {
                entity.version = 0;
            }
        }
    }
}

export default AbstractActionForm;