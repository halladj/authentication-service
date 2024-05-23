import {Request, Response} from "express";
import { User } from "../models/User";
import {GenerateLicenseKey} from "../encryption";


export const signinController = async (req: Request, res: Response) => {
  const agentIdentifier:string | undefined = req.body.id    || undefined;
  const lisence        :string | undefined = req.body.lisence|| undefined;

  if ( agentIdentifier === undefined || lisence === undefined){
    res.status(402);
    res.json({message: "Error: no identifier provided."});
    return;
  }

  const user= await User.findOne({student_id: agentIdentifier});
  if ( user === null ){
    res.status(402);
    res.json({message: "Error: Wrong Identifier provided."});
    return;

  }
  const lisenceKey = user.licenseKey;
  if(lisenceKey !== lisence){
    res.statusCode = 421;
    res.json({ message: "Error: Wrong Lisence Key provided." });
    return;
  }

  res.statusCode = 200;
  res.json({ message: "Success: Verified Successfully" });

  console.log(lisenceKey);

}

export const monitoringController = (req:Request, res:Response) =>{}

export const createUserController = async (req:Request, res:Response) => {
  const firstname :string | undefined = req.body.firstname || undefined;
  const lastname  :string | undefined = req.body.lastname  || undefined;
  const student_id:string | undefined = req.body.studentid || undefined;

  if ( 
      firstname  === undefined || 
      lastname   === undefined || 
      student_id === undefined
     ){
    res.status(402);
    res.json({message: "Error: no identifier provided."});
    return;
  }

  const lisenceKey = GenerateLicenseKey(student_id);

  const user = new User({
    firstname :firstname, 
    lastname  : lastname, 
    student_id: student_id,
    licenseKey: lisenceKey
  });

  console.log(user);
  try{
    await user.save();

  } catch(err:any){
    //TODO: double check this status code;
    res.statusCode = 422;
    if ( err.code === 11000){

      res.json({message: "Duplicated User"});
      return;
    }
    res.json({message: err})
    return;
    //res.json({message: "Failed to create."})
  }
  res.statusCode= 201;
  res.json({message: user});
  return;

};










