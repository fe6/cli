import 'package:flutter/material.dart' hide Page, Action;

import 'common/global.dart';
import 'route/index.dart';

createApp() {
  return MaterialApp(
    title: 'Fluro',
    debugShowCheckedModeBanner:
        Global.env.debug != null ? Global.env.debug : false,
    theme: ThemeData(
      primarySwatch: Colors.blue,
    ),
    home: routes.buildPage('home_page', null),
    onGenerateRoute: (RouteSettings settings) {
      return MaterialPageRoute<Object>(builder: (BuildContext context) {
        return routes.buildPage(settings.name, settings.arguments);
      });
    },
  );
}
