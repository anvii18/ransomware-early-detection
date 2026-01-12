import os

DIR = "honeypots/files"

FILES = [
    "passwords.txt",
    "salary.xlsx",
    "backup.docx",
    "db_dump.sql"
]

def deploy_honeypots():
    os.makedirs(DIR, exist_ok=True)

    for f in FILES:
        path = os.path.join(DIR, f)
        if not os.path.exists(path):
            with open(path, "w") as file:
                file.write("CONFIDENTIAL DATA - DO NOT MODIFY\n")
