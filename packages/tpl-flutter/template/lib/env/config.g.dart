// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'config.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Config _$ConfigFromJson(Map<String, dynamic> json) {
  return Config(
    json['env'] as String,
    json['api'] as String,
    json['debug'] as bool,
    json['isUseCharles'] as bool,
    json['charlesProxy'] as String,
  );
}

Map<String, dynamic> _$ConfigToJson(Config instance) => <String, dynamic>{
      'env': instance.env,
      'api': instance.api,
      'debug': instance.debug,
      'isUseCharles': instance.isUseCharles,
      'charlesProxy': instance.charlesProxy,
    };
