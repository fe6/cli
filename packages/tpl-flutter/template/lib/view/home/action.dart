import 'package:fish_redux/fish_redux.dart';

enum HomeAction { changeTheme, beforeGetCity, getCity, getCitySuccess }

class HomeActionCreator {
  static Action onChangeTheme() {
    return const Action(HomeAction.changeTheme);
  }

  static Action onBeforeGetCity() {
    return const Action(HomeAction.beforeGetCity);
  }

  static Action onGetCity() {
    return const Action(HomeAction.getCity);
  }

  static Action onGetCitySuccess(dynamic city) {
    return Action(HomeAction.getCitySuccess, payload: city);
  }
}
