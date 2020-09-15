var express = require("express");
var path = require("path");
var router = express.Router();
var User = require("../models/user");
var Pfpy = require("../models/pfpy");
var Nzjl = require("../models/nzjl");
var Scjh = require("../models/scjh");
var Sccl = require("../models/sccl");
var md5 = require("blueimp-md5");
/**
 *TODO 必须修改root为静态页面目录
 */

/* GET home page. */
router.get("/", function(req, res) {
    res.render("login.html");
});
router.get("/admin", function(req, res) {
    var path1 = ''
    if (req.session.user == null) {
        path1 = 'login.html'
    } else {

        path1 = 'admin.html'
    }
    res.render(path1);
});
router.get("/manager/:x", function(req, res) {
    var path1 = ''
    var x = req.params.x;
    var add = false
    if (req.session.user == null) {
        path1 = 'login.html'
    } else {
        if (x == 'sccl') {
            if (req.session.user.name == 'admin' || req.session.user.name == 'tech' || req.session.user.name == 'tech2') {

                path1 = "sccl.html"
                add = req.session.user.name == 'admin' ? true : false
            } else {
                path1 = "admin.html"
            }
        } else if (x == 'pfpy') {
            if (req.session.user.name == 'admin' || req.session.user.name == 'tech' || req.session.user.name == 'tech2') {
                add = req.session.user.name == 'admin' ? false : true
                path1 = "pfpy.html"
            } else {
                path1 = "admin.html"
            }
        } else if (x == 'nzjl') {
            if (req.session.user.name == 'admin' || req.session.user.name == 'tech' || req.session.user.name == 'tech2') {
                add = req.session.user.name == 'admin' ? false : true
                path1 = "nzjl.html"
            } else {
                path1 = "admin.html"
            }
        } else if (x == 'scjh') {

            add = (req.session.user.name == 'tech' || req.session.user.name == 'tech2') ? true : false
            path1 = "scjh.html"

        } else {
            path1 = x + '.html'
        }
    }
    res.render(path1, { add: add });

});
router.post("/login", function(req, res) {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据

    var body = req.body;

    User.findOne({
            name: body.name,
            password: md5(md5(body.password))
        },
        function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                });
            }

            //如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
            if (!user) {
                return res.status(200).json({
                    err_code: 1,
                    message: "// or password is invalid."
                });
            }

            // 用户存在，登陆成功，通过 Session 记录登陆状态
            req.session.user = user;

            res.status(200).json({
                err_code: 0,
                message: "OK"
            });
        }
    );
});

router.get("/logout", function(req, res) {
    // 清除登陆状态
    req.session.user = null;

    // 重定向到登录页
    res.redirect("/");
});
//index.html

// 处理/login的post请求

// let sccl = [
//     ["1", "2018-12-31", "番茄", "12", "0.05", "无"],
//     ["2", "2018-12-31", "青椒", "15", "0.04", "无"],
//     ["3", "2018-12-31", "包菜", "31", "0.03", "无"]
// ];

router.get("/sccl", function(req, res) {


    Sccl.find(
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            var da = []

            for (var i = 0; i < data.length; i++) {
                da[i] = []
                da[i].push(data[i].sid)
                da[i].push(data[i].time)
                da[i].push(data[i].name)
                da[i].push(data[i].number)
                da[i].push(data[i].price)
                da[i].push(data[i].note)
            }
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            //.log(da)
            res.write(JSON.stringify(da));
            res.end();



        }
    );
});

router.post("/sccl", function(request, response) {
    let rst = request.body;
    let time = new Date();
    let data =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        (time.getDay() - 1);
    Sccl.find(
        function(err, dat) {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            // console.log(data)
            let rid = String(dat.length + 1);
            let record = [rid, data, rst.name, rst.number, rst.price, rst.note];
            var re = {
                sid: record[0],
                time: record[1],
                name: record[2],
                number: record[3],
                price: record[4],
                note: record[5],
            }

            new Sccl(re).save(function(err) {
                if (err) {
                    return response.status(500).json({
                        err_code: 500,
                        message: "Internal error."
                    });
                }

                response.writeHead(200, {
                    "Access-Control-Allow-Origin": "http://localhost:63342"
                });
                response.end();


            });
        }
    );


});

// let pfpy = [
//     ["1", "2019-1-1", "肥料1", "300", "5%", "鸡粪,马粪", "15,17"],
//     ["2", "2019-1-1", "肥料2", "150", "3%", "牛粪,饼肥", "24,13"],
//     ["3", "2019-1-1", "肥料3", "400", "6%", "稻壳,锯末", "12,13"]
// ];

