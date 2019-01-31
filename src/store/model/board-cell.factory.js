import newGuid from '../utils/guid';

class BaseCell {

    constructor(model, title) {
        this.component = undefined;
        this.model = model;
        this.class = undefined;
        this.title = title;
        this.values = undefined;
    }
}

class TextCell extends BaseCell {
    constructor(model, title) {
        super(model, title);
        this.class = 'text';
        this.title = 'text';
    }
}

class SelectCell extends BaseCell {

    constructor(model, title) {
        super(model, title);

        this.class = 'select';
        this.title = 'select';

        this.values = [
            { key: newGuid(), title: 'Yes', color: '1E8E3E' },
            { key: newGuid(), title: 'No', color: 'D73026' }];
    }
}

export class CellFactory {

    createCell(type, model, title) {
        switch (type) {
            case 'text':
                return new TextCell(model, title);
            case 'select':
                return new SelectCell(model, title);
            default:
                return null;
        }
    }
}

