import axios from 'axios';
import { Icon } from '@iconify/react';
import { useState, useContext } from 'react';
import FileDownload from 'js-file-download';

// material
import { Container, Stack, Typography, Button, TextField, Grid, MenuItem } from '@mui/material';
import word from '@iconify/icons-ant-design/file-word-outlined';
import excel from '@iconify/icons-ant-design/file-excel-outlined';
// components
import Page from '../components/Page';
import { AuthContext } from '../context/auth-context';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const auth = useContext(AuthContext);
  const [filetype, setfiletype] = useState('');
  const [filename, setfilename] = useState('');
  console.log('this is my user id bro', auth.userId);

  const handleChange = (event) => {
    setfiletype(event.target.value);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    if (filetype === 'word') onSubmitWord();
    if (filetype === 'excel') onSubmitExcel();
  };

  const onSubmitWord = () => {
    try {
      console.log('sending');
      axios({
        url: 'http://localhost:5000/api/honeytoken/worddoc',
        method: 'POST',
        responseType: 'blob', // important
        data: JSON.stringify({ sessionid: auth.userId })
      }).then((response) => {
        console.log(response);
        FileDownload(response.data, `${filename}.doc`);
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onSubmitExcel = () => {
    try {
      axios({
        url: 'http://localhost:5000/api/honeytoken/excel_vba',
        method: 'POST',
        responseType: 'blob', // important
        data: JSON.stringify(data)
      }).then((response) => {
        console.log(response);
        FileDownload(response.data, `${filename}.xlsm`);
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Page title="Dashboard: Generate Beacons| Minimal-UI">
      <Container>
        <form>
          <Typography variant="h4" sx={{ mb: 5 }}>
            New Beacon
          </Typography>
          {/* <ProductList products={PRODUCTS} /> */}
          <Grid container spacing={5} marginTop={5} marginBottom={2}>
            <Typography variant="h5" sx={{ mx: 5, my: 2 }}>
              Enter File Name:
            </Typography>
            <TextField
              label="i.e Mydocs"
              variant="outlined"
              sx={{ width: 260 }}
              value={filename}
              onChange={(e) => setfilename(e.target.value)}
            />

            <Typography variant="h5" sx={{ mx: 5, my: 2 }}>
              Select File Type:
            </Typography>
            <TextField
              id="outlined-select-filetype"
              sx={{ width: 260 }}
              select
              label="Select"
              value={filetype}
              onChange={handleChange}
              // helperText="Please select your filetype"
            >
              <MenuItem value="word">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon={word} width={24} height={24} />
                  <div>Microsoft Word Document</div>
                </div>
              </MenuItem>
              <MenuItem value="excel">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon={excel} width={24} height={24} />
                  <div>Microsoft Excel Document</div>
                </div>
              </MenuItem>
            </TextField>
          </Grid>
          <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
            <Button
              variant="contained"
              sx={{ width: 250, height: 60, mt: 3, justifySelf: 'center', fontSize: 18 }}
              onClick={(e) => onClickHandler(e)}
            >
              Download Beacon
            </Button>
          </Stack>
        </form>
      </Container>
    </Page>
  );
}
