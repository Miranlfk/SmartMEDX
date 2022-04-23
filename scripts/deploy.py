from brownie import HealthRecords, accounts, network


def main():
    # requires brownie account to have been created
    if network.show_active() == "development":
        # adding these accounts to metamask by importing private key
        HealthRecords.deploy({"from": accounts[0]})

    elif network.show_active() == "kovan":
        # add these accounts to metamask by importing private key
        owner = accounts.load("main")
        
        # HealthRecords.d
        
        