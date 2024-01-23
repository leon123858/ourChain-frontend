import 'basic.dart';

Future<String> sendMoney(
    {double fee = 0.0001,
    String targetAddress = "",
    String privateKey = "",
    String ownerAddress = "",
    required String nodeUrl}) async {
  final rawTx = await createTx(
      fee: fee,
      targetAddress: targetAddress,
      ownerAddress: ownerAddress,
      contract: {'action': 0, 'code': '', 'address': '', 'args': []},
      nodeUrl: nodeUrl);
  if (rawTx == null) {
    throw Exception('Error: no rawTx available');
  }
  final signedTx = await signContract(
      rawTx: rawTx['hex'], privateKey: privateKey, nodeUrl: nodeUrl);
  if (signedTx == null) {
    throw Exception('Error: no signedTx available');
  }
  final txid = await sendTx(signedTx: signedTx, nodeUrl: nodeUrl);
  if (txid == null) {
    throw Exception('Error: no txid available');
  }
  return txid;
}
