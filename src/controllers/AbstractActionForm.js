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

    save(entity) {
        console.log('Executing save');

        // eslint-disable-next-line no-unused-vars
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
                this.validate(entity, this.VALIDATING_ON_INSERT);
            } else {
                this.validate(entity, this.VALIDATING_ON_UPDATE);
            }
        }
    }

    checkIfPersisted(entity) {
        return this.getKeyForEntity(entity) != null;
    }

    getKeyForEntity(entity) {
        return 'id' in entity ? entity.id : null;
    }

    validate(entity, validatingOnAction) {
        if (validatingOnAction == this.VALIDATING_ON_INSERT) {
			console.log('Executing validate() on insert');
		} else if (validatingOnAction == this.VALIDATING_ON_UPDATE) {
			console.log('Executing validate() on update');
		} else if (validatingOnAction == this.VALIDATING_ON_DELETE) {
			console.log('Executing validate() on delete');

			return;
		}
    }

    persistEntity(entity) {
        console.log('Trying to persist entity:' + entity);

        if(this.checkIfPersisted(entity)) {
            this.updateObjectMethod(entity);
            // this.onSuccessUpdate();
        } else {
            this.saveObjectMethod(entity);
            // this.onSuccessSave();
        }
    }

    updateObjectMethod(entity) {
        console.log('Executing method updateObjectMethod:' + entity.id);

        restApi.patch(`${this.patchUrl}/${entity.id}`, entity)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.onSuccessUpdate();
        })
        .catch(e => {
          this.$toast.add({severity:'error', summary: 'Problemas al actualizar', detail:e.response.data.messageKey, life: 3000});

          this.handleExceptions(e, entity);

          this.revertEntityPreviousState(entity, this.currentVersion);
        });
    }

    saveObjectMethod(entity) {
        console.log('Executing method saveObjectMethod:' + entity);

        restApi.post(this.postUrl, entity)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.onSuccessSave();
        })
        .catch(e => {
          this.$toast.add({severity:'error', summary: 'Problemas al salvar', detail:e.response.data.messageKey, life: 3000});

          this.handleExceptions(e, entity);

          this.revertEntityPreviousState(entity, this.currentVersion);
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleExceptions(e, entity) {
        console.log('Handling exceptions');
    }

    onSuccessSave() {
        console.log('Executing method onSuccessSave()');

		this.$toast.add({severity:'success', summary: 'Salvado', detail:'Registro salvado correctamente', life: 3000});
    }

    onSuccessUpdate() {
		console.log('Executing method onSuccessUpdate()');

		this.$toast.add({severity:'success', summary: 'Salvado', detail:'Registro actualizado correctamente', life: 3000});
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