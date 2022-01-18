import subprocess
import os
import argparse
cwd = os.path.realpath(__file__+'\\..\\').split(":")[1]



def insert_macro(filename):
    output= subprocess.run([cwd+'\\hot_manchego\\hot-manchego.exe', f'\\..\\python_backend\\mal_docs\\{filename}',f'\\..\\python_backend\\hot_manchego\\vba.txt'])
    print("[+] Excel Document generated ")

    
def create_xlsm_file(out_name):
    file = open(f'{cwd}\\mal_docs\\{out_name}.xlsm','w')
    file.close()



if __name__=='__main__':
    print("[+] Script started")
    parser = argparse.ArgumentParser()
    parser.add_argument('--file',help='enter the name of generated macro file')

    args =parser.parse_args()

    create_xlsm_file(args.file)
    insert_macro(f'{args.file}.xlsm')
