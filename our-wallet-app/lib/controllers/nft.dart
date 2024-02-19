import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';
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

  Wallet? wallet;
  String aid = "";

  @override
  void initState() {
    super.initState();
    wallet =
        Provider.of<UserStateProvider>(context, listen: false).getWallet;
    if (wallet == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('wallet is empty'),
        ),
      );
      throw Exception("wallet is empty");
    }
    aid = Provider.of<UserStateProvider>(context, listen: false)
        .getAidMetaData("aid");
    if (aid == "") {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please login first')),
      );
      throw Exception("aid is empty");
    }
    getNFTList(widget.address, wallet!.getNodeUrl()).then((result) {
      setState(() {
        list = result;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("setting your NFT here"),
      ),
      body: Column(
        children: [
          Center(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () async {
                  // get coin list
                  try {
                    var result =
                        await getNFTList(widget.address, wallet!.getNodeUrl());
                    setState(() {
                      list = result;
                    });
                    return;
                  } catch (e) {
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('get coin list unexpected failed'),
                      ),
                    );
                  }
                },
                child: const Text("Fetch NFT"),
              ),
              IconButton(
                  onPressed: () {
                    // copy aid to clipboard
                    Clipboard.setData(ClipboardData(text: widget.address));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('aid is copied to clipboard'),
                      ),
                    );
                  },
                  icon: const Icon(Icons.copy))
            ],
          )),
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
                        int? count = int.tryParse(countController.text);
                        if (count == null) {
                          return 'Please enter a number';
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
                        onPressed: () async {
                          if (_formKey.currentState!.validate()) {
                            // parse int
                            int? count = int.tryParse(countController.text);
                            // transfer
                            var result = await transferNFT(
                                widget.address,
                                aid,
                                targetAidController.text,
                                count!,
                                passwordController.text,
                                wallet!);
                            if (!context.mounted) return;
                            if (result) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Transfer success'),
                                ),
                              );
                              return;
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Transfer failed'),
                                ),
                              );
                            }
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
          list.isEmpty
              ? const Text('暫無內容, 可嘗試刷新')
              : Expanded(
                  child: ListView.builder(
                    itemCount: list.length,
                    itemBuilder: (context, index) {
                      String aid =
                          Provider.of<UserStateProvider>(context, listen: false)
                              .getAidMetaData("aid");
                      if (aid == list[index].owner) {
                        return Container(
                          margin: const EdgeInsets.all(20),
                          decoration: const BoxDecoration(
                            border: Border.fromBorderSide(
                              BorderSide(
                                color: Colors.red,
                                width: 2,
                              ),
                            ),
                          ),
                          child: ListTile(
                            // add multiple buttons in trailing
                            trailing: const Text("Owner of this NFT is you"),
                            leading: Text(list[index].coinName.toString()),
                            title: Text(list[index].id.toString()),
                          ),
                        );
                      }
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
