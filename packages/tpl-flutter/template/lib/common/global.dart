import 'package:{{name}}/env/config.dart';

class Global {
  static Config env;
  //初始化全局信息，会在APP启动时执行
  static Future init(Config envConf) async {
    try {
      env = envConf;
    } catch (e) {
      print(e);
    }
  }
}
