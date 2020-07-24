import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action, Page;

import 'package:{{name}}/global_store/state.dart';

class HomeState implements GlobalBaseState, Cloneable<HomeState> {
  List city;

  bool cityLoading;

  @override
  HomeState clone() {
    return HomeState()
      ..themeColor = themeColor
      ..city = city
      ..cityLoading = cityLoading;
  }

  @override
  Color themeColor;
}

HomeState initState(HomeState arg) {
  final HomeState state = HomeState();

  state.cityLoading = false;

  return state;
}
