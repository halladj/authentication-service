import express from "express"; 
import { publicKey, privateKey, GenerateLicenseKey, VerifyLisenceKey } from "./../encryption"



export const Authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) =>{
  const signingKey= privateKey.export({ 
                    type: 'pkcs8', 
                    format: 'der' 
                  }).toString('hex')

  const verifyKey= publicKey.export({ 
                    type: 'spki', 
                    format: 'der' 
                  }).toString('hex')
 
  const license:string = req.body.license;

  const licenseKey = GenerateLicenseKey(license); 
  const {valid, data} = VerifyLisenceKey(licenseKey) 
  if (! valid){
    res.status(404);
    res.json({"message": "Bad License-key"});
  }

  req.body.licenseKey = licenseKey;
  next();
}
