var express = require('express');
var router = express.Router();
var config = require('../config');
var dbHelper = require('../db/dbHelper');

/* GET home page. */
router.get('/index', function(req, res, next) {
    var id = req.session.user._id;
    dbHelper.searchAllUsers(req, function (success, data) {
        dbHelper.getFriends(id, function (success, doc) {
            res.render('new', {
                entries: data.results,
                userCount: data.count,
                user: req.session.user,
                friendList: doc
            });
        });
    });
});
// router.get('/index', function(req, res, next) {
//     var id = req.session.user._id;
//     dbHelper.searchAllUsers(req, function (success, data) {
//         dbHelper.matchUser(id, function (success, doc) {
//             // console.log(doc.friends);
//             res.render('index', {
//                 entries: data.results,
//                 userCount: data.count,
//                 user: doc
//             });
//         });
//     });
// });
//
// router.get('/chatRoom/:id', function(req, res, next) {
//     var userId = req.session.user._id;
//     var friendId = req.params.id;
//     dbHelper.findFriend(userId, friendId, function (success, data) {
//         // console.log(data.results);
//         res.render('chatRoom', {
//             title: 'Express' ,
//             user: req.session.user,
//             // friend: data
//             friend: data.friend,
//             message: data.results
//         });
//     });
// });
// //获取历史聊天记录
// router.get('/historyMessages/:id', function (req, res, next) {
//     var from = req.params.id;
//     var to = req.session.user._id;
//     dbHelper.findHistoryMsg(from, to, function (success, data) {
//         res.render('historyChat', {
//             user: req.session.user,
//             historyMsg: data.results,
//             name: data.name
//         });
//     })
// });
//
router.post('/addFriend', function(req, res, next) {
    //添加好友
    console.log("添加好友");
    dbHelper.addFriend(req.body, function (success, doc) {
        res.send(doc);
    });
});
//
router.post('/addMessage', function(req, res, next) {
    dbHelper.addMessage(req.body, function (success, doc) {
        res.send(doc);
    });
});

router.post('/getUnreadMsg', function(req, res, next) {
    dbHelper.getUnreadMsg(req.body, function (success, doc) {
        res.send(doc);
    });
});
router.post('/updateMsgStatus', function (req, res, next) {
    dbHelper.updateMsgStatus(req.body, function (success, doc) {
        res.send(doc);
    });
});

module.exports = router;
