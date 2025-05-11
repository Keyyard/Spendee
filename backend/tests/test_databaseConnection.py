import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.dependencies import getPrisma

#test database connection
def test_databaseConenction():
    db = getPrisma()
    assert db is not None
