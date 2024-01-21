import 'dart:convert';

import 'package:our_wallet_app/services/wallet/wrapper.dart';
import 'package:our_wallet_app/services/chain/contract.dart';
import 'package:our_wallet_app/utils/config.dart';


Future<bool> register(String name, String password, Wallet wallet) async {
  var result = await callContract(
      targetAddress: aidAddress,
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      args: ["registerNewUser", name, password]
  );
  if(result == "") {
    return false;
  }
  return true;
}

Future<bool> login(String name, String password, Wallet wallet) async {
  String? result = await getContractMessage(
    targetAddress: aidAddress,
    args: ["login", name, password],
  );
  if (result == null) {
    return false;
  }
  // convert result to json
  var resultJson = jsonDecode(result);
  // check if result is success
  if (resultJson['isExist'] == true) {
    return true;
  }
  return false;
}