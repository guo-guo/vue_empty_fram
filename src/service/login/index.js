import ajax from '@/service/basic'

// 微信登录
export async function wechatLogin(extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/mingdata/m-provides/listMedicalProjectByPage'
  }, extra), [], []);
  return result;
}