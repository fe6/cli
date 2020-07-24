import 'package:flutter/material.dart' show runApp;

import 'common/global.dart';
import 'env/config.dart';
import 'env/dev.dart';

import 'app.dart';

final Config envConf = Config.fromJson(config);

void main() => Global.init(envConf).then((e) => runApp(createApp()));
