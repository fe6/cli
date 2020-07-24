import 'package:dio/dio.dart';

import 'package:{{name}}/common/global.dart';
import 'package:{{name}}/http/code.dart';
import 'package:{{name}}/http/request_data.dart';

/// Token拦截器
class ResponseInterceptors extends InterceptorsWrapper {
  @override
  onResponse(Response response) async {
    RequestOptions option = response.request;
    var value;
    try {
      var header = response.headers[Headers.contentTypeHeader];
      if ((header != null && header.toString().contains("text"))) {
        value = ResultData(response.data, true, Code.SUCCESS_HTTP_CODE);
      } else if (response.statusCode >= 200 && response.statusCode < 300) {
        value = ResultData(response.data, true, Code.SUCCESS_HTTP_CODE,
            headers: response.headers);
      }
    } catch (e) {
      if (Global.env.env == 'dev' && Global.env.debug) {
        print('${e.toString()} -> ${option.path}');
      }
      value = ResultData(response.data, false, response.statusCode,
          headers: response.headers);
    }
    return value;
  }
}
