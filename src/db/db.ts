import loki from 'lokijs';

const DB = new loki('nauti.db');
DB.addCollection('directories', { indices: 'path' });

export default DB;
