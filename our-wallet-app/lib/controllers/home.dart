import 'package:flutter/material.dart';
import 'package:our_wallet_app/controllers/newNFT.dart';
import 'package:our_wallet_app/widgets/ourCoins.dart';
import 'package:provider/provider.dart';

import '../widgets/customCoins.dart';
import '../widgets/userProvider.dart';
import 'login.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  String _userName = "";
  String _aid = "";

  @override
  Widget build(BuildContext context) {
    _userName = Provider.of<UserStateProvider>(context, listen: true).getName;
    _aid = Provider.of<UserStateProvider>(context, listen: true)
        .getAidMetaData("aid");
    return Scaffold(
      appBar: AppBar(
        title: const Text('Our Wallet'),
      ),
      body: Column(
        children: [
          Center(
            child: Text("Welcome $_userName for using Our Wallet"),
          ),
          const Center(
            child: OurCoins(),
          ),
          const Center(
            child: CustomCoins(),
          ),
        ],
      ),
      drawer: Drawer(
        child: Column(
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(
                color: Colors.lightBlueAccent,
              ),
              child: ListView(
                children: <Widget>[
                  const Text(
                    'User Info',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                    ),
                  ),
                  Text(
                    "User ID: $_userName",
                    style: const TextStyle(
                      color: Colors.black,
                    ),
                  ),
                  Text(
                    "AID:\n$_aid",
                    style: const TextStyle(
                      color: Colors.white70,
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
                title: const Text('generate coin (orc20)'),
                onTap: () {
                  // goto add coin page
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const NewNFT(),
                    ),
                  );
                }),
            ListTile(
              title: const Text('Logout'),
              onTap: () {
                // logout from provider
                Provider.of<UserStateProvider>(context, listen: false).logout();
                // replace current page with splash page
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const Login(
                      title: 'Login',
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
