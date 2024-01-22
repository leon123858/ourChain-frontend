import 'dart:convert';

import 'package:our_wallet_app/services/chain/contract.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';
import 'package:our_wallet_app/utils/config.dart';

Future<bool> register(String name, String password, Wallet wallet) async {
  var result = await callContract(
      targetAddress: aidAddress,
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      args: ["registerNewUser", name, password]);
  if (result == "") {
    return false;
  }
  return true;
}

Future<String?> login(String name, String password, Wallet wallet) async {
  String? result = await getContractMessage(
    targetAddress: aidAddress,
    args: ["login", name, password],
  );
  if (result == null) {
    return null;
  }
  // convert result to json
  var resultJson = jsonDecode(result);
  // check if result is success
  if (resultJson['isExist'] == true) {
    return resultJson['aid'];
  }
  return null;
}

Future<List<String>> getCoinList(String userAid) async {
  String? result = await getContractMessage(
    targetAddress: aidAddress,
    args: ["getCoins", userAid],
  );
  if (result == null) {
    return [];
  }
  // convert result to json
  var resultJson = jsonDecode(result);
  // check if result is success
  if (resultJson['isExist'] == true) {
    return resultJson['coins'].cast<String>();
  }
  return [];
}

Future<bool> addCoin(String userAid, String coinAddress) async {
  var result = await callContract(
      targetAddress: aidAddress,
      privateKey: defaultPrivateKey,
      ownerAddress: defaultPublicKey,
      args: ["setCoin", userAid, coinAddress]);
  if (result == "") {
    return false;
  }
  return true;
}

Future<bool> removeCoin(String userAid, String coinAddress) async {
  var result = await callContract(
      targetAddress: aidAddress,
      privateKey: defaultPrivateKey,
      ownerAddress: defaultPublicKey,
      args: ["removeCoin", userAid, coinAddress]);
  if (result == "") {
    return false;
  }
  return true;
}
