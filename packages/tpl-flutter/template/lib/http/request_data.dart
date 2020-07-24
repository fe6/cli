/// 网络结果数据
class ResultData {
  final dynamic data;
  final bool result;
  final int code;
  final dynamic headers;

  ResultData(this.data, this.result, this.code, {this.headers});
}
