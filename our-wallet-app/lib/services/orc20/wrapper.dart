import 'dart:async' show Future;
import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;
import 'package:our_wallet_app/services/chain/contract.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';

Future<String> loadAsset(String aidAddress) async {
  return (await rootBundle.loadString('assets/orc20.cpp'))
      .replaceFirst("<AID_ADDRESS>", aidAddress);
}

class NFTItem {
  String coinName;
  int id;
  String owner;

  NFTItem(this.coinName, this.id, this.owner);
}

Future<String?> createNFT(
    String coinName, int count, String userAid, Wallet wallet) async {
  var result = await deployContract(
      targetAddress: "",
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      code: await loadAsset(wallet.getAidAddress()),
      args: [coinName, "$count", userAid],
      nodeUrl: wallet.getNodeUrl());
  if (result == null) {
    return null;
  }
  return result["contractAddress"];
}

Future<List<NFTItem>> getNFTList(String nftAddress, String nodeUrl) async {
  String? result = await getContractMessage(
    nodeUrl: nodeUrl,
    targetAddress: nftAddress,
    args: ["totalSupply"],
  );
  if (result == null) {
    return [];
  }
  // convert result to json
  var resultJson = json.decode(result);
  // convert result to List<NFTItem>
  List<NFTItem> nftList = [];
  for (int i = 0; i < resultJson.length; i++) {
    nftList.add(NFTItem(resultJson[i]["coinName"], resultJson[i]["id"],
        resultJson[i]["owner"]));
  }

  return nftList;
}

Future<bool> transferNFT(String nftAddress, String aid, String targetAid,
    int count, String userPassword, Wallet wallet) async {
  var result = await callContract(
      targetAddress: nftAddress,
      privateKey: wallet.privateKey,
      ownerAddress: wallet.address,
      nodeUrl: wallet.getNodeUrl(),
      args: ["transfer", aid, targetAid, "$count", userPassword]);
  if (result == "") {
    return false;
  }
  return true;
}
