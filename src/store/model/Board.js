import moment from 'moment';

export class Board {
    constructor(type, title, description, userInfo) {
        this.createdBy = userInfo.uid;
        this.createdDate = moment().toDate();
        this.description = description;
        this.title = title;
        this.isFolder = false;
        this.entities = [];
        this.columns = [{ title: 'Description', model: 'description', class: 'text' }];
        this.type = type;
    }

    
}
