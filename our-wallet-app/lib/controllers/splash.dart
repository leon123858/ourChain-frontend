import 'package:flutter/material.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';
import 'package:provider/provider.dart';

import '../widgets/userProvider.dart';
import 'config.dart';
import 'login.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Our Wallet'),
      ),
      body: Column(
        children: [
          Center(
            child: ElevatedButton(
              onPressed: () {
                WalletBuilder builder = WalletBuilder();
                builder.fromLocal().then((value) => {
                      if (value.isWalletExist())
                        {
                          // save wallet to provider
                          Provider.of<UserStateProvider>(context, listen: false)
                              .setWallet(value.build()),
                          // push current page with login page
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const Login(
                                title: 'Login',
                              ),
                            ),
                          ),
                        }
                      else
                        {
                          // say use advance config to set wallet
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text(
                                    'Please use advance config to set wallet')),
                          ),
                        }
                    });
              },
              child: const Text("Login"),
            ),
          ),
          Center(
            child: ElevatedButton(
              onPressed: () {
                // push current page with config page
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const Config(),
                  ),
                );
              },
              child: const Text("Wallet Config"),
            ),
          ),
        ],
      ),
    );
  }
}
