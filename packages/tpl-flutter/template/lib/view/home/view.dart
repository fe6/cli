import 'package:{{name}}/view/home/action.dart';
import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';

import 'state.dart';

Widget buildView(HomeState state, Dispatch dispatch, ViewService viewService) {
  final Color color = state.themeColor ?? Colors.blue;
  final Text btnChild = Text('获取城市', style: TextStyle(color: Colors.white));
  final VoidCallback btnClick = () => dispatch(HomeActionCreator.onGetCity());

  return Scaffold(
    appBar: AppBar(
      title: Text('这是首页'),
      backgroundColor: state.themeColor,
    ),
    body: Column(
      children: <Widget>[
        Text(
          '点击下面按钮改变主体颜色',
        ),
        Center(
          child: FlatButton(
            onPressed: () => dispatch(HomeActionCreator.onChangeTheme()),
            color: color,
            child: Text('改变主题', style: TextStyle(color: Colors.white)),
          ),
        ),
        Center(
          child: state.cityLoading
              ? RaisedButton.icon(
                  icon: Icon(Icons.send, color: Colors.white),
                  color: color,
                  label: btnChild,
                  onPressed: btnClick,
                )
              : FlatButton(
                  onPressed: btnClick,
                  color: color,
                  child: btnChild,
                ),
        ),
        Text(state.city?.length.toString()),
      ],
    ),
  );
}
