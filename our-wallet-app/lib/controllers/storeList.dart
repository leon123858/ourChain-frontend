import 'package:flutter/material.dart';
import 'package:our_wallet_app/controllers/store.dart';
import 'package:provider/provider.dart';

import '../services/store/wrapper.dart';
import '../services/wallet/wrapper.dart';
import '../widgets/userProvider.dart';

class StoreList extends StatefulWidget {
  const StoreList({super.key});

  @override
  State<StoreList> createState() => _StoreListState();
}

class _StoreListState extends State<StoreList> {
  List<AbstractStore> list = [];
  Wallet? wallet;

  @override
  void initState() {
    super.initState();
    wallet = Provider.of<UserStateProvider>(context, listen: false).getWallet;
    if (wallet == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('wallet is empty'),
        ),
      );
      throw Exception("wallet is empty");
    }
    // get store list
    getStoreList(wallet!).then((result) {
      if (!context.mounted) return;
      setState(() {
        list = result;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Mall Page"),
      ),
      body: Column(children: [
        Center(
            child: ElevatedButton(
          onPressed: () async {
            var result = await getStoreList(wallet!);
            if (!context.mounted) return;
            setState(() {
              list = result;
            });
          },
          child: const Text("Fetch Store List Information"),
        )),
        const SizedBox(height: 10.0),
        list.isEmpty
            ? const Text('暫無內容, 可嘗試刷新')
            : Expanded(
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
                              icon: const Icon(Icons.wallet_giftcard),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => Store(
                                      id: list[index].aid,
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                        leading: const Icon(Icons.store),
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
