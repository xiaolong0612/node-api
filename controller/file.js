let OSS = require('ali-oss');

const config = {
    dirPath: 'xl', // 存放到哪个目录下
    bucket: 'imgku.oss-cn-beijing.aliyuncs.com',
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIiG34CxtAl0Kp',
    accessKeySecret: 'TCuePLFvCoSzWkKR4dWjyeBl7zYC2R',
    expAfter: 300000, // 签名失效时间，毫秒
    maxSize: 1048576000 // 文件最大的 size
}

let client = new OSS({
  region: config.region,
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret
});

async function put () {
  try {
    // 要创建的文件名
    var filename = Date.now() + ".jpg";

    let result = await client.put('object-name', 'local-file');
    console.log(result);
  } catch (e) {
  	console.log(er);
  }
}

export function upfile(req, res){
  const query = req.body;
  console.log(req.files)
  let fileName = '';
  if(req.files != undefined){
    fileName = new Date().getTime()+"_"+req.files.file.name;
    console.log(fileName)

    res.json({
        code: 200,
        success: true,
        message: '上传成功'
    })
  }else{
    res.json({
        code: -1,
        success: false,
        message: '上传失败'
    })
  }
}