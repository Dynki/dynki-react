import newGuid from '../utils/guid';
import moment from 'moment';

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
            { key: newGuid(), title: 'Yes', color: '039BE5', fgColor: 'ffffff' },
            { key: newGuid(), title: 'No', color: 'EB144C', fgColor: 'ffffff' }];
    }
}

class DateCell extends BaseCell {

    constructor(model, title) {
        super(model, title);

        this.class = 'date';
        this.title = 'date';

        this.values = moment();
    }
}

export class CellFactory {

    createCell(type, model, title) {
        switch (type) {
            case 'text':
                return new TextCell(model, title);
            case 'select':
                return new SelectCell(model, title);
            case 'date':
                return new DateCell(model, title);
            default:
                return null;
        }
    }
}

