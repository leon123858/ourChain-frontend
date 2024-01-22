import 'package:flutter/material.dart';
import 'package:our_wallet_app/services/aid/wrapper.dart';
import 'package:provider/provider.dart';

import '../widgets/userProvider.dart';

class Coin extends StatefulWidget {
  const Coin({super.key});

  @override
  State<Coin> createState() => _CoinState();
}

class _CoinState extends State<Coin> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController addressController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("add your coin by address"),
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
                  controller: addressController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "Address"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your coin address';
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
                        // get provider aid
                        String aid = Provider.of<UserStateProvider>(context,
                                listen: false)
                            .getAidMetaData("aid");
                        if (aid == "") {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Please login first')),
                          );
                          return;
                        }
                        // add coin
                        final result = addCoin(aid, addressController.text);
                        result.then((value) => {
                              if (value)
                                {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text('Add coin success')),
                                  ),
                                }
                              else
                                {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text('Add coin failed')),
                                  ),
                                }
                            });
                        return;
                      }
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Please fill input')),
                      );
                    },
                    child: const Text('Submit'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
