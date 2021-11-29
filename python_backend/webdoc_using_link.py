from docx import Document
import re

#creating a docx file normal one
# doc = Document()
#
# doc.add_heading('Testing_doc',0)
#
#
# doc.add_page_break()
#
# doc.save('test.docx')
def generate(session_id):
    url_to_ping='http://172.25.224.1:8081/user_genereated/'+session_id

    webdoc_file = open('webbug.doc','r');
    webdoc_content = webdoc_file.read()

    webdoc_file.close()


    new_content = re.sub('<link rel=stylesheet href="http://8df1-101-50-66-76.ngrok.io">',f'<link rel=stylesheet href="{url_to_ping}">',webdoc_content)

    new_webdoc_file = open('newwebbug.doc','w')
    new_webdoc_file.write(new_content)
    new_webdoc_file.close()


