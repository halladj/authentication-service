"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyLisenceKey = exports.GenerateLicenseKey = exports.publicKey = exports.privateKey = void 0;
const crypto = __importStar(require("crypto"));
_a = crypto.generateKeyPairSync('ed25519'), exports.privateKey = _a.privateKey, exports.publicKey = _a.publicKey;
//TODO: store this somewhere.
//const signingKey= privateKey.export({ 
//type: 'pkcs8', 
//format: 'der' 
//}).toString('hex')
//const verifyKey= publicKey.export({ 
//type: 'spki', 
//format: 'der' 
//}).toString('hex')
//console.log({ signingKey, verifyKey })
const GenerateLicenseKey = (data) => {
    let signature = crypto.sign(null, Buffer.from(data), exports.privateKey);
    //
    // Encode the signature and the dataset using our signing key
    let encodedSignature = signature.toString('base64');
    let encodedData = Buffer.from(data).toString('base64');
    // Combine the encoded data and signature to create a license key
    const licenseKey = `${encodedData}.${encodedSignature}`;
    return licenseKey;
};
exports.GenerateLicenseKey = GenerateLicenseKey;
//let data = 'user@customer.example'
const licenseKey = (0, exports.GenerateLicenseKey)("191934032196");
console.log({ licenseKey });
//-------------------------------------------------------------------------------------------
const VerifyLisenceKey = (licenseKey) => {
    const val = licenseKey.split('.');
    let encodedData = val[0];
    let encodedSignature = val[1];
    console.log(val);
    // Decode the embedded data and its signature
    let signature = Buffer.from(encodedSignature, 'base64');
    let data = Buffer.from(encodedData, 'base64').toString();
    // Verify the data and its signature using our verify key
    const valid = crypto.verify(null, Buffer.from(data), exports.publicKey, signature);
    console.log({ valid, data });
};
exports.VerifyLisenceKey = VerifyLisenceKey;
(0, exports.VerifyLisenceKey)(licenseKey);
// Split the license key by delimiter
//
//
//[encodedData, encodedSignature] = licenseKey.split('.')
// => { valid: true, data: 'user@customer.example' }
