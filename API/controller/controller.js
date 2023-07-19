const express = require('express');

const db = require('../../Serivce/dboperation');

let service = {};

service.getallUsers = async (req, res) => {
 
    try {
        let response = await db.allUsers();
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.getUsersbyId = async (req, res) => {

    let order = req.params.id;

    try {
        let response = await db.userById(order);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.createUsers = async (req, res) => {
    let data=req.body;
 

    try {
        let response = await db.createNewUser(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.updateUsers = async (req, res) => {
    let data=req.body;
    let ticket = req.params.id;

    try {
        let response = await db.updateUser(data, ticket);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.deleteUsers = async (req, res) => {
    let ticket = req.params.id;
 

    try {
        let response = await db.deleteUser(ticket);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
module.exports = service;