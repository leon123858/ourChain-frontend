import 'package:flutter/material.dart';

class Store extends StatefulWidget {
  const Store({super.key});

  @override
  State<Store> createState() => _StoreState();
}

class _StoreState extends State<Store> {
  List<String> list = ["product1", "product2", "product3"];

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
                        onPressed: () {},
                      ),
                      IconButton(
                        color: Colors.red,
                        icon: const Icon(Icons.delete),
                        onPressed: () {},
                      ),
                    ],
                  ),
                  leading: const Icon(Icons.book),
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
