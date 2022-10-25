"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = exports.editFileName = void 0;
const path_1 = require("path");
const editFileName = (req, file, callback) => {
    console.log('start edit name');
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    console.log('end edit name');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const imageFileFilter = (req, file, callback) => {
    console.log('edit');
    if (!file.originalname.match(/\.(JPG|jpeg|png|gif|txt)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=edit.js.map