router.get("/pfpy", function(req, res) {

    Pfpy.find(
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            var da = []

            for (var i = 0; i < data.length; i++) {
                da[i] = []
                da[i].push(data[i].sid)
                da[i].push(data[i].time)
                da[i].push(data[i].name)
                da[i].push(data[i].salary)
                da[i].push(data[i].ratio)
                da[i].push(data[i].material)
                da[i].push(data[i].dosage)
            }
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            //.log(da)
            res.write(JSON.stringify(da));
            res.end();



        }
    );
});

router.post("/pfpy", function(request, response) {
    let rst = request.body;
    let time = new Date();
    let data =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        (time.getDay() - 1);
    Pfpy.find(
        function(err, dat) {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            // console.log(dat)
            let rid = String(dat.length + 1);
            let record = [rid, data, rst.name, rst.salary, rst.ratio, rst.material, rst.dosage];
            var re = {
                    sid: record[0],
                    time: record[1],
                    name: record[2],
                    salary: record[3],
                    ratio: record[4],
                    material: record[5],
                    dosage: record[6],
                }
                //  console.log(record)
            new Pfpy(re).save(function(err) {
                if (err) {
                    return response.status(500).json({
                        err_code: 500,
                        message: "Internal error."
                    });
                }

                response.writeHead(200, {
                    "Access-Control-Allow-Origin": "http://localhost:63342"
                });
                response.end();


            });
        }
    );


});

// let scjh = [
//     [
//         "1",
//         "白菜",
//         "2019-1-1",
//         "2019-3-14",
//         "土地1",
//         "2019-5-8",
//         "2019-6-1",
//         "5000",
//         "2019-5-20",
//         "300"
//     ],
//     [
//         "2",
//         "萝卜",
//         "2019-1-1",
//         "2019-4-21",
//         "土地2",
//         "2019-6-4",
//         "2019-7-8",
//         "3500",
//         "2019-7-1",
//         "500"
//     ],
//     [
//         "3",
//         "青椒",
//         "2019-1-1",
//         "2019-5-12",
//         "土地3",
//         "2019-7-9",
//         "2019-9-9",
//         "6400",
//         "2019-8-18",
//         "800"
//     ]
// ];
router.get("/scjh", function(req, res) {

    Scjh.find(
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            var da = []

            for (var i = 0; i < data.length; i++) {
                da[i] = []
                da[i].push(data[i].sid)
                da[i].push(data[i].time)
                da[i].push(data[i].name)
                da[i].push(data[i].seed_date)
                da[i].push(data[i].seed_place)
                da[i].push(data[i].launch_date)
                da[i].push(data[i].delist_date)
                da[i].push(data[i].pre_gain)
                da[i].push(data[i].pre_hdate)
                da[i].push(data[i].pre_hgain)
            }
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            //.log(da)
            res.write(JSON.stringify(da));
            res.end();



        }
    );
});

router.post("/scjh", function(request, response) {
    let rst = request.body;
    let time = new Date();
    let data =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        (time.getDay() - 1);
    Scjh.find(
        function(err, dat) {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            // console.log(dat)
            let rid = String(dat.length + 1);
            let record = [
                rid,
                data,
                rst.name,
                rst.seed_date,
                rst.seed_place,
                rst.launch_date,
                rst.delist_date,
                rst.pre_gain,
                rst.pre_hdate,
                rst.pre_hgain
            ];
            var re = {
                    sid: record[0],
                    time: record[1],
                    name: record[2],
                    seed_date: record[3],
                    seed_place: record[4],
                    launch_date: record[5],
                    delist_date: record[6],
                    pre_gain: record[7],
                    pre_hdate: record[8],
                    pre_hgain: record[9],
                }
                //  console.log(record)
            new Scjh(re).save(function(err) {
                if (err) {
                    return response.status(500).json({
                        err_code: 500,
                        message: "Internal error."
                    });
                }

                response.writeHead(200, {
                    "Access-Control-Allow-Origin": "http://localhost:63342"
                });
                response.end();


            });
        }
    );


});


