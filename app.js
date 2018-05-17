var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//连接区块链的web3接口
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://47.106.92.62:8545'));

//连接数据库
var mysql = require('mysql');
var connection = mysql.createConnection({

    host:'120.79.227.88',
    user     : 'root',
    password : '123456',
    database : 'chain_lives'
});

connection.connect();

var index = require('./routes/index');
var users = require('./routes/users');
var keys = require('./routes/keys');
var hlb = require('./routes/hlb');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/:userid', function(req,res,next){
//	var ids = req.params.userid;
//  console.log(ids);
//  var sql = 'SELECT * from cl_vitality where v_userid='+ids;
//  connection.query(sql, function (error, results) {
//      if(error){
//          console.log('[SELECT ERROR] -',error.message);
//          return;
//      }
//      console.log('--------SEKECT--------------');
//      console.log(results);
//      
//      if(results.length!=0){
//      	res.render('hlb', { title: '活力贝口袋' });
//      }else {        	        	
//      	res.render('index', { title: '创建钱包' });
//      }
//      
//  });
//	
//	
//});


app.use('/', index);
app.use("/keys",keys);
app.use("/hlb",hlb);
app.use("/syxy",function(req,res,next){
	res.render('syxy');
});
app.use("/yszc",function(req,res,next){
	res.render('yszc');
});
app.use("/fwxy",function(req,res,next){
	res.render('fwxy');
});
app.use("/fwbz",function(req,res,next){
	res.render('fwbz');
});
app.use("/czxy",function(req,res,next){
	res.render('czxy');
});
app.use("/cjwt_zh",function(req,res,next){
	res.render('cjwt_zh');
});
app.use("/cjwt_yydd",function(req,res,next){
	res.render('cjwt_yydd');
});
app.use("/cjwt_xxfb",function(req,res,next){
	res.render('cjwt_xxfb');
});
app.use("/cjwt_xqgl",function(req,res,next){
	res.render('cjwt_xqgl');
});
app.use("/cjwt_shrz",function(req,res,next){
	res.render('cjwt_shrz');
});
app.use("/cjwt_pj",function(req,res,next){
	res.render('cjwt_pj');
});
app.use("/cjwt_jngl",function(req,res,next){
	res.render('cjwt_jngl');
});
// app.use("/aToB",function(req,res,next){
	
		
// 		res.render('aToB');
		
//  });
//	
//	[{
//			"userid":12,
//			"extractMoney":25,
//			"surplusMoney":36,
//			"extractTime":new Date().getTime(),
//			"examine":false
//		}]
//	


app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//创建用户
app.post("/create",function(req,res,next) {
    //密码
    var passwordes = req.body.passwordes;
   //获取用户Id
    var userid = parseInt(req.body.userid); 
    //时间戳
	var nowDate=new Date();
    //生成密匙
    var account_site = web3.personal.newAccount(passwordes);
	console.log(account_site);	
	var addSql = 'insert into cl_vitality(v_userid,v_password,v_account_site,v_create_time) VALUES(?,?,?,?)';
    var addParmas  = [userid,passwordes,account_site,nowDate];
    
    connection.query(addSql,addParmas,function(err,result){
        if(err){
           console.log('[INSERT ERROR] -',err.message);
         	return;
        }
        console.log('------------INSERT----------');
//    	console.log('insert id:'+result.insertId)
		if(result.insertId){
			res.json({"result":'创建成功',"resultCode":200,"site":account_site,"success":true});
		}else {
			res.json({"result":'创建失败',"resultCode":400,"error":true});
		}
		
    });
});

//app.get("/unlock/:userid",function(req,res,next){
//  var ids = req.params.userid;
//  var sql = 'SELECT * from cl_vitality where v_userid='+ids;
//  connection.query(sql, function (error, results) {
//      if(error){
//          console.log('[SELECT ERROR] -',error.message);
//          return;
//      }
//      console.log('--------SEKECT--------------');
//      console.log(results);
//      web3.personal.unlockAccount(keys,password,100000);
//      //res.render('exchange',{"id":id,"name":name,"password":password,"age":age,"sex":sex,"balance":balance,"keys":keys})
//  });
//  //var account = web3.eth.accounts[1];
// // var local = web3.eth.accounts[0];
////web3.personal.unlockAccount(local,'long3737257',100000);
//  //web3.personal.unlockAccount(account,'long3737257',100000);
////  res.send({'Data':"unlock ready"});
// res.json({"result":'dddd',"success":true});
//})

