import axios from 'axios'
import Router from 'code-middleware'
import { Message } from 'element-ui'

export const ajaxRouter = new Router()
// post - data:{}, get - params: {}
ajaxRouter.use('/result/analysis', function (next) {
  const { result } = this
  debugger
  if (!(result instanceof Error)) {
    debugger
    if (result.result) {
      // const { code, message, warnMessage, result: data } = result.data
      // switch (code) {
      //   case 0:
      //     if (warnMessage) { // 新建编辑数据，异常，不堵塞。
      //       this.result = {
      //         message: warnMessage,
      //         result: data
      //       }
      //     } else {
      //       this.result = data
      //     }
      //     break
      //   default:
      //     this.result = Error(code)
      //     this.errorInfo = {
      //       code,
      //       message
      //     }
      // }
    } else {
      this.errorInfo = {
        message: result.msg || '请求超时'
      }
      this.result = Error()
    }
  } else {
    this.result = Error()
    // const data = result.response && result.response.data
    this.errorInfo = {
      message: result.message || '请求超时'
    }
  }
  next()
})

ajaxRouter.use('/result/handle-error', function (next) {
  const { result, errorInfo } = this
  if (result instanceof Error) {
    if (errorInfo) {
      Message({
        message: errorInfo.message,
        type: 'error',
        duration: 2000
      })
    }
  }
  next()
})
export default async function ajax(config, whiteList = [], blackList = []) {
  let context = await ajaxRouter.send({
    whiteList: ['/config'].concat(whiteList),
    blackList,
    config
  })
  let result = null
  try {
    result = await axios.request(context.config)
  } catch (e) {
    result = e
  }
  context = await ajaxRouter.send({
    whiteList: ['/result'].concat(whiteList),
    blackList,
    result,
    config
  })
  if (context.result instanceof Error) {
    throw context.result
    // return context;
  }
  return context.result
}
