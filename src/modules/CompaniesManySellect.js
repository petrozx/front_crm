import * as React from 'react';
import {Autocomplete, TextField} from "@mui/material";

export default function CustomizedHook(props) {
    const {companies, setC} = props;

    return (
      <Autocomplete
          multiple
          id="tags-outlined"
          options={companies}
          getOptionLabel={(option) => option.name}
          defaultValue={[]}
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