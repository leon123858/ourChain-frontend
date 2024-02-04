import 'dart:convert';

import 'package:our_wallet_app/services/chain/contract.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';

class AbstractStore {
  final String name;
  final String aid;

  AbstractStore({required this.name, required this.aid});
}

class AbstractProduct {
  final String name;
  final int price;
  final String address;
  final String coin;

  AbstractProduct(
      {required this.name,
      required this.price,
      required this.address,
      required this.coin});
}

class StoreWrapper {
  final String name;
  final String address;
  final bool isExist;

  StoreWrapper(
      {required this.name, required this.address, this.isExist = true});

  static Future<StoreWrapper> create(Wallet wallet, String aid) async {
    var result = await getContractMessage(
        nodeUrl: wallet.getNodeUrl(),
        targetAddress: wallet.getStoreAddress(),
        args: ["getStoreInfo", aid]);
    if (result == null) {
      throw Exception("Error: no result available");
    }
    var resultJson = json.decode(result);
    var isExist = resultJson["isExist"];
    if (!isExist) {
      return StoreWrapper(name: "", address: aid, isExist: false);
    }
    var name = resultJson["name"];
    return StoreWrapper(name: name, address: aid);
  }

  Future<bool> setStoreInfo(Wallet wallet, String name, String password) async {
    var result = await callContract(
      targetAddress: wallet.getStoreAddress(),
      privateKey: wallet.getPrivateKey(),
      ownerAddress: wallet.getAddress(),
      nodeUrl: wallet.getNodeUrl(),
      args: ["setStore", address, password, name],
    );
    if (result == "") {
      return false;
    }
    return true;
  }

  Future<bool> addProduct(Wallet wallet, String name, String password,
      int price, String productAddress) async {
    String priceStr = price.toString();
    var result = await callContract(
      targetAddress: wallet.getStoreAddress(),
      privateKey: wallet.getPrivateKey(),
      ownerAddress: wallet.getAddress(),
      nodeUrl: wallet.getNodeUrl(),
      args: [
        "createProduct",
        address,
        password,
        name,
        priceStr,
        productAddress
      ],
    );
    if (result == "") {
      return false;
    }
    return true;
  }

  Future<bool> removeProduct(
      Wallet wallet, String password, String productName) async {
    var result = await callContract(
      targetAddress: wallet.getStoreAddress(),
      privateKey: wallet.getPrivateKey(),
      ownerAddress: wallet.getAddress(),
      nodeUrl: wallet.getNodeUrl(),
      args: ["removeProduct", address, password, productName],
    );
    if (result == "") {
      return false;
    }
    return true;
  }
}

Future<List<AbstractStore>> getStoreList(Wallet wallet) async {
  var result = await getContractMessage(
      nodeUrl: wallet.getNodeUrl(),
      targetAddress: wallet.getStoreAddress(),
      args: ["getStoreList"]);
  if (result == null) {
    return [];
  }
  var resultJson = json.decode(result);
  List<AbstractStore> list = [];
  for (var item in resultJson) {
    list.add(AbstractStore(name: item["name"], aid: item["aid"]));
  }
  return list;
}

Future<List<AbstractProduct>> getProductList(Wallet wallet, String aid) async {
  var result = await getContractMessage(
      nodeUrl: wallet.getNodeUrl(),
      targetAddress: wallet.getStoreAddress(),
      args: ["getProductList", aid]);
  if (result == null) {
    return [];
  }
  var resultJson = json.decode(result);
  List<AbstractProduct> list = [];
  for (var item in resultJson) {
    list.add(AbstractProduct(
        name: item["name"],
        price: item["price"],
        address: item["address"],
        coin: item["coin"]));
  }
  return list;
}
