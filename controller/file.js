let OSS = require('ali-oss');

let client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIiG34CxtAl0Kp',
  accessKeySecret: 'TCuePLFvCoSzWkKR4dWjyeBl7zYC2R'
});

async function put () {
  try {
    let result = await client.put('object-name', 'local-file');
    console.log(result);
  } catch (e) {
  	console.log(er);
  }
}

export function up(req, res){
  console.log(res.objects)
}