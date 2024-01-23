import 'package:flutter/material.dart';
import 'package:our_wallet_app/services/aid/wrapper.dart';
import 'package:our_wallet_app/services/orc20/wrapper.dart';
import 'package:provider/provider.dart';

import '../widgets/userProvider.dart';

class NewNFT extends StatefulWidget {
  const NewNFT({super.key});

  @override
  State<NewNFT> createState() => _NewNFTState();
}

class _NewNFTState extends State<NewNFT> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nameController = TextEditingController();
  TextEditingController countController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("create your own coin"),
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
                  controller: nameController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "coin name"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your coin name';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  keyboardType: TextInputType.number,
                  controller: countController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "coin count"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your coin count';
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
                        // get wallet
                        var wallet = Provider.of<UserStateProvider>(context,
                                listen: false)
                            .getWallet;
                        if (wallet == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Please create wallet')),
                          );
                          return;
                        }
                        // parse int
                        int? count = int.tryParse(countController.text);
                        if (count == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Please enter number')),
                          );
                          return;
                        }
                        // add coin
                        final result =
                            createNFT(nameController.text, count, aid, wallet);
                        result.then((value) => {
                              if (value != null)
                                {
                                  // add coin success
                                  addCoin(aid, value, wallet).then((value) => {
                                        if (value)
                                          {
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(
                                              const SnackBar(
                                                  content:
                                                      Text('Add coin success')),
                                            ),
                                          }
                                        else
                                          {
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(
                                              const SnackBar(
                                                  content:
                                                      Text('Add coin failed')),
                                            ),
                                          }
                                      }),
                                }
                              else
                                {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text('create coin failed')),
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
