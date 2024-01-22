import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../services/orc20/wrapper.dart';
import '../widgets/userProvider.dart';

class NFT extends StatefulWidget {
  const NFT({super.key, required this.address});

  final String address;

  @override
  State<NFT> createState() => _NFTState();
}

class _NFTState extends State<NFT> {
  List<NFTItem> list = [];
  final _formKey = GlobalKey<FormState>();
  TextEditingController targetAidController = TextEditingController();
  TextEditingController countController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("setting your NFT here"),
      ),
      body: Column(
        children: [
          Center(
            child: ElevatedButton(
              onPressed: () {
                // get coin list
                getNFTList(widget.address)
                    .then((coinList) => {
                          setState(() {
                            list = coinList;
                          }),
                        })
                    .catchError((e) => {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('get coin list unexpected failed'),
                            ),
                          ),
                        });
              },
              child: const Text("Fetch NFT"),
            ),
          ),
          Form(
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
                      controller: targetAidController,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: "transfer to aid"),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your target aid';
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
                          border: OutlineInputBorder(),
                          labelText: "coin count"),
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
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                    child: TextFormField(
                      controller: passwordController,
                      obscureText: true,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(), labelText: "Password"),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your password';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 8, vertical: 16.0),
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
                                const SnackBar(
                                    content: Text('Please login first')),
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
                                    content: Text('wallet is empty')),
                              );
                              return;
                            }
                            // parse int
                            int? count = int.tryParse(countController.text);
                            if (count == null) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Please enter a number'),
                                ),
                              );
                              return;
                            }
                            // transfer
                            transferNFT(
                                    widget.address,
                                    aid,
                                    targetAidController.text,
                                    count,
                                    passwordController.text,
                                    wallet)
                                .then((value) => {
                                      if (value)
                                        {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(
                                            const SnackBar(
                                                content:
                                                    Text('Transfer success')),
                                          ),
                                        }
                                      else
                                        {
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(
                                            const SnackBar(
                                                content:
                                                    Text('Transfer failed')),
                                          ),
                                        }
                                    });
                            return;
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Please fill input'),
                              ),
                            );
                          }
                        },
                        child: const Text('Transfer'),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: list.length,
              itemBuilder: (context, index) {
                return Container(
                  margin: const EdgeInsets.all(20),
                  decoration: const BoxDecoration(
                    border: Border.fromBorderSide(
                      BorderSide(
                        color: Colors.black,
                        width: 2,
                      ),
                    ),
                  ),
                  child: ListTile(
                    // add multiple buttons in trailing
                    trailing: Text(list[index].owner.toString()),
                    leading: Text(list[index].coinName.toString()),
                    title: Text(list[index].id.toString()),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
