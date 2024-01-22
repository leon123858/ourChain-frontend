import 'package:flutter/material.dart';
import 'package:our_wallet_app/widgets/userProvider.dart';
import 'package:provider/provider.dart';

import '../controllers/coin.dart';
import '../controllers/nft.dart';
import '../services/aid/wrapper.dart';

class CoinList extends StatelessWidget {
  const CoinList({Key? key, required this.list}) : super(key: key);

  final List<String> list;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(children: [
        Padding(
            padding: const EdgeInsets.all(16),
            child: ElevatedButton(
              onPressed: () {
                // goto add coin page
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const Coin(),
                  ),
                );
              },
              child: const Text('Bind new coin'),
            )),
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
                        icon: const Icon(Icons.edit),
                        onPressed: () {
                          // go to transfer page
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => NFT(
                                address: list[index],
                              ),
                            ),
                          );
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () {
                          // get current aid
                          String aid = Provider.of<UserStateProvider>(context,
                                  listen: false)
                              .getAidMetaData("aid");
                          if (aid == '') {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('aid is empty'),
                              ),
                            );
                            return;
                          }
                          // delete coin
                          final result = removeCoin(aid, list[index]);
                          result.then((value) => {
                                if (value)
                                  {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                          content: Text('Delete coin success')),
                                    ),
                                  }
                                else
                                  {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                          content: Text('Delete coin failed')),
                                    ),
                                  }
                              });
                          return;
                        },
                      ),
                    ],
                  ),
                  leading: const Icon(Icons.money),
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
