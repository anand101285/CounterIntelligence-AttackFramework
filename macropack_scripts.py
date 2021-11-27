import subprocess
import os

cwd = os.getcwd()
a = subprocess.run([cwd+'\\executable_scripts\\macro_pack.exe','--listtemplates'])
print(a)


