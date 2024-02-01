import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout";
import {
  ActivitiesContainer,
  ChartContainer,
  DashBoardContainer,
  DatePickerInput,
  StatisticsContainer,
} from "@/styles/dashboard.styles";
import { Box } from "@mui/material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BrandIcon from "../../public/brandicon.svg";
import Image from "next/image";
import { CountArrow } from "../../public/iconSvgs";

interface StatisticBoxProps {
  countType: string;
  countValue: string;
  changeEffectValue: string;
}
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

export function VisitorsChart() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AreaChart
        width={420}
        height={150}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#00453A"
          fill="#68A69C"
          dot={true}
        />
      </AreaChart>
    </Box>
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
  return (
    <DashBoardContainer>
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
                <header className="y_axis_label">helo</header>
              </Box>
            </Box>

            <Box className="chart_box">
              <Box className="top_part">
                <header className="header">Top 5 Selling Services</header>
              </Box>
              <Box className="the_chart"></Box>
            </Box>
          </ChartContainer>
        </Box>
      </ActivitiesContainer>
    </DashBoardContainer>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageTitle="Better call paul | Dashboard">{page}</Layout>;
};

export default Dashboard;
