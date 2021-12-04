import win32com.client

# ExcelApp = win32com.client.Dispatch('Excel.Application')
# ExcelApp.Visible=True
#
# #create a new workbook in excelapp
# Excelworkbook = ExcelApp.workbooks.Add()
# Excelworkbook.add_vba_project('vbaProject.bin')
# #name of workbook
# print(Excelworkbook.Name)
#
# ExcelSheet = Excelworkbook.Worksheets.Add()
#
# ExcelRange=ExcelSheet.Range("A1:A10")
# ExcelRange.value=1
#
#
#


comApp = "Word.Application"
comObj = win32com.client.Dispatch(comApp)
document = comObj.run('vbaProject.bin')

