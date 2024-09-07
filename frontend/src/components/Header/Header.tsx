import {
  AppBar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { getDailyData, predictReturns } from "../../api/api";
import {
  DailyData,
  HeaderProps,
  PredictData,
} from "../../interfaces/interfaces";

const Header: React.FC<HeaderProps> = ({
  setPredictData,
  setTicker,
  setDailyPrices,
  setDailyData,
}) => {
  const [input, setInput] = useState<string>("");

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    console.log(input);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
      event.preventDefault();
    }
  };
  const onClick = async () => {
    console.log("click 1");
    if (!input.trim().length) {
      return;
    }
    try {
      console.log("click 2");
      let data = await predictReturns(input);
      setTicker(input);
      setPredictData(data);
      let data2: DailyData[] = await getDailyData(input);
      setDailyPrices(
        data2
          .map(({ Date, Close }) => ({
            Date,
            Close,
          }))
          .reverse()
      );
      setDailyData(data2);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{ width: "100%", backgroundColor: "white", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ color: "black" }}>
          QuantView
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Enter Stock Ticker to Predict Returns"
            variant="outlined"
            size="small"
            value={input}
            onChange={updateInput}
            onKeyDown={handleKeyPress}
            sx={{
              backgroundColor: "white",
              width: "50%",
              mt: 2,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  style={{ cursor: "pointer" }}
                  onClick={onClick}
                >
                  <ArrowCircleRightOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