// let nzjl = [
//     ["1", "2019-1-1", "种田", "土地1", "300", "化肥", "5", "白菜种子", "3"],
//     ["2", "2019-1-1", "挑粪", "土地2", "150", "农家肥", "7", "番茄种子", "5"],
//     ["3", "2019-1-1", "播种", "土地3", "240", "干草", "4", "玉米种子", "8"]
// ];
router.get("/nzjl", function(req, res) {

    Nzjl.find(
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            var da = []

            for (var i = 0; i < data.length; i++) {
                da[i] = []
                da[i].push(data[i].sid)
                da[i].push(data[i].time)
                da[i].push(data[i].name)
                da[i].push(data[i].land_num)
                da[i].push(data[i].labor_cost)
                da[i].push(data[i].material)
                da[i].push(data[i].m_amount)
                da[i].push(data[i].seed)
                da[i].push(data[i].s_amount)

            }
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            //.log(da)
            res.write(JSON.stringify(da));
            res.end();



        }
    );
});

router.post("/nzjl", function(request, response) {
    let rst = request.body;
    let time = new Date();
    let data =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        (time.getDay() - 1);
    Nzjl.find(
        function(err, dat) {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: "服务端错误"
                });
            }
            // console.log(dat)
            let rid = String(dat.length + 1);
            let record = [
                rid,
                data,
                rst.name,
                rst.land_num,
                rst.labor_cost,
                rst.material,
                rst.m_amount,
                rst.seed,
                rst.s_amount
            ];
            var re = {
                    sid: record[0],
                    time: record[1],
                    name: record[2],
                    land_num: record[3],
                    labor_cost: record[4],
                    material: record[5],
                    m_amount: record[6],
                    seed: record[7],
                    s_amount: record[8],

                }
                //  console.log(record)
            new Nzjl(re).save(function(err) {
                if (err) {
                    return response.status(500).json({
                        err_code: 500,
                        message: "Internal error."
                    });
                }

                response.writeHead(200, {
                    "Access-Control-Allow-Origin": "http://localhost:63342"
                });
                response.end();


            });
        }
    );


});






let sjcs = [
    ["1", "2019-1-1", "土豆", "3", "0.8"],
    ["2", "2019-1-1", "茄子", "5", "0.9"],
    ["3", "2019-1-1", "玉米", "8", "1.2"]
];
router.get("/sjcs", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify(sjcs));
    response.end();
});

router.post("/sjcs", function(request, response) {
    let time = new Date();
    let rid = String(sjcs.length + 1);
    let data =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        (time.getDay() - 1);
    let rst = request.body;
    let record = [rid, data, rst.name, rst.amount, rst.price];
    //.log(record);
    sjcs.push(record);
    response.writeHead(200, {
        "Access-Control-Allow-Origin": "http://localhost:63342"
    });
    response.end();
});

let tixi = [
    ["辣椒", "上市", "2019-1-6"],
    ["白菜", "下市", "2019-1-7"],
    ["卷心菜", "上市", "2019-1-8"]
];

router.get("/tixi", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify(tixi));
    response.end();
});

router.post("/tixi", function(request, response) {
    let code = parseInt(request.body.id);
    let list = tixi.splice(Math.round(code / 10), 1)[0];
    let type = (code % 10) * tixi.length;
    tixi.splice(type, 0, list);

    //.log(tixi);
    response.writeHead(200, {
        "Access-Control-Allow-Origin": "http://localhost:63342"
    });
    response.end();
});

let scyj = [
    ["2019-1-1", "菠菜", "39"],
    ["2019-1-1", "黄瓜", "54"],
    ["2019-1-1", "萝卜", "67"]
];

router.get("/scyj", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify(scyj));
    response.end();
});

let jiyk = [
    ["菠菜", "2345", "390", "5600", "2018-10-21", "2018-11-30", "3300"],
    ["黄瓜", "5352", "540", "7800", "2018-9-14", "2018-10-31", "2450"],
    ["萝卜", "1363", "670", "4312", "2018-8-16", "2018-11-25", "3672"]
];

router.get("/jiyk", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify(jiyk));
    response.end();
});

let jyzx = [
    [
        "番茄", [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 54 },
            { x: 4, y: 53 },
            { x: 5, y: 0 }
        ]
    ],
    [
        "竹笋", [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 67 },
            { x: 4, y: 99 },
            { x: 5, y: 0 }
        ]
    ],
    [
        "空心菜", [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 25 },
            { x: 4, y: 56 },
            { x: 5, y: 0 }
        ]
    ]
];

router.get("/jyzx", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify(jyzx));
    response.end();
});

module.exports = router;