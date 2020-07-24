/// 遗留问题
/// 1. 状态码 非 200 的时候错误跳转
/// 2. 刷新 token 未实现
/// 3. 上传图片未实现
import 'dart:collection';

import 'package:dio/adapter.dart';
import 'package:dio/dio.dart';

import 'package:{{name}}/common/global.dart';
// import 'package:{{name}}/http/request_data.dart';

import 'interceptors/response_interceptor.dart';
// import 'package:supper_admin/http/request_data.dart';

// 是否需要抓包
// const bool isUseCharles = true;
/// 自己的 ip 配置，才能抓包
// const String proxy = '192.168.3.35:8888';
// const String proxy = '192.168.2.65:8888';

/// ajax 请求的主域名
// const String baseUrl = 'https://forward.evente.cn/';

dynamic _resultError(DioError e) {
  Response errorResponse;
  if (e.response != null) {
    errorResponse = e.response;
  } else {
    errorResponse = Response(statusCode: 404);
  }
  if (e.type == DioErrorType.CONNECT_TIMEOUT ||
      e.type == DioErrorType.RECEIVE_TIMEOUT) {
    errorResponse.statusCode = -2;
  }
  return errorResponse;
}

class HttpUtil {
  HttpUtil() {
    _dio.interceptors.add(ResponseInterceptors());
  }

  Dio _dio = Dio();

  dynamic ajax(String path,
      {String method,
      Map<String, dynamic> params,
      Map<String, dynamic> header}) async {
    final Map<String, dynamic> headers = HashMap();
    final String ajaxMethod = method == null ? 'get' : method;

    if (header != null) {
      headers.addAll(header);
    }

    final option = Options(method: ajaxMethod);
    option.headers = headers;

    /// 抓包设置
    final isUseCharles = Global.env.isUseCharles;
    if (isUseCharles) {
      (_dio.httpClientAdapter as DefaultHttpClientAdapter).onHttpClientCreate =
          (client) {
        client.badCertificateCallback =
            (dynamic cert, String host, int port) => isUseCharles;
        client.findProxy = (url) => 'PROXY ${Global.env.charlesProxy}';
      };
    }

    Response response;
    try {
      response = await _dio.request('${Global.env.api}$path',
          queryParameters: ajaxMethod == 'get' ? params : {},
          data: ajaxMethod == 'post' ? params : {},
          options: option);
    } on DioError catch (e) {
      return _resultError(e);
    }
    if (response.data is DioError) {
      return _resultError(response.data);
    }

    return response.data;
  }

  dynamic get(String path,
      {Map<String, dynamic> params, Map<String, dynamic> header}) async {
    return ajax(path, params: params, header: header);
  }

  dynamic post(String path,
      {Map<String, dynamic> params, Map<String, dynamic> header}) async {
    return ajax(path, method: 'post', params: params, header: header);
  }
}

final HttpUtil net = HttpUtil();
