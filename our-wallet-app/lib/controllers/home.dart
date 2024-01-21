import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/userProvider.dart';
import 'login.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
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
                  // logout from provider
                  Provider.of<UserStateProvider>(context, listen: false)
                      .logout();
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
                child: const Text("Logout"),
              ),
            ),
          ],
        ));
  }
}
