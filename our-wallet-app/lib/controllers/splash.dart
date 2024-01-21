import 'package:flutter/material.dart';
import 'package:our_wallet_app/services/wallet/wrapper.dart';
import 'package:our_wallet_app/utils/config.dart';
import 'package:provider/provider.dart';

import '../widgets/userProvider.dart';
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
                builder.setAddress(defaultPublicKey);
                builder.setPrivateKey(defaultPrivateKey);
                // save to provider
                Provider.of<UserStateProvider>(context, listen: false)
                    .setWallet(builder.build());
                // replace current page with login page
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const Login(
                      title: 'Login',
                    ),
                  ),
                );
              },
              child: const Text("Login"),
            ),
          ),
        ],
      ),
    );
  }
}
