import 'package:fish_redux/fish_redux.dart';

import 'package:{{name}}/global_store/action.dart';
import 'package:{{name}}/global_store/store.dart';
import 'package:{{name}}/http/http.dart';
import 'action.dart';
import 'state.dart';

Effect<HomeState> buildEffect() {
  return combineEffects(<Object, Effect<HomeState>>{
    HomeAction.changeTheme: _onChangeTheme,
    HomeAction.getCity: _onGetCity,
  });
}

void _onChangeTheme(Action action, Context<HomeState> ctx) {
  GlobalStore.store.dispatch(GlobalActionCreator.onchangeThemeColor());
}

void _onGetCity(Action action, Context<HomeState> ctx) async {
  ctx.dispatch(HomeActionCreator.onBeforeGetCity());
  final res = await net.get('public/city');
  ctx.dispatch(HomeActionCreator.onGetCitySuccess(res.data['data']));
}
