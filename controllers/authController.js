import userModel from "../models/userModel.js";


export const registerController = async (req ,res) =>{
    try {

        const {name,email,password,phone,address} = req.body

        //validation Properties
        if (!name) {
           return res.send({error:'Name is Required !!!',});
        }
        if (!email) {
           return res.send({error:'Email is Required !!!',});
        }
        if (!password) {
           return res.send({error:'Password is Required !!!',});
        }
        if (!phone) {
           return res.send({error:'Phone is Required !!!',});
        }
        if (!address) {
           return res.send({error:'Address is Required !!!',});
        }



    }catch (error) {
        console.log(error);
        res.status(500).send({
            success:'Error in Registration ...',
            error
        })
    }
}

