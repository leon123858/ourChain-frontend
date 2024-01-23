import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

import 'basic.dart';

/// Contract Methods
Future<Map<String, dynamic>?> deployContract(
    {double fee = 0.0001,
    String targetAddress = "",
    String privateKey = "",
    String ownerAddress = "",
    String code = "",
    List<String> args = const [],
    required String nodeUrl}) async {
  final rawTx = await createTx(
      fee: fee,
      targetAddress: "",
      ownerAddress: ownerAddress,
      contract: {
        'action': 1,
        'code': code,
        'address': targetAddress,
        'args': args,
      },
      nodeUrl: nodeUrl);
  if (rawTx == null) {
    if (kDebugMode) {
      print("Error: no rawTx available");
    }
    return null;
  }
  final signedTx = await signContract(
      rawTx: rawTx['hex'], privateKey: privateKey, nodeUrl: nodeUrl);
  if (signedTx == null) {
    if (kDebugMode) {
      print("Error: no signedTx available");
    }
    return null;
  }
  final txid = await sendTx(signedTx: signedTx, nodeUrl: nodeUrl);
  if (txid == null) {
    if (kDebugMode) {
      print("Error: no txid available");
    }
    return null;
  }
  return {
    'txid': txid,
    'contractAddress': rawTx['contractAddress'],
  };
}

/// Contract Methods
Future<String> callContract(
    {double fee = 0.0001,
    String targetAddress = "",
    String privateKey = "",
    String ownerAddress = "",
    String code = "",
    List<String> args = const [],
    required String nodeUrl}) async {
  final rawTx = await createTx(
      fee: fee,
      targetAddress: "",
      ownerAddress: ownerAddress,
      contract: {
        'action': 2,
        'code': code,
        'address': targetAddress,
        'args': args,
      },
      nodeUrl: nodeUrl);
  if (rawTx == null) {
    if (kDebugMode) {
      print('Error: no rawTx available');
    }
    return "";
  }
  final signedTx = await signContract(
      rawTx: rawTx['hex'], privateKey: privateKey, nodeUrl: nodeUrl);
  if (signedTx == null) {
    if (kDebugMode) {
      print('Error: no signedTx available');
    }
    return "";
  }
  final txid = await sendTx(signedTx: signedTx, nodeUrl: nodeUrl);
  if (txid == null) {
    if (kDebugMode) {
      print('Error: no txId available');
    }
    return "";
  }
  return txid;
}

/// Contract Methods
Future<String?> getContractMessage(
    {String targetAddress = "",
    List<String> args = const [],
    required String nodeUrl}) async {
  final result = await http.post(
    Uri.parse('${nodeUrl}get/contractmessage'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({
      'address': targetAddress,
      'arguments': args,
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
