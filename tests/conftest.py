import pytest


@pytest.fixture(autouse=True)
def setup(module_isolation):
    """
    Isolation setup fixture.
    This ensures that each test runs against the same base environment.
    """
    pass

@pytest.fixture()
def healthNtransactionrecords(accounts, HealthRecords):
    """
    Yield a `Contract` object for the HealthRecords contract.
    """
    yield accounts[0].deploy(HealthRecords)
