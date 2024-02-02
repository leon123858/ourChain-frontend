/*
Leon Lin in Lab408, NTU CSIE, 2023/12/31

ORC20 Contract Implementation
(ERC20 Compatible)

FUNCTIONS
PURE:totalSupply()
// Returns the amount of tokens in existence.
PURE:balanceOf(account)
// Returns the amount of tokens owned by account.
transfer(recipient, amount)
// Moves amount tokens from the caller’s account to recipient.
PURE:allowance(owner, spender)
// Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom. This is zero by default.
approve(spender, amount)
// Sets amount as the allowance of spender over the caller’s tokens.
transferFrom(sender, recipient, amount)
// Moves amount tokens from sender to recipient using the allowance mechanism. amount is then deducted from the caller’s allowance.

COMMENTS
approve, transferFrom, allowance 用來花費別人的 TOKEN

*/
#include <ourcontract.h>
#include <iostream>
#include <json.hpp>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

using json = nlohmann::json;

enum Command
{
  totalSupply,
  balanceOf,
  transfer,
  allowance,
  approve,
  transferFrom
};

static std::unordered_map<std::string, Command> const string2Command = {{"totalSupply", Command::totalSupply}, {"balanceOf", Command::balanceOf}, {"transfer", Command::transfer}, {"allowance", Command::allowance}, {"approve", Command::approve}, {"transferFrom", Command::transferFrom}};
static std::string aidContractAddress = "";

/**
 * Utils
 */

char *getDynamicString(const char *str)
{
  char *ret = (char *)malloc(sizeof(char) * strlen(str));
  strcpy(ret, str);
  return ret;
}

void removeDynamicStrings(char **argv)
{
  for (int i = 0; i < 4; i++)
  {
    delete[] argv[i];
  }
  delete[] argv;
}

bool verifyUser(std::string aid, std::string password)
{
  // check if aid is valid
  char **subArgv = (char **)malloc(sizeof(char *) * 4);
  // put aidContractAddress into argv[0]
  subArgv[0] = getDynamicString(aidContractAddress.c_str());
  subArgv[1] = getDynamicString("verify");
  subArgv[2] = getDynamicString(aid.c_str());
  subArgv[3] = getDynamicString(password.c_str());
  int ret = call_contract(aidContractAddress.c_str(), 4, subArgv);
  removeDynamicStrings(subArgv);
  if (ret != 0)
  {
    std::cerr << "aid contract exe error" << std::endl;
    return false;
  }
  json verifyResponse = pre_state_read();
  if (!verifyResponse["isExist"].get<bool>())
  {
    std::cerr << "aid not exist" << std::endl;
    return false;
  }
  if (!verifyResponse["result"].get<bool>())
  {
    std::cerr << "aid password error" << std::endl;
    return false;
  }
  return true;
}

/**
 * Data Structure
 */

struct coin
{
  int id;
  std::string owner;
};

struct orc20
{
  std::string aidAddress;
  std::string coinName;
  std::vector<coin> coins;
};

void to_json(json &j, const coin &p)
{
  j = json{{"id", p.id}, {"owner", p.owner}};
}

void from_json(const json &j, coin &p)
{
  j.at("id").get_to(p.id);
  j.at("owner").get_to(p.owner);
}

void to_json(json &j, const orc20 &p)
{
  j = json{{"aidAddress", p.aidAddress}, {"coinName", p.coinName}, {"coins", p.coins}};
}

void from_json(const json &j, orc20 &p)
{
  j.at("aidAddress").get_to(p.aidAddress);
  j.at("coinName").get_to(p.coinName);
  j.at("coins").get_to(p.coins);
}

/**
 * Main
 */
extern "C" int contract_main(int argc, char **argv)
{
  // init state
  if (!state_exist())
  {
    orc20 newOrc20;
    newOrc20.coinName = argv[1];
    int count = atoi(argv[2]);
    std::string aid = argv[3];
    newOrc20.aidAddress = argv[4];
    for (int i = 0; i < count; i++)
    {
      coin newCoin = coin{i + 1, aid};
      newOrc20.coins.push_back(newCoin);
    }
    state_write(newOrc20);
    return 0;
  }
  // execute command
  if (argc == 1)
  {
    std::cerr << "argc error" << std::endl;
    return 0;
  }
  std::string command = argv[1];
  auto eCommand = string2Command.find(command);
  if (eCommand == string2Command.end())
  {
    std::cerr << "command error" << std::endl;
    return 0;
  }
  switch (eCommand->second)
  {
  case Command::totalSupply:
    if (check_runtime_can_write_db())
    {
      return 0;
    }
    {
      orc20 curOrc20 = state_read();
      json j = json::array();
      for (auto &it : curOrc20.coins)
      {
        json tmp = json::object();
        tmp["id"] = it.id;
        tmp["owner"] = it.owner;
        tmp["coinName"] = curOrc20.coinName;
        j.push_back(tmp);
      }
      state_write(j);
    }
    break;
  case Command::balanceOf:
    if (check_runtime_can_write_db())
    {
      return 0;
    }
    {
      std::string aid = argv[2];
      orc20 curOrc20 = state_read();
      json j = json::array();
      for (auto &it : curOrc20.coins)
      {
        if (it.owner == aid)
        {
          json tmp = json::object();
          tmp["id"] = it.id;
          tmp["owner"] = it.owner;
          tmp["coinName"] = curOrc20.coinName;
          j.push_back(tmp);
        }
      }
      state_write(j);
    }
    break;
  case Command::transfer:
    if (!check_runtime_can_write_db())
    {
      return 0;
    }
    {
      // get argv
      std::string aid = argv[2];
      std::string targetAid = argv[3];
      int count = atoi(argv[4]);
      std::string password = argv[5];
      orc20 curOrc20 = state_read();
      aidContractAddress = curOrc20.aidAddress;
      if (!verifyUser(aid, password))
      {
        return 0;
      }
      // check if aid has enough coins
      int aidCount = 0;
      for (auto &it : curOrc20.coins)
      {
        if (it.owner == aid)
        {
          aidCount++;
        }
      }
      if (aidCount < count)
      {
        std::cerr << "aid has not enough coins" << std::endl;
        return 0;
      }
      // transfer coins
      for (auto &it : curOrc20.coins)
      {
        if (it.owner == aid)
        {
          it.owner = targetAid;
          count--;
        }
        if (count == 0)
        {
          break;
        }
      }
      state_write(curOrc20);
    }
    break;
  case Command::allowance:
    if (!check_runtime_can_write_db())
    {
      return 0;
    }
    std::cerr << "allowance not implemented" << std::endl;
    break;
  case Command::approve:
    if (!check_runtime_can_write_db())
    {
      return 0;
    }
    std::cerr << "approve not implemented" << std::endl;
    break;
  case Command::transferFrom:
    if (!check_runtime_can_write_db())
    {
      return 0;
    }
    {
      std::string aid = argv[2];
      std::string targetAid = argv[3];
      int count = atoi(argv[4]);
      orc20 curOrc20 = state_read();
      // check if aid has enough coins
      int aidCount = 0;
      for (auto &it : curOrc20.coins)
      {
        if (it.owner == aid)
        {
          aidCount++;
        }
      }
      if (aidCount < count)
      {
        std::cerr << "aid has not enough coins" << std::endl;
        return 0;
      }
      // transfer coins
      for (auto &it : curOrc20.coins)
      {
        if (it.owner == aid)
        {
          it.owner = targetAid;
          count--;
        }
        if (count == 0)
        {
          break;
        }
      }
      state_write(curOrc20);
    }
    break;
  default:
    break;
  }
  return 0;
}