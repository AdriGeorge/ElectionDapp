import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
//import 'bootstrap/dist/css/bootstrap.css';

const Manager = ({ addCandidate, accounts }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
  }));

  const classes = useStyles();

  const [account, setAccount] = useState(accounts[0]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(e) {
    setAccount(e.target.value);
  }

  return (
    <div className="manager">
      <div className="title">
        <h3>candidate to add</h3>
      </div>
      <label className="candidateForm">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Account
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={account}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {accounts.map((value, index) => {
              return (
                <MenuItem key={index} value={accounts[index]}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </label>
      <input
        className="candidateName"
        type="text"
        name="name"
        value={name}
        placeHolder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button
        type="button"
        className="btn btn-outline-success addCandidate"
        onClick={(e) => addCandidate(account, '')}
      >
        Add candidate
      </button>
    </div>
  );
};

export default Manager;
