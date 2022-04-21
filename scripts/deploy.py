from brownie import Transactions,  HealthRecords, accounts, network


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # add these accounts to metamask by importing private key
        owner = accounts[0]
        
        Transactions.deploy({"from":accounts[0]})
        HealthRecords.deploy({"from": accounts[0]})

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        
        # HealthRecords.d
        
        