import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/store/wrapper.dart';
import '../widgets/userProvider.dart';

class MyStore extends StatefulWidget {
  const MyStore({super.key, required this.userAid});

  final String userAid;

  @override
  State<MyStore> createState() => _MyStoreState();
}

class _MyStoreState extends State<MyStore> {
  final _formKey1 = GlobalKey<FormState>();
  final _formKey2 = GlobalKey<FormState>();
  StoreWrapper? storeWrapper;
  var passwordInput = TextEditingController();
  var storeNameInput = TextEditingController();
  var productNameInput = TextEditingController();
  var productPriceInput = TextEditingController();
  var productAddressInput = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var wallet =
        Provider.of<UserStateProvider>(context, listen: false).getWallet;
    if (wallet == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('wallet is empty'),
        ),
      );
      throw Exception("wallet is empty");
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text("setting your Store here"),
      ),
      body: Column(children: [
        Center(
            child: ElevatedButton(
          onPressed: () async {
            storeWrapper = await StoreWrapper.create(wallet, widget.userAid);
            if (!context.mounted) return;
            if (storeWrapper!.name == "") {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('store not exist'),
                ),
              );
              return;
            }
            var storeName = storeWrapper?.name;
            setState(() {
              storeNameInput.text = storeName ?? "";
            });
          },
          child: const Text("Fetch Store Information"),
        )),
        const SizedBox(height: 1.0),
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.black,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Form(
            key: _formKey1,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: TextFormField(
                    controller: storeNameInput,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(), labelText: "Store Name"),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your Store Name';
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: TextFormField(
                    controller: passwordInput,
                    obscureText: true,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(), labelText: "password"),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your password';
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8.0),
                  child: Center(
                    child: ElevatedButton(
                      onPressed: () async {
                        // check valid data input
                        if (_formKey1.currentState!.validate()) {
                          final result = await storeWrapper!.setStoreInfo(
                              wallet, storeNameInput.text, passwordInput.text);
                          if (!context.mounted) return;
                          if (result) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('store set successfully'),
                              ),
                            );
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('store set failed'),
                              ),
                            );
                          }
                        }
                      },
                      child: const Text("Set Store"),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 1.0),
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.black,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Form(
            key: _formKey2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: TextFormField(
                    controller: productNameInput,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: "product Name"),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your product Name';
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: TextFormField(
                    controller: productPriceInput,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: "product Price"),
                    validator: (value) {
                      // check if the input is a number
                      if (double.tryParse(value!) == null) {
                        return 'Please enter a valid number';
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: TextFormField(
                    controller: productAddressInput,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: "product Address"),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your product Address';
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: TextFormField(
                    controller: passwordInput,
                    obscureText: true,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(), labelText: "password"),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your password';
                      }
                      return null;
                    },
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8.0),
                  child: Center(
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey2.currentState!.validate()) {
                          int price = int.parse(productPriceInput.text);
                          storeWrapper ??=
                              await StoreWrapper.create(wallet, widget.userAid);
                          final result = await storeWrapper!.addProduct(
                              wallet,
                              productNameInput.text,
                              passwordInput.text,
                              price,
                              productAddressInput.text);
                          if (!context.mounted) return;
                          if (result) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('product added successfully'),
                              ),
                            );
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('product added failed'),
                              ),
                            );
                          }
                        }
                      },
                      child: const Text("Restock Store"),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ]),
    );
  }
}
