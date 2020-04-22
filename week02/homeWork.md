1、写一个正则表达式 匹配所有 Number 直接量
/^-?\d+$|^(-?\d+)(\.\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/g

2、写一个 UTF-8 Encoding 的函数
function utf8Encoding(inputStr) {
  var outputStr = "";
  
  for(var i = 0; i < inputStr.length; i++) {
    var temp = inputStr.charCodeAt(i);
    
    //0xxxxxxx
    if(temp < 128) {
      outputStr += String.fromCharCode(temp);
    }
    //110xxxxx 10xxxxxx
    else if(temp < 2048) {
      outputStr += String.fromCharCode((temp >> 6) | 192);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
    //1110xxxx 10xxxxxx 10xxxxxx
    else if(temp < 65536) {
      outputStr += String.fromCharCode((temp >> 12) | 224);
      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
    //11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    else {
      outputStr += String.fromCharCode((temp >> 18) | 240);
      outputStr += String.fromCharCode(((temp >> 12) & 63) | 128);
      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
  }
  
  return outputStr;
}

3、写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
 /^[\u4E00-\u9FA5A-Za-z0-9_]+$/

