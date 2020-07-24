import 'package:fish_redux/fish_redux.dart';

import 'action.dart';
import 'state.dart';

Reducer<HomeState> buildReducer() {
  return asReducer(
    <Object, Reducer<HomeState>>{
      HomeAction.beforeGetCity: _onBeforeGetCity,
      HomeAction.getCitySuccess: _onGetCitySuccess,
    },
  );
}

HomeState _onBeforeGetCity(HomeState state, Action action) {
  final HomeState newState = state.clone();
  newState.cityLoading = true;
  return newState;
}

HomeState _onGetCitySuccess(HomeState state, Action action) {
  final dynamic city = action.payload ?? <dynamic>[];
  final HomeState newState = state.clone();
  newState.city = city;
  newState.cityLoading = false;
  return newState;
}
