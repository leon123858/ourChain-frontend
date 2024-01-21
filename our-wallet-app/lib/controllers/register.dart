import 'package:flutter/material.dart';
import 'package:our_wallet_app/services/aid/wrapper.dart';
import 'package:provider/provider.dart';

import '../widgets/userProvider.dart';

class Register extends StatefulWidget {
  const Register({super.key, required this.title});

  final String title;

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: nameController,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "Name"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your name';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextFormField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: "Password"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your password';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16.0),
                child: Center(
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        // get provider wallet
                        var wallet = Provider.of<UserStateProvider>(context,
                                listen: false)
                            .getWallet;
                        if (wallet == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Please create wallet')),
                          );
                          return;
                        }
                        register(nameController.text, passwordController.text,
                                wallet)
                            .then((value) {
                          if (!value) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('registerNewUser Send Error!')),
                            );
                            return;
                          }
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('registerNewUser Send!')),
                          );
                          Navigator.pop(context);
                          return;
                        });
                        return;
                      }
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Please fill input')),
                      );
                    },
                    child: const Text('Submit'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
