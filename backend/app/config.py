import os
from clerk_backend_api import Clerk

CLERK_PUBLIC_KEY = os.getenv("CLERK_PUBLIC_KEY")
clerk = Clerk(bearer_auth=CLERK_PUBLIC_KEY)