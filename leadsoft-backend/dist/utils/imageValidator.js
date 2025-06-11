"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImage = validateImage;
function validateImage(image) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    return imageExtensions.some((ext) => image.toLowerCase().endsWith(ext));
}
;
