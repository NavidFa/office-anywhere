"use strict";

var knex = require('./knex.js')

function Users() {
    return knex("users")
}

function AddUser(username, password) {
    return knex("users").insert({
        username: username.toLowerCase(),
        password: password
    })
}

function Comments() {
    return knex("users").join("comments", "users.id", "comments.user_id ").orderBy("comments.id", "desc")
}


function comment(id) {
    return knex('comments').where('id', id)
}

function addComments(title, body, user_id, loc_id) {
    return knex("comments").insert({
        title: title,
        body: body,
        user_id: user_id,
        loc_id: loc_id
    })
}

function updateComments(id, title, body) {
    return knex("comments").where('id', id).update({
        title: title,
        body: body,
    })
}

function deleteComments(id) {
    return knex('comments').where({
        id: id,
    }).del()
}

function timestamp(date) {
    var time = String(date);
    var timearr = time.split(" ")
    var stamp = timearr[0] + " " + timearr[1] + " " + timearr[2] + " " + timearr[3] + " @ " + timearr[4];
    return stamp
}

module.exports = {
    Users: Users,
    AddUser: AddUser,
    Comments: Comments,
    addComments: addComments,
    updateComments: updateComments,
    deleteComments: deleteComments,
    comment: comment,
    timestamp: timestamp
};
