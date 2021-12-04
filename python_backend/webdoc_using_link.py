from docx import Document
import re
import argparse
import os
cwd = os.path.realpath(__file__+'\\..\\')


def generate(ip_port,session_id,documentname):
    url_to_ping=f'http://{ip_port}/api/honeytoken/'

    webdoc_file = open(cwd+'\webbug.doc','r');
    webdoc_content = webdoc_file.read()

    webdoc_file.close()

    new_content = re.sub('<link rel=stylesheet href="http://8df1-101-50-66-76.ngrok.io">',f'<link rel=stylesheet href="{url_to_ping}">',webdoc_content)

    new_webdoc_file = open(f'{documentname}.doc','w')
    new_webdoc_file.write(new_content)
    new_webdoc_file.close()

if __name__=='__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url',help='add URl')
    parser.add_argument('--sessionid',help='add unique session_id')
    parser.add_argument('--docname',help=' output Document name')

    args = parser.parse_args()

    generate(args.url,args.sessionid,args.docname)


