import 'package:json_annotation/json_annotation.dart';

part 'config.g.dart';

@JsonSerializable()
class Config extends Object {
  @JsonKey(name: 'env')
  String env;

  @JsonKey(name: 'api')
  String api;

  @JsonKey(name: 'debug')
  bool debug;

  @JsonKey(name: 'isUseCharles')
  bool isUseCharles;

  @JsonKey(name: 'charlesProxy')
  String charlesProxy;

  Config(
    this.env,
    this.api,
    this.debug,
    this.isUseCharles,
    this.charlesProxy,
  );

  factory Config.fromJson(Map<String, dynamic> srcJson) =>
      _$ConfigFromJson(srcJson);

  Map<String, dynamic> toJson() => _$ConfigToJson(this);
}
