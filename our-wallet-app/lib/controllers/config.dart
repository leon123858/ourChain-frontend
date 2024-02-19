import 'package:flutter/material.dart';
import 'package:our_wallet_app/utils/config.dart';

import '../services/wallet/wrapper.dart';

class Config extends StatefulWidget {
  const Config({super.key});

  @override
  State<Config> createState() => _ConfigState();
}

class _ConfigState extends State<Config> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nodeUrlController = TextEditingController();
  TextEditingController aidAddressController = TextEditingController();
  TextEditingController storeAddressController = TextEditingController();
  TextEditingController publicKeyController = TextEditingController();
  TextEditingController privateKeyController = TextEditingController();

  @override
  void initState() {
    super.initState();
    Wallet tmp;
    WalletBuilder().fromLocal().then((value) => {
      if (value.isWalletExist())
        {
          tmp = value.build(),
          nodeUrlController.text = tmp.getNodeUrl(),
          aidAddressController.text = tmp.getAidAddress(),
          storeAddressController.text = tmp.getStoreAddress(),
          publicKeyController.text = tmp.getAddress(),
          privateKeyController.text = tmp.getPrivateKey(),
        }
      else
        {
          nodeUrlController.text = baseUrl,
          aidAddressController.text = aidAddress,
          storeAddressController.text = storeAddress,
          publicKeyController.text = defaultPublicKey,
          privateKeyController.text = defaultPrivateKey,
        }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("set your wallet config"),
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: nodeUrlController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "node url"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your node url';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: aidAddressController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "aid contract address"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your aid contract address';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: storeAddressController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: "store contract address"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your store contract address';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: publicKeyController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "public key"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your public key';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: privateKeyController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "private key"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your private key';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16.0),
                child: Center(
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        WalletBuilder()
                            .setAddress(publicKeyController.text)
                            .setPrivateKey(privateKeyController.text)
                            .setAidAddress(aidAddressController.text)
                            .setNodeUrl(nodeUrlController.text)
                            .setStoreAddress(storeAddressController.text)
                            .build()
                            .saveLocal()
                            .then((value) => {
                                  // say config OK
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(content: Text('Config OK')),
                                  ),
                                });
                        return;
                      }
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Please fill input')),
                      );
                    },
                    child: const Text('Confirm'),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 16.0),
                child: Center(
                  child: ElevatedButton(
                    onPressed: () {
                      WalletBuilder().clearLocal().then((value) => {
                            // say config OK
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Config OK')),
                            ),
                          });
                      return;
                    },
                    child: const Text('Clear Wallet'),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
