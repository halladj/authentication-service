import * as crypto from "crypto"
export const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519')


//const signingKey= privateKey.export({ 
                    //type: 'pkcs8', 
                    //format: 'der' 
                  //}).toString('hex')

//const verifyKey= publicKey.export({ 
                    //type: 'spki', 
                    //format: 'der' 
                  //}).toString('hex')
 
//console.log({ signingKey, verifyKey })


export const GenerateLicenseKey = (data: string):string => {
  let signature = crypto.sign(null, Buffer.from(data), privateKey);
  //
  // Encode the signature and the dataset using our signing key
  let encodedSignature = signature.toString('base64');
  let encodedData = Buffer.from(data).toString('base64');
 
  // Combine the encoded data and signature to create a license key
  const licenseKey = `${encodedData}.${encodedSignature}`;
  return licenseKey;
}

//let data = 'user@customer.example'
 
//console.log({ licenseKey })
//-------------------------------------------------------------------------------------------

export const VerifyLisenceKey = (licenseKey: string):{valid:boolean, data:string } => {
  const val = licenseKey.split('.')
  let encodedData = val[0]
  let encodedSignature = val[1]

  // Decode the embedded data and its signature
  let signature = Buffer.from(encodedSignature, 'base64')
  let data = Buffer.from(encodedData, 'base64').toString()

  // Verify the data and its signature using our verify key
  const valid = crypto.verify(null, Buffer.from(data), publicKey, signature)
  return { valid, data};
}


// Split the license key by delimiter
//
//
//[encodedData, encodedSignature] = licenseKey.split('.')

// => { valid: true, data: 'user@customer.example' }