//查询对应数据id的值
app.get('/exchange/:id',function(req,res,next){
    //查询数据
    var ids = req.params.id;
    console.log(ids);  
    
    var sql = 'SELECT u.u_vitality,v.v_account_site,v.v_password,v.v_vitality_val from cl_vitality v ,cl_user u where v.v_userid = u.u_id and v_userid='+ids;
    connection.query(sql, function (error, results) {
        if(error){
            console.log('[SELECT ERROR] -',error.message);
            return;
        }
        console.log('--------SEKECT--------------');
        console.log(results);
      	//res.json({"resultMsg":'查询成功',"resultCode":200,"result":{results},"success":true}); 
        
        if(results.length!=0){
        	var msg = JSON.parse(JSON.stringify(results));
        	var keys = msg[0].v_account_site;
        	var password = msg[0].v_password;
        	
        	console.log(keys);
        	
        	console.log(msg[0]);
        	
        	//	解锁
      		web3.personal.unlockAccount(keys,password,100000);
      		
      		//查询的金额显示      		
      		
      		var money = msg[0].u_vitality;
      		      		
    		var ethwei = web3.eth.getBalance(keys); 
    		
    		var eth = web3.fromWei(ethwei, 'ether');
    		
    		console.log(eth);
    		
      		if(money==null){
      			money=0;      			
      		}
      		
      		res.json({"resultMsg":'查询成功',"resultCode":200,"result":{"hlb":money,"eth":eth,"site":keys},"success":true});      		
      		
        }
       
    });
});

////插入数据进行业务处理
//app.post('/insertDate',function(req,res,next){
////插入数据
//var userid = req.body.userid;
//var keyid = req.body.keys;
//var passwordies = req.body.password;
//var seed = req.body.seed;
//console.log(userid);
////var sort = req.body.sort;
//var addSql = 'insert into cl_vitality(v_password,v_account_site,v_show_seed) VALUES (?,?,?) WHERE v_userid ='+userid;
//
//var addSqlParams = [passwordies,keyid,seed];
//
//console.log(addSqlParams);
//
//connection.query(addSql,addSqlParams,function(err,result){
//  if(err){
//      console.log('[INSERT ERROR] -',err.message);
//  }
//  console.log('------------INSERT----------');
//  console.log('INSERT ID:',result); 
//  
//  if(result.insertId){
//  	res.json({"result":'插入成功',"resultCode":200,"success":true});
//  }
//	
//});
//
//});

app.post("/send",function(req,res,next){
	var account1 = req.body.account1;
  	var account2;
  	var amount = req.body.amount;
	var psw = req.body.psw;
	var state =   req.body.judgeState;
  	var value = web3.toWei(amount,"ether");
  	var userid = req.body.userid;


	if(state=="2"){
		account2="0x2f81fb3534fa7aa6b284dedd86084d6a98476bf0";
	}else if(state=="1"){
		account2=req.body.account2;
	}
//  var sort = req.body.sort;

	web3.personal.unlockAccount(account1,psw,100000);

   	var code = web3.eth.sendTransaction({
   		from: account1,
    	to: account2,
    	value:value
   	})
    
    //res.json({"result":code,"success":true});
    
    var queryCode = web3.eth.getTransaction(code);
    
    var fromEth = queryCode.from;
    var toEth = queryCode.to;
    //var changeValue = web3.fromWei(queryCode.value, 'ether');
    var changeDate = new Date();
    var hash = queryCode.hash;
    
    var addSql = 'insert into cl_vitality_detail(d_vitality_change,d_change_time,d_type,d_state,d_user_account,d_flow_account,d_hash) VALUES(?,?,?,?,?,?,?)';
    var addParmas  = [amount,changeDate,1,1,fromEth,toEth,hash];
    
//  console.log(amount);
//  console.log(changeDate);
//  console.log(fromEth);
//  console.log(toEth);
//  console.log(code);
    connection.query(addSql,addParmas,function(err,result){
        if(err){
           console.log('[INSERT ERROR] -',err.message);
         	return;
        }
        console.log('------------INSERT----------');

		if(result.insertId){
			//res.json({"result":{"changeValue":amount,"fromEth":fromEth,"toEth":toEth,"changeDate":changeDate,"code":code},"resultCode":200,"success":true});
			
			//转账成功   更新数据库
			var ethwei = web3.eth.getBalance(account1).toNumber(); 
    		
    		console.log(ethwei);
    		
    		var eth = web3.fromWei(ethwei, 'ether');
			
			res.json({"result":{"eth":eth},"resultCode":200,"success":true});
			
		}else {
			res.json({"result":'转账失败',"resultCode":400,"error":true});
		}
		
    });
    
//    var code = web3.eth.getTransaction(hash);
//    console.log("0x8827759c428e1d3e403e5adf1325e067e2d7491d","0x03df06206b0ec647b3f67989d0b43fa303559fb0","0.01",hash);
   
})

