import 'dart:convert';

import 'package:our_wallet_app/services/chain/contract.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';

import '../orc20/wrapper.dart';

Future<bool> register(String name, String password, Wallet wallet) async {
  var result = await callContract(
      targetAddress: wallet.getAidAddress(),
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      args: ["registerNewUser", name, password],
      nodeUrl: wallet.getNodeUrl());
  if (result == "") {
    return false;
  }
  return true;
}

Future<String?> login(String name, String password, Wallet wallet) async {
  String? result = await getContractMessage(
    targetAddress: wallet.getAidAddress(),
    args: ["login", name, password],
    nodeUrl: wallet.getNodeUrl(),
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

Future<List<String>> getCoinList(String userAid, Wallet wallet) async {
  String? result = await getContractMessage(
    targetAddress: wallet.getAidAddress(),
    args: ["getCoins", userAid],
    nodeUrl: wallet.getNodeUrl(),
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

Future<List<String>> getCoinNameList(List<String> coins, Wallet wallet) async {
  return Future.wait(coins.map((coin) async {
    return (await getNFTList(coin, wallet.getNodeUrl()))[0].coinName;
  }));
}

Future<bool> addCoin(String userAid, String coinAddress, Wallet wallet) async {
  var result = await callContract(
      targetAddress: wallet.getAidAddress(),
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      args: ["setCoin", userAid, coinAddress],
      nodeUrl: wallet.getNodeUrl());
  if (result == "") {
    return false;
  }
  return true;
}

Future<bool> removeCoin(
    String userAid, String coinAddress, Wallet wallet) async {
  var result = await callContract(
      targetAddress: wallet.getAidAddress(),
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      args: ["removeCoin", userAid, coinAddress],
      nodeUrl: wallet.getNodeUrl());
  if (result == "") {
    return false;
  }
  return true;
}

Future<bool> buyCoin(String coinAddress, String srcAid, String targetAid,
    int count, Wallet wallet) async {
  var result = await callContract(
      targetAddress: coinAddress,
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      args: ["transferFrom", srcAid, targetAid, count.toString()],
      nodeUrl: wallet.getNodeUrl());
  if (result == "") {
    return false;
  }
  return true;
}
