import 'package:json_annotation/json_annotation.dart';

part 'pro.g.dart';

@JsonLiteral('pro.json', asConst: true)
Map<String, dynamic> get config => _$configJsonLiteral;
