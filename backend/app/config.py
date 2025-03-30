import os
from clerk_backend_api import Clerk

CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
clerk = Clerk(bearer_auth=CLERK_SECRET_KEY)
