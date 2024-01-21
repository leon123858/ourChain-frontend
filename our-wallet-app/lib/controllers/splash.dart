import 'package:flutter/material.dart';

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
