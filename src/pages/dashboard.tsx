import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import {
  ActivitiesContainer,
  ChartContainer,
  DatePickerInput,
  RecentOrdersContainer,
  StatisticsContainer,
} from "@/styles/dashboard.styles";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BrandIcon from "../../public/brandicon.svg";
import Image from "next/image";
import { CountArrow } from "../../public/iconSvgs";
import { CommonWrapper, StyledTableCell } from "@/styles/common.styles";
import DashBoardLayout from "@/components/layout/dashboardLayout";
import { useAuth } from "@/utils/context/auth-provider";

interface StatisticBoxProps {
  countType: string;
  countValue: string;
  changeEffectValue: string;
}

function VisitorsChart() {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#00453A"
          fill="rgba(104, 166, 156, 0.5)"
          dot={true}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function TopSellingServices() {
  return (
    <ResponsiveContainer>
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Bar dataKey="pv" barSize={4} fill="#F1BC7E" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

const StatisticBox: React.FC<StatisticBoxProps> = ({
  countType,
  countValue,
  changeEffectValue,
}) => {
  return (
    <Box className="count_box">
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          height: "52px",
          alignItems: "center",
        }}
      >
        <Image src={BrandIcon} alt="user" width={48} height={48} />

        <Box sx={{ width: "100%", height: "48px" }}>
          <Box className="count_type">{countType}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box className="count">{countValue}</Box>

            <Box className="change_effect">
              <CountArrow />
              {changeEffectValue}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="view_all">View all</Box>
    </Box>
  );
};

const Dashboard: NextPageWithLayout = () => {
  //from useAuth provider
  const data = useAuth();
  const router = useRouter();

  return (
    <CommonWrapper>
      <h1>Dashboard</h1>
      <StatisticsContainer>
        <header>Statistics</header>
        <Box className="counts_container">
          <StatisticBox
            countType="Total sales"
            countValue="17000"
            changeEffectValue="122"
          />
          <StatisticBox
            countType="Visitors"
            countValue="365"
            changeEffectValue="122"
          />
          <StatisticBox
            countType="Products"
            countValue="20016"
            changeEffectValue="122"
          />
        </Box>
      </StatisticsContainer>
      <ActivitiesContainer>
        <header>Activities</header>
        <Box className="Activities_container">
          <ChartContainer>
            <Box className="chart_box">
              <Box className="top_part">
                <header className="header">Visitors</header>
                <Box
                  sx={{
                    margin: "10px 0 10px auto",
                  }}
                >
                  <DatePicker
                    selected={new Date()}
                    onChange={(date) => console.log(date)}
                    customInput={(<DatePickerInput />) as any}
                    className="date_picker"
                    showYearPicker
                    dateFormat="yyyy"
                  />
                </Box>
              </Box>
              <Box className="the_chart">
                <VisitorsChart />
                <header className="y_axis_label">Numbers of visitors</header>
              </Box>
            </Box>

            <Box className="chart_box">
              <Box className="top_part">
                <header className="header">Top 5 Selling Services</header>
              </Box>
              <Box className="the_chart">
                <TopSellingServices />
              </Box>
            </Box>
          </ChartContainer>
        </Box>
      </ActivitiesContainer>
      <RecentOrdersContainer>
        <header>Recent Orders</header>
        <Box className="recent_orders_box">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>PRODUCT</StyledTableCell>
                  <StyledTableCell>DATE PLACED</StyledTableCell>
                  <StyledTableCell>QUANTITY</StyledTableCell>
                  <StyledTableCell>IN STOCK</StyledTableCell>
                  <StyledTableCell>COST (KSH)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{row.product}</StyledTableCell>
                    <StyledTableCell>{row.datePlaced}</StyledTableCell>
                    <StyledTableCell>{row.quantity}</StyledTableCell>
                    <StyledTableCell>{row.inStock}</StyledTableCell>
                    <StyledTableCell>{row.cost}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </RecentOrdersContainer>
    </CommonWrapper>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout
      pageTitle="Better call paul | Dashboard"
      showSearchComponent={true}
    >
      {page}
    </DashBoardLayout>
  );
};

export default Dashboard;

/**
 * Dummy data for the dashboard
 * Should be replaced with real data from the backend
 */

const data = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const tableData = [
  {
    product: "Product A",
    datePlaced: "11 Jan 2024, 14:00pm",
    quantity: 6,
    inStock: 36,
    cost: 15120,
  },
  {
    product: "Product B",
    datePlaced: "11 Jan 2024, 14:00pm",
    quantity: 8,
    inStock: 40,
    cost: 20000,
  },
  {
    product: "Product B",
    datePlaced: "11 Jan 2024, 14:00pm",
    quantity: 8,
    inStock: 40,
    cost: 20000,
  },
  {
    product: "Product B",
    datePlaced: "11 Jan 2024, 14:00pm",
    quantity: 8,
    inStock: 40,
    cost: 20000,
  },
  {
    product: "Product B",
    datePlaced: "11 Jan 2024, 14:00pm",
    quantity: 8,
    inStock: 40,
    cost: 20000,
  },
];
