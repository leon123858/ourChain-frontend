import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:our_wallet_app/utils/config.dart';
import 'basic.dart';

/// Contract Methods
Future<Map<String, dynamic>> deployContract({double fee = 0.0001, String targetAddress = "", String privateKey = "", String ownerAddress = "", String code = "", List<String> args = const []}) async {
  final rawTx = await createTx(fee: fee, targetAddress: "", ownerAddress: ownerAddress, contract: {
    'action': 1,
    'code': code,
    'address': targetAddress,
    'args': args,
  });
  if (rawTx == null) {
    throw Exception('Error: no rawTx available');
  }
  final signedTx = await signContract(rawTx: rawTx['hex'], privateKey: privateKey);
  if (signedTx == null) {
    throw Exception('Error: no signedTx available');
  }
  final txid = await sendTx(signedTx: signedTx);
  if (txid == null) {
    throw Exception('Error: no txid available');
  }
  return {
    'txid': txid,
    'contractAddress': rawTx['contractAddress'],
  };
}
/// Contract Methods
Future<String> callContract({double fee = 0.0001, String targetAddress = "", String privateKey = "", String ownerAddress = "", String code = "", List<String> args = const []}) async {
  final rawTx = await createTx(fee: fee, targetAddress: "", ownerAddress: ownerAddress, contract: {
    'action': 2,
    'code': code,
    'address': targetAddress,
    'args': args,
  });
  if (rawTx == null) {
    throw Exception('Error: no rawTx available');
  }
  final signedTx = await signContract(rawTx: rawTx['hex'], privateKey: privateKey);
  if (signedTx == null) {
    throw Exception('Error: no signedTx available');
  }
  final txid = await sendTx(signedTx: signedTx);
  if (txid == null) {
    throw Exception('Error: no txid available');
  }
  return txid;
}
/// Contract Methods
Future<String?> getContractMessage({String targetAddress = "", List<String> args = const []}) async {
  final result = await http.post(
    Uri.parse('${baseUrl}get/contractmessage'),
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