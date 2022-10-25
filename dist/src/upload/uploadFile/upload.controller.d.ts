/// <reference types="multer" />
export declare class UploadController {
    constructor();
    uploadedFile(file: Express.Multer.File): Promise<void>;
}
