import mongoose from 'mongoose';
import log from '../utils/log.js';

await mongoose.connect('mongodb://localhost:27017/nauti');
log.info('DB connected');

// import  './models/DirModel.js';
// log.info('db...');
// log.info('...connected!');
//
// log.info('creating dir1');
// const dir1 = await DirModel.create({
//   path: '/asd/qwe/zxccc',
// });
//
// log.info('creating dir2');
// const dir2 = await DirModel.create({
//   path: '/asd/qwe/zxccc',
// });
//
// log.info(dir1, dir2);
// log.info('...saved!');
//
// log.info('Query');
// log.info(await DirModel.find({}));
