import 'package:flutter/material.dart';
import 'package:our_wallet_app/widgets/userProvider.dart';
import 'package:provider/provider.dart';

import '../services/wallet/wrapper.dart';

class OurCoins extends StatefulWidget {
  const OurCoins({Key? key}) : super(key: key);

  @override
  State<OurCoins> createState() => _OurCoinsState();
}

class _OurCoinsState extends State<OurCoins> {
  double _ourCoin = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          border: Border.fromBorderSide(
            BorderSide(
              color: Colors.black,
              width: 2,
            ),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              child: const Text("OurCoin: "),
            ),
            Container(
              padding: const EdgeInsets.all(8),
              child: Text(
                "$_ourCoin",
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: () async {
                // get current wallet
                Wallet? wallet =
                    Provider.of<UserStateProvider>(context, listen: false)
                        .getWallet;
                if (wallet == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Please create wallet first'),
                    ),
                  );
                  return;
                }
                // get balance
                var balance = await wallet.getBalance();
                setState(() {
                  _ourCoin = balance;
                });
              },
            ),
          ],
        ));
  }
}
