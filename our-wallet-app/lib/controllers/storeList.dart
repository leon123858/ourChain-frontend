import 'package:flutter/material.dart';
import 'package:our_wallet_app/controllers/store.dart';

class StoreList extends StatefulWidget {
  const StoreList({super.key});

  @override
  State<StoreList> createState() => _StoreListState();
}

class _StoreListState extends State<StoreList> {
  List<String> list = ["store1", "store2", "store3"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("setting your Store here"),
      ),
      body: Column(children: [
        Center(
            child: ElevatedButton(
          onPressed: () {},
          child: const Text("Fetch Store List Information"),
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
                        icon: const Icon(Icons.wallet_giftcard),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const Store(),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                  leading: const Icon(Icons.store),
                  title: Text(list[index]),
                ),
              );
            },
          ),
        ),
      ]),
    );
  }
}
