import subprocess
import os
cwd = os.getcwd()



# a = subprocess.run([cwd+'\\executable_scripts\\macro_pack.exe','--listtemplates'])
# print(a)


def run_option(num):
    switch={
        1:'--listtemplates',
        2:'-t EMBED_EXE --embed=c:\windows\system32\calc.exe -o -G my_calc.doc'

    }

    a = subprocess.run([cwd + '\\executable_scripts\\macro_pack.exe',switch[1]],shell=True)
    print(a)

run_option(2)
