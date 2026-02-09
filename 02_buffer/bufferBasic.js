const { Buffer } = require('buffer');

// const buf = Buffer.alloc(4);
// console.log('buffer: ', buf);
// console.log('buffer: ', buf[1]);

// const buf = Buffer.from('Hello Chai');
// console.log('Buf: ', buf);
// console.log('Buf to string: ', buf.toString());

// const bufTwo = Buffer.allocUnsafe(10);
// console.log(bufTwo);

// const buf = Buffer.alloc(10);
// buf.write('Hello');
// console.log(buf.toString());

// const buf = Buffer.from('Tajinder singh is learning node js');
// console.log(buf.toString());
// console.log(buf.toString('utf-8', 0, 4));

// const buf = Buffer.from('Tajinder');
// buf[0] = 0x4a;
// console.log(buf.toString());

const buf1 = Buffer.from('Tajinder');
const buf2 = Buffer.from(' singh');
const mergedValues = Buffer.concat([buf1, buf2]);
console.log(mergedValues.toString());
console.log(mergedValues.length);
