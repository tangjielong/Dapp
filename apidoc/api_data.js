define({ "api": [
  {
    "type": "post",
    "url": "/examine",
    "title": "审核用户提取到B账户",
    "version": "1.0.0",
    "name": "_______B__",
    "group": "Examine",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "keys",
            "description": "<p>用户的密钥</p>"
          },
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户提取金额</p>"
          },
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>转账记录id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>返回转账成功</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n\t\t{\n\t\t\t\"result\":\"转账成功\",\n\t\t\t\"resultCode\":200,\n\t\t\t\"success\":true\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>转账失败</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 转账失败\n\t\t{\n\t\t\t\"result\":\"转账失败\",\n\t\t\t\"resultCode\":400,\n\t\t\t\"error\":true\n\t\t}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Examine"
  }
] });
