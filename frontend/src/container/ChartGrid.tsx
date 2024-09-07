import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import DashboardBox from "../components/dashboard/DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChartGridProps, PredictData } from "../interfaces/interfaces";
import { predictReturns } from "../api/api";

const ChartGrid: React.FC<ChartGridProps> = ({
  predictData,
  ticker,
  dailyPrices,
  dailyData,
}) => {
  const pieData = [
    { name: "Filled", value: parseFloat(predictData.returns) },
    { name: "Remaining", value: 100 - parseFloat(predictData.returns) },
  ];

  const columns: GridColDef<(typeof dailyData)[number]>[] = [
    {
      field: "Date",
      headerName: "Date",
      width: 120,
    },
    { field: "Open", headerName: "Open", width: 120 },

    {
      field: "Close",
      headerName: "Close",
      width: 120,
    },
    {
      field: "High",
      headerName: "High",
      width: 120,
    },
    {
      field: "Low",
      headerName: "Low",
      width: 120,
    },
    {
      field: "Volume",
      headerName: "Volume",
      width: 120,
    },
  ];

  return (
    <Grid container spacing={5} sx={{ mt: 4 }}>
      {/* First Row */}
      <Grid item xs={6}>
        <DashboardBox>
          <Typography variant="h5" m="1rem" align="left">
            <b>Predicted Returns</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PieChart
              width={300}
              height={200}
              margin={{
                top: 0,
                right: -10,
                left: 10,
                bottom: 0,
              }}
            >
              <Pie
                stroke="none"
                data={pieData}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell key="filled" fill="#448aff" />
                <Cell key="remaining" fill="#F0F3FA" />
                <Label
                  value={predictData.returns + "%"} // Text to display in the middle
                  position="center"
                  fill="black"
                  fontSize={24}
                />
              </Pie>
            </PieChart>
            <Box flexBasis="40%">
              <Typography variant="h5">
                {ticker} is predicted to grow <b>{predictData.returns}%</b> for
                the current quarter
              </Typography>
            </Box>
          </Box>
        </DashboardBox>
      </Grid>
      <Grid item xs={6}>
        <DashboardBox>
          <Typography variant="h5" m="1rem" align="left">
            <b>{ticker} Price Chart</b>
          </Typography>
          <AreaChart
            width={600}
            height={250}
            data={dailyPrices}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient> */}
            </defs>
            <XAxis dataKey="Date" interval={7} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Close"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </DashboardBox>
      </Grid>

      {/* Second Row */}
      <Grid item xs={6}>
        <Typography variant="h5" m="1rem" align="left">
          <b>Key Indicators</b>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box flexBasis="40%" textAlign="center">
            <Typography m="0.3rem 0" variant="h4">
              <b>{predictData.revIncrease}%</b>
            </Typography>
            <Typography variant="h6">
              Increase in revenue of most recent quarter year-over-year
            </Typography>
          </Box>
          <Box ml="2rem" flexBasis="40%" textAlign="center">
            <Typography m="0.3rem 0" variant="h4">
              <b>{predictData.earnIncrease}%</b>
            </Typography>
            <Typography variant="h6">
              Increase in earnings of most recent quarter year-over-year
            </Typography>
          </Box>
          <Box ml="2rem" flexBasis="40%" textAlign="center">
            <Typography m="0.3rem 0" variant="h4">
              <b>{predictData.earnIncreaseCount}</b>
            </Typography>
            <Typography variant="h6">
              Number of consecutive quarters of y-o-y earnings increases
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="h5" m="1rem" align="left">
            <b>{ticker} Price Table</b>
          </Typography>
          <DataGrid
            rows={dailyData}
            getRowId={(row) => row.Date}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            sx={{ ml: "1rem" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartGrid;
