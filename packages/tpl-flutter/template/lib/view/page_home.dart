import 'package:flutter/material.dart' hide Page, Action;

import 'package:{{name}}/http/http.dart';

class PageHome1 extends StatefulWidget {
  @override
  _PageHomeState createState() => _PageHomeState();
}

class _PageHomeState extends State<PageHome1> {
  dynamic _getData() async {
    // final res = await net.post(
    //   'public/map/getPoint',
    //   params: {
    //     'address': '北京市'
    //   }
    // );
    final res = await net.get('public/city', params: {'c': 'a'});
    print('$res');
  }

  @override
  void initState() {
    super.initState();
    _getData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('widget.title'),
      ),
      body: Center(
        child: Text(
          'You have pushed the button this many times:',
        ),
      ),
    );
  }
}
