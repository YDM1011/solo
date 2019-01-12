export class Status {
  status:any;
  constructor () {
    this.status = [
      {
        label: 'Не вказувати',
        name: 'none'
      },
      {
        label: 'Вільний',
        name: 'single'
      },
      {
        label: 'Зустрічаюсь',
        name: 'inRelation',
        with: {
          firstName:'',
          lastName:'',
          pic:'',
          id:''
        }
      },
      {
        label: 'Одружений',
        name: 'mered',
        with: {
          firstName:'',
          lastName:'',
          pic:'',
          id:''
        }
      },
      {
        label: 'Розлучений',
        name: 'unMered'
      }
    ];

  }
  public getStatuse(){
    return this.status
  }
  public getChecked(key){
    let obg = {
      none: {
        label: 'Не вказувати',
        name: null
      },
      single: {
        label: 'Вільний(а)',
        name: 'single'
      },
      inRelation: {
        label: 'Зустрічаюсь з',
        name: 'inRelation',
        personName:'',
        placeholder:'З ким одружений(а)?',
        personId: null,
        person: true
      },
      mered: {
        label: 'Одружений(а) з',
        name: 'mered',
        personName:'',
        placeholder:'З ким одружений(а)?',
        personId: null,
        person: true
      },
      unMered: {
        label: 'Розлучений(а)',
        name: 'unMered'
      }
    };
    return obg[key]
  }
}