/**
 * @api {post} /examine 审核用户提取到B账户
 * @apiVersion 1.0.0
 * @apiName 审核用户提取到B账户
 * @apiGroup Examine
 *
 * @apiParam (params) {String} keys       用户的密钥
 * @apiParam (params) {String} account    用户提取金额			
 * @apiParam (params) {String} id         转账记录id
 * 
 * 
 * @apiSuccess {String} result 返回转账成功
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * 		{
 * 			"result":"转账成功",
 * 			"resultCode":200,
 * 			"success":true
 * 		}
 *
 * @apiError (Error 4xx) 400 转账失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 转账失败
 * 		{
 * 			"result":"转账失败",
 * 			"resultCode":400,
 * 			"error":true
 * 		}
 * 		HTTP/1.1 209 请勿重复提交审核
 *  	{
 * 			"result":"请勿重复提交审核",
 * 			"resultCode":209,
 * 			"success":true
 * 		}
 */
app.post("/examine",function(req,res,next){
	
	var keys = req.body.keys;
	var id = req.body.id;
	var account = req.body.account;
	var value = web3.toWei(account,"ether");
	var publicAccount = "0x2f81fb3534fa7aa6b284dedd86084d6a98476bf0";
	var publicAccountPsw = "long3737257";

	var sql = 'SELECT l_status from cl_livecowry_detail where id = '+id;

	connection.query(sql, function (error, results) {
		if(error){
			console.log('[SELECT ERROR] -',error.message);
		}
		console.log(results);

		var msg = JSON.parse(JSON.stringify(results));
		if(msg[0].l_status=="2"){
			res.json({"result":'审核已通过，请勿重复提交审核！',"resultCode":209,"success":true});

			return 
		}

		web3.personal.unlockAccount(publicAccount,publicAccountPsw,100000);

	//A转B即是公司转个人账户
	var code = web3.eth.sendTransaction({
   		from: publicAccount,
    	to: keys,
    	value:value
   	})
	
	console.log(code);

	var queryCode = web3.eth.getTransaction(code);
	
	var fromEth = queryCode.from;
    var toEth = queryCode.to;
    //var changeValue = web3.fromWei(queryCode.value, 'ether');
    var changeDate = new Date();
    var hash = queryCode.hash;
	
	console.log(changeDate);
	


    var addSql = 'insert into cl_vitality_detail(d_vitality_change,d_change_time,d_type,d_state,d_user_account,d_flow_account,d_hash) VALUES(?,?,?,?,?,?,?)';
    var addParmas  = [account,changeDate,1,1,fromEth,toEth,hash];
	console.log("415"+publicAccount);
    connection.query(addSql,addParmas,function(err,result){
        if(err){
		   console.log('[INSERT ERROR] -',err.message);
		   res.json({"result":'转账失败',"resultCode":400,"error":true});
         	return;
        }
			// var ethwei = web3.eth.getBalance(account1).toNumber(); 
    		
    		// console.log(ethwei);
    		
    		// var eth = web3.fromWei(ethwei, 'ether');
			
			// res.json({"result":{"eth":eth},"resultCode":200,"success":true});

			//更改状态
			
			var updataSql = "UPDATE cl_livecowry_detail SET l_status = ? WHERE id = ?";
			var updataParams = [2,id];

			connection.query(updataSql,updataParams,function(err,result){
				if(err){
				   console.log('[UPDATE ERROR] -',err.message);
					 return;
				}

				res.json({"result":'转账成功',"resultCode":200,"success":true});


			})
		
    });


	})

	
	
})


app.get("/query",function(req,res,next){
	var code = web3.eth.getTransaction("0xce3288cd0e4fdff4563b2d298bd03d9a74760570cacabaa77742f195a004c4c0");
	res.json({"result":{"hlb":code},"success":true});		
})



app.get("/getBalance",function(req,res,next){
//	var eth = web3.eth.getBalance("0x2f81fb3534fa7aa6b284dedd86084d6a98476bf0");
	
	//var eth = web3.eth.getBalance("0xb88d92fa90a56f7d8b97fde5ecc1629e1a995d34");
	var eth = web3.eth.getBalance("0xb88d92fa90a56f7d8b97fde5ecc1629e1a995d34");
	
	//0xb88d92fa90a56f7d8b97fde5ecc1629e1a995d34
	res.json({"result":{"hlb":eth},"success":true});
		
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
