import 'package:shared_preferences/shared_preferences.dart';

class Wallet {
  final String address;
  final String privateKey;

  String getAddress() {
    return address;
  }
  String getPrivateKey() {
    return privateKey;
  }

  saveWalletString() async {
    var instance = await SharedPreferences.getInstance();
    instance.setString('walletString', '$address:$privateKey');
  }

  Wallet({required this.address, required this.privateKey});
}

class WalletBuilder {
  String? address;
  String? privateKey;

  Wallet build() {
    if (address == null) {
      throw Exception("Address is required");
    }
    if (privateKey == null) {
      throw Exception("Balance is required");
    }
    return Wallet(address: address!, privateKey: privateKey!);
  }

  Future<String> getDiskString() async {
    // read from shared preferences
    var instance = await SharedPreferences.getInstance();
    var walletString = instance.getString('walletString');
    if (walletString == null) {
      return "";
    }
    return walletString;
  }

  WalletBuilder fromString(String string) {
    final parts = string.split(':');
    if (parts.length != 2) {
      throw Exception("Invalid string");
    }
    address = parts[0];
    privateKey = parts[1];
    return this;
  }

  WalletBuilder setAddress(String address) {
    this.address = address;
    return this;
  }

  WalletBuilder setPrivateKey(String privateKey) {
    this.privateKey = privateKey;
    return this;
  }
}
