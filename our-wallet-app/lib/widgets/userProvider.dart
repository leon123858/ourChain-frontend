import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UserStateProvider extends ChangeNotifier {
  bool isLogin = false;
  String name = '';
  String password = '';

  String get getName => name;

  String get getPassword => password;

  bool get getIsLogin => isLogin;

  void login(String name, String password) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // add a specific key to shared preferences
    prefs.setString("username", name);
    prefs.setString("password", password);
    this.name = name;
    this.password = password;
    isLogin = true;
    notifyListeners();
  }

  void logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // Remove a specific key from shared preferences
    prefs.remove('username');
    prefs.remove('password');
    name = '';
    password = '';
    isLogin = false;
    notifyListeners();
  }
}
