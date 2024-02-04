import 'package:flutter/material.dart';
import 'package:our_wallet_app/services/store/wrapper.dart';
import 'package:provider/provider.dart';

import '../services/aid/wrapper.dart';
import '../services/wallet/wrapper.dart';
import '../widgets/userProvider.dart';

class Store extends StatefulWidget {
  const Store({super.key, required this.id});

  final String id;

  @override
  State<Store> createState() => _StoreState();
}

class _StoreState extends State<Store> {
  List<AbstractProduct> list = [];
  StoreWrapper? storeWrapper;
  Wallet? wallet;
  String? userPassword;
  String? userAid;

  @override
  Widget build(BuildContext context) {
    wallet = Provider.of<UserStateProvider>(context, listen: false).getWallet;
    if (wallet == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('wallet is empty'),
        ),
      );
      throw Exception("wallet is empty");
    }
    userPassword =
        Provider.of<UserStateProvider>(context, listen: false).password;
    userAid = Provider.of<UserStateProvider>(context, listen: false).getAidMetaData("aid");

    return Scaffold(
      appBar: AppBar(
        title: const Text("Store Page"),
      ),
      body: Column(children: [
        Center(
            child: ElevatedButton(
          onPressed: () async {
            var result = await getProductList(wallet!, widget.id);
            if (!context.mounted) return;
            setState(() {
              list = result;
            });
          },
          child: const Text("Fetch Store Product Information"),
        )),
        const SizedBox(height: 10.0),
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
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.add_circle_outline_rounded),
                        onPressed: () async {
                          // buy product
                          // 用 coin 買 address => address 轉入 , coin 轉出
                          final resultIn = await buyCoin(list[index].address, widget.id,userAid!, 1 ,wallet!);
                          final resultOut = await buyCoin(list[index].coin, userAid!, widget.id, list[index].price, wallet!);
                          final result = resultIn && resultOut;

                          if (!context.mounted) return;
                          if (result) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('product bought'),
                              ),
                            );
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('product not bought'),
                              ),
                            );
                          }
                        },
                      ),
                      IconButton(
                        color: Colors.red,
                        icon: const Icon(Icons.delete),
                        onPressed: () async {
                          // delete product
                          storeWrapper ??=
                              await StoreWrapper.create(wallet!, widget.id);
                          var result = await storeWrapper!.removeProduct(
                              wallet!, userPassword!, list[index].name);
                          if (!context.mounted) return;
                          if (result) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('product removed'),
                              ),
                            );
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('product not removed'),
                              ),
                            );
                          }
                        },
                      ),
                    ],
                  ),
                  leading: const Icon(Icons.book),
                  title: Text(list[index].name),
                ),
              );
            },
          ),
        ),
      ]),
    );
  }
}
