var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '创建钱包' });
});

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


module.exports = router;