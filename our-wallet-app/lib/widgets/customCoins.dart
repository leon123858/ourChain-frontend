import 'package:flutter/material.dart';
import 'package:our_wallet_app/widgets/coinList.dart';
import 'package:our_wallet_app/widgets/userProvider.dart';
import 'package:provider/provider.dart';

import '../services/aid/wrapper.dart';
import '../services/wallet/wrapper.dart';

class CustomCoins extends StatefulWidget {
  const CustomCoins({super.key});

  @override
  State<StatefulWidget> createState() => CustomCoinsState();
}

class CustomCoinsState extends State<CustomCoins> {
  List<String> _coinList = [];

  @override
  Widget build(BuildContext context) {
    // get current aid
    String aid = Provider.of<UserStateProvider>(context, listen: false)
        .getAidMetaData("aid");
    if (aid == '') {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('aid is empty'),
        ),
      );
      throw Exception("aid is empty");
    }
    // get current wallet
    Wallet? wallet =
        Provider.of<UserStateProvider>(context, listen: false).wallet;
    if (wallet == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('wallet is empty'),
        ),
      );
      throw Exception("wallet is empty");
    }
    // get coin list
    getCoinList(aid, wallet).then((result) {
      setState(() {
        _coinList = result;
      });
    });
    return DefaultTabController(
      length: 1,
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Coins Operations"),
              IconButton(
                  icon: const Icon(Icons.refresh),
                  onPressed: () async {
                    // get coin list
                    try {
                      var coinList = await getCoinList(aid, wallet);
                      setState(() {
                        _coinList = coinList;
                      });
                      if (!context.mounted) return;
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('get coin list success'),
                        ),
                      );
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('get coin list failed'),
                        ),
                      );
                    }
                  }),
            ],
          ),
          Container(
            constraints: const BoxConstraints(maxHeight: 150.0),
            child: const TabBar(
              tabs: [
                Tab(icon: Icon(Icons.settings)),
              ],
            ),
          ),
          SizedBox(
            height: 500,
            child: TabBarView(
              children: [
                CoinList(list: _coinList),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
