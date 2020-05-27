import newGuid from '../utils/guid';

class BaseCell {

    constructor(model, title) {
        this.component = undefined;
        this.model = model;
        this.class = undefined;
        this.title = title;
        this.values = undefined;
        this.properties = undefined;
    }
}

class TextCell extends BaseCell {
    constructor(model, title) {
        super(model, title);
        this.class = 'text';
        this.title = 'text';
    }
}

class NumberCell extends BaseCell {
    constructor(model, title) {
        super(model, title);
        this.class = 'number';
        this.title = 'number';

        this.properties = {
            alignment: 'L',
            unit: 'None',
            formula: 'Sum'
        }
    }
}

class PeopleCell extends BaseCell {
    constructor(model, title) {
        super(model, title);
        this.class = 'people';
        this.title = 'people';
    }
}

class TimerCell extends BaseCell {
    constructor(model, title) {
        super(model, title);
        this.class = 'timer';
        this.title = 'timer';
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
    }
}

class DateDueCell extends BaseCell {

    constructor(model, title) {
        super(model, title);

        this.class = 'datedue';
        this.title = 'date due';
    }
}

export class CellFactory {

    createCell(type, model, title) {
        switch (type) {
            case 'text':
                return new TextCell(model, title);
            case 'number':
                return new NumberCell(model, title);
            case 'select':
                return new SelectCell(model, title);
            case 'date':
                return new DateCell(model, title);
            case 'datedue':
                return new DateDueCell(model, title);
            case 'people':
                return new PeopleCell(model, title);
            case 'timer':
                return new TimerCell(model, title);
            default:
                return null;
        }
    }
}

