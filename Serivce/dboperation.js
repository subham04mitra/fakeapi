const jwt = require("jsonwebtoken");
const sch = require('../Table/schema')
const mongoose = require('mongoose');
const axios = require('axios');
const { log } = require("console");
const spawn = require('child_process').spawn;
function connect() {
  
    const url = "mongodb+srv://technoidkolkata:technoid123@cluster0.iivynkd.mongodb.net/";
    const connection = mongoose.createConnection(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
     
    return connection;
}
let operation = {};



operation.allUsers = async () => {
    return new Promise(async (resolve, reject) => 
    {
        
    
        let conn = connect();
        let coll = conn.useDb('fakeapi');
      
        let user_model = coll.model("users", sch.userSchema());
     
        let user_data = await user_model.find({});
        conn.close();
        if (user_data.length != 0) {
            resolve({
                Success: true, Data: user_data
            })
        }
        else {
            reject({ Success: false, Message: "DB operation failed" })
        }
    })
}
operation.userById = async (id) => {
 
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('fakeapi');
        let user_model = coll.model("users", sch.userSchema());
        let user_data = await user_model.find({ _id: id }, { _id: 0 });
        conn.close();
        if (user_data.length != 0) {
            resolve({ Success: true, Data: user_data })
        }
        else {
            reject({ Success: false, Message: "No Record Found" })
        }
    })
}
operation.createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('fakeapi');
        let user_model = coll.model("users", sch.userSchema());
        let is_create = {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            address: data.address,
            gender: data.gender,
            dob: data.dob,
        }
        let newuser = await user_model.insertMany(is_create);

        conn.close();
        if (newuser.length != 0) {
            resolve({ Success: true, Message: "User Created", UserId: newuser[0]._id})
        }
        else {
            reject({ Success: false, Message: "Something Went Wrong,Try Again" })
        }
    })
}
operation.updateUser = async (data, id) => {
    return new Promise(async (resolve, reject) => {
        
        console.log(data);
        let conn = connect();
        let coll = conn.useDb('fakeapi');
        let user_model = coll.model("users", sch.userSchema());

        let update_response = await user_model.updateOne({ _id: id }, { $set: data });

        conn.close();
        if (update_response.modifiedCount != 0) {
            resolve({ Success: true, Message: "User Updated" })
        }
        else {
            reject({ Success: false, Message: "NO Record Found" })
        }
    })
}
operation.deleteUser = async (ticket) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('fakeapi');
        let user_model = coll.model("users", sch.userSchema());

        let update_response = await user_model.deleteOne({ _id: ticket });

        conn.close();
        if (update_response.deletedCount != 0) {
            resolve({ Success: true, Message: "User Deleted" })
        }
        else {
            reject({ Success: false, Message: "NO Record Found" })
        }
    })
}



module.exports = operation;

