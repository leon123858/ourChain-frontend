import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

/// Basic Methods
Future<List<dynamic>?> getUtxoList(
    {required String address,
    double fee = 0.0001,
    required String nodeUrl}) async {
  final utxoResult =
      await http.get(Uri.parse('${nodeUrl}get/utxo?address=$address'));
  final utxoJson = json.decode(utxoResult.body);
  if (utxoJson['result'] != "success") {
    if (kDebugMode) {
      print('Error: $utxoJson');
    }
    return null;
  }
  final List<dynamic> utxoList = utxoJson['data'];
  return utxoList;
}

/// Basic Methods
Future<Map<String, dynamic>?> getUtxo(
    {double fee = 0.0001,
    String targetAddress = "",
    String ownerAddress = "",
    required String nodeUrl}) async {
  final utxoResult =
      await http.get(Uri.parse('${nodeUrl}get/utxo?address=$ownerAddress'));
  final utxoJson = json.decode(utxoResult.body);
  if (utxoJson['result'] != "success") {
    if (kDebugMode) {
      print('Error: $utxoJson');
    }
    return null;
  }
  final List<dynamic> utxoList = utxoJson['data'];
  utxoList.shuffle();
  dynamic targetUtxo;
  for (var utxo in utxoList) {
    if (utxo['amount'] > fee) {
      targetUtxo = utxo;
      break;
    }
  }
  if (targetUtxo == null) {
    if (kDebugMode) {
      print('Error: no utxo available');
    }
    return null;
  }
  return {
    'input': {
      'txid': targetUtxo['txid'],
      'vout': targetUtxo['vout'],
    },
    'output': {
      'address':
          targetAddress.isNotEmpty ? targetAddress : targetUtxo['address'],
      'amount': targetUtxo['amount'] - fee,
    }
  };
}

/// Basic Methods
Future<Map<String, dynamic>?> createTx(
    {double fee = 0.0001,
    String targetAddress = "",
    String ownerAddress = "",
    required Map<String, dynamic> contract,
    required String nodeUrl}) async {
  final utxo = await getUtxo(
      fee: fee,
      targetAddress: targetAddress,
      ownerAddress: ownerAddress,
      nodeUrl: nodeUrl);
  if (utxo == null) {
    if (kDebugMode) {
      print('Error: no utxo available');
    }
    return null;
  }
  final result = await http.post(
    Uri.parse('${nodeUrl}rawtransaction/create'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({
      'inputs': [utxo['input']],
      'outputs': [utxo['output']],
      'contract': {
        "action": contract['action'],
        "code": contract['code'],
        "address": contract['address'],
        "args": contract['args'],
      }
    }),
  );
  final jsonObj = json.decode(result.body);
  if (jsonObj['result'] != "success") {
    if (kDebugMode) {
      print('Error: $json');
    }
    return null;
  }
  return {
    'hex': jsonObj['data']['hex'] as String,
    'contractAddress': jsonObj['data']['contractAddress'] as String,
  };
}

/// Basic Methods
Future<String?> signContract(
    {String rawTx = "",
    String privateKey = "",
    required String nodeUrl}) async {
  final result = await http.post(
    Uri.parse('${nodeUrl}rawtransaction/sign'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({
      'rawTransaction': rawTx,
      'privateKey': privateKey,
    }),
  );
  final jsonObj = json.decode(result.body);
  if (jsonObj['result'] != "success") {
    if (kDebugMode) {
      print('Error: $json');
    }
    return null;
  }
  if (!jsonObj['data']['complete']) {
    if (kDebugMode) {
      print('Error: $json');
    }
    return null;
  }
  return jsonObj['data']['hex'] as String;
}

/// Basic Methods
Future<String?> sendTx({String signedTx = "", required String nodeUrl}) async {
  final result = await http.post(
    Uri.parse('${nodeUrl}rawtransaction/send'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({
      'rawTransaction': signedTx,
    }),
  );
  final jsonObj = json.decode(result.body);
  if (jsonObj['result'] != "success") {
    if (kDebugMode) {
      print('Error: $json');
    }
    return null;
  }
  return jsonObj['data'] as String;
}
