import 'package:json_annotation/json_annotation.dart';

part 'lab.g.dart';

@JsonLiteral('lab.json', asConst: true)
Map<String, dynamic> get config => _$configJsonLiteral;
