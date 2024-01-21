import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:our_wallet_app/controllers/home.dart';
import 'package:our_wallet_app/controllers/register.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/chain/contract.dart';
import '../widgets/userProvider.dart';

class Login extends StatefulWidget {
  const Login({super.key, required this.title});

  final String title;

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  _tryLoginAID(String name, String password) async {
    String? result = await getContractMessage(
      targetAddress: "cbdce22b0a836221a1aababf11aab5892c27cb18adb97165b0b6d0b63d826c00",
      args: ["login", name, password],
    );
    if (result == null) {
      return false;
    }
    // convert result to json
    var resultJson = jsonDecode(result);
    // check if result is success
    if (resultJson['isExist'] == true) {
      return true;
    }
    return false;
  }

  _loginProcess() {
    BuildContext currentContext = context;
    _tryLoginAID(nameController.text, passwordController.text).then((result) {
      if (result) {
        // save to shared preferences
        SharedPreferences.getInstance().then((prefs) {
          prefs.setString('username', nameController.text);
          prefs.setString('password', passwordController.text);
        });
        // save to provider
        Provider.of<UserStateProvider>(currentContext, listen: false)
            .login(nameController.text, passwordController.text);
        // Navigate replace current page with home page
        Navigator.pushReplacement(
          currentContext,
          MaterialPageRoute(
            builder: (context) => const HomePage(),
          ),
        );
      } else {
        ScaffoldMessenger.of(currentContext).showSnackBar(
          const SnackBar(content: Text('Invalid Credentials')),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // get username and password from shared preferences
    SharedPreferences.getInstance().then((prefs) {
      String? username = prefs.getString('username');
      String? password = prefs.getString('password');
      if (username != null && password != null) {
        // set value to the text field
        nameController.text = username;
        passwordController.text = password;
        // press form submit button
        _loginProcess();
      }
    });
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
                        // Navigate the user to the Home page
                        _loginProcess();
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Please fill input')),
                        );
                      }
                    },
                    child: const Text('Submit'),
                  ),
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () {
                        // Navigate the user to the registration page
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Register(
                                  title: "Register new account")),
                        );
                      },
                      child: const Text('Register'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
