import * as React from 'react';
import {Autocomplete, TextField} from "@mui/material";

export default function CustomizedHook(props) {
    const {companies, setC, value} = props;
    const ownComp = value.map(ds => companies.filter(c => ds === c.companyID)).flatten()
    return (
      <Autocomplete
          multiple
          id="tags-outlined"
          options={companies}
          getOptionLabel={({name}) => name}
          value={ownComp}
          onChange={(e, n) => {
              setC(n)
          }}
          filterSelectedOptions
          renderInput={(params) => (
              <TextField
                  {...params}
                  label="Компании"
                  placeholder=""
              />
          )}
      />
  );
}