"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRecaptchaVerifier = void 0;
class GoogleRecaptchaVerifier {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    async verify(token) {
        // const response = await axios.post(
        //   `https://www.google.com/recaptcha/api/siteverify`,
        //   null,
        //   {
        //     params: {
        //       secret: this.secretKey,
        //       response: token,
        //     },
        //   }
        // );
        // return response.data.success;
        return true;
    }
}
exports.GoogleRecaptchaVerifier = GoogleRecaptchaVerifier;
