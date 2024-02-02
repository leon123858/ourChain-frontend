import 'package:our_wallet_app/services/chain/basic.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Wallet {
  final String address;
  final String privateKey;
  final String aidAddress;
  final String storeAddress;
  final String nodeUrl;

  String getAddress() {
    return address;
  }

  String getPrivateKey() {
    return privateKey;
  }

  String getAidAddress() {
    return aidAddress;
  }

  String getNodeUrl() {
    return nodeUrl;
  }

  String getStoreAddress() {
    return storeAddress;
  }

  Future<double> getBalance() async {
    var utxoList = await getUtxoList(address: address, nodeUrl: nodeUrl);
    if (utxoList == null) {
      return 0;
    }
    double balance = 0;
    for (var utxo in utxoList) {
      if (utxo['confirmations'] > 1) {
        balance += utxo['amount'];
      }
    }
    return balance;
  }

  saveLocal() async {
    var instance = await SharedPreferences.getInstance();
    instance.setString('nodeUrl', nodeUrl);
    instance.setString('address', address);
    instance.setString('privateKey', privateKey);
    instance.setString('aidAddress', aidAddress);
    instance.setString('storeAddress', storeAddress);
  }

  Wallet(
      {required this.aidAddress,
      required this.nodeUrl,
      required this.address,
      required this.privateKey,
      required this.storeAddress});
}

class WalletBuilder {
  String? address;
  String? privateKey;
  String? aidAddress;
  String? nodeUrl;
  String? storeAddress;

  Wallet build() {
    if (address == null) {
      throw Exception("Address is required");
    }
    if (privateKey == null) {
      throw Exception("Balance is required");
    }
    if (aidAddress == null) {
      throw Exception("Aid address is required");
    }
    if (nodeUrl == null) {
      throw Exception("Node url is required");
    }
    if (storeAddress == null) {
      throw Exception("Store address is required");
    }

    return Wallet(
        address: address!,
        privateKey: privateKey!,
        aidAddress: aidAddress!,
        nodeUrl: nodeUrl!,
        storeAddress: storeAddress!);
  }

  Future<WalletBuilder> fromLocal() async {
    // read from shared preferences
    var instance = await SharedPreferences.getInstance();
    var nodeUrl = instance.getString('nodeUrl');
    var address = instance.getString('address');
    var privateKey = instance.getString('privateKey');
    var aidAddress = instance.getString('aidAddress');
    var storeAddress = instance.getString('storeAddress');
    if (nodeUrl == null ||
        address == null ||
        privateKey == null ||
        aidAddress == null ||
        storeAddress == null) {
      return this;
    }
    this.nodeUrl = nodeUrl;
    this.address = address;
    this.privateKey = privateKey;
    this.aidAddress = aidAddress;
    this.storeAddress = storeAddress;
    return this;
  }

  Future<void> clearLocal() async {
    // read from shared preferences
    var instance = await SharedPreferences.getInstance();
    instance.remove('nodeUrl');
    instance.remove('address');
    instance.remove('privateKey');
    instance.remove('aidAddress');
    instance.remove('storeAddress');
  }

  WalletBuilder setAddress(String address) {
    this.address = address;
    return this;
  }

  WalletBuilder setPrivateKey(String privateKey) {
    this.privateKey = privateKey;
    return this;
  }

  WalletBuilder setAidAddress(String aidAddress) {
    this.aidAddress = aidAddress;
    return this;
  }

  WalletBuilder setNodeUrl(String nodeUrl) {
    this.nodeUrl = nodeUrl;
    return this;
  }

  WalletBuilder setStoreAddress(String storeAddress) {
    this.storeAddress = storeAddress;
    return this;
  }

  bool isWalletExist() {
    return address != null &&
        privateKey != null &&
        aidAddress != null &&
        nodeUrl != null &&
        storeAddress != null;
  }
}
