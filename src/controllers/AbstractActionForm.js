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
        
        try {
            this.setSubmittingFlag(true);

            this.currentVersion = this.getCurrentVersion(entity);

            this.validateEntity(entity);

            this.persistEntity(entity);

            this.doValidation = true;
        } catch(e) {
            console.log('Exception on global:' + e);

            this.setSubmittingFlag(false);
        }
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

        this.setEntityFieldsToDelete(entity);
    }

    setEntityFieldsToDelete(entity) {
        let formValues = this.form.values;
        
        for (let key in formValues) {
            console.log("typeof " + key + ":" + typeof formValues[key]);

            if(typeof formValues[key] === "string") {
                if(formValues[key].trim() == '' || formValues[key] == null){
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
            this.mergeEntities(entity, response.data);

            this.setValuesToForm(entity);

            this.onSuccessSave();
        })
        .catch(e => {
            console.log('Exception on save:' + e);

            this.ctx.$toast.add({severity:'error', summary: 'Problemas al salvar', detail:e.response.data.messageKey, life: 3000});

            this.handleExceptions(entity, e);

            this.revertEntityPreviousState(entity, this.currentVersion);
        });
    }

    updateObjectMethod(entity) {
        console.log('Executing method updateObjectMethod:' + entity.id);

        restApi.patch(`${this.patchUrl}/${entity.id}`, entity)
        .then(response => {
            this.mergeEntities(entity, response.data);

            this.setValuesToForm(entity);

            this.onSuccessUpdate();
        })
        .catch(e => {
            console.log('Exception on update:' + e);

            this.ctx.$toast.add({severity:'error', summary: 'Problemas al actualizar', detail:e.response.data.messageKey, life: 3000});

            this.handleExceptions(entity, e);

            this.revertEntityPreviousState(entity, this.currentVersion);
        });
    }

    mergeEntities(entityInForm, entityInResponse) {
        // Object.assign(entityInForm, entityInResponse);

        for (let key in entityInForm) {
            if (key in entityInResponse) { // or obj1.hasOwnProperty(key)
                entityInForm[key] = entityInResponse[key];
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    handleExceptions(entity, e) {
        console.log('Handling exceptions');

        if(e.response.data.code == "5000"){
            console.log('\tHandling exceptions from error code 5000');

            Object.entries(e.response.data.fieldErrors).forEach(item => { 
                this.setFieldError(item);
            });
        }

        this.setSubmittingFlag(false);
    }

    setFieldError(item) {
        this.form.setFieldError(item[1].field, { key: item[1].message });
    }

    onSuccessSave() {
        console.log('Executing method onSuccessSave()');

        this.ctx.$toast.add({severity:'success', summary: this.ctx.t('global.record.saved.successfully.summary'), detail: this.ctx.t('global.record.saved.successfully'), life: 3000});
        
        this.setSubmittingFlag(false);
    }

    onSuccessUpdate() {
        console.log('Executing method onSuccessUpdate()');

        this.ctx.$toast.add({severity:'success', summary: this.ctx.t('global.record.updated.successfully.summary'), detail: this.ctx.t('global.record.updated.successfully'), life: 3000});
        
        this.setSubmittingFlag(false);
    }

    setValuesToForm(entity) {
        console.log('Setting values from entity into form');

        for (let key in entity) {
            if(entity[key] === '@@DELETE') { // Put as a const
                entity[key] = null;
            }

            this.form.setFieldDirty(key, false);
            this.form.setFieldTouched(key, false);
            this.form.setFieldValue(key, entity[key]);
        }
    }

    revertEntityPreviousState(entity, currentVersion) {
        console.log('Reverting state to previous state');

        if(this.checkIfPersisted(entity)) {
            if('version' in entity) {
                entity.version = currentVersion;

                console.log('\tReverting to version:' + entity.version);
            }
        } else {
            console.log('\tCleaning entity into a fresh one');

            if('id' in entity) {
                entity.id = null;
            }

            if('version' in entity) {
                entity.version = 0;
            }
        }
    }

    setSubmittingFlag(value) {
        if(this.ctx && ('isSubmitting' in this.ctx)) {
            console.log("Setting flag isSubmitting")

            this.ctx.isSubmitting = value;
        } else {
            console.log("The flag isSubmitting is not present");
        }
    }
}

export default AbstractActionForm;