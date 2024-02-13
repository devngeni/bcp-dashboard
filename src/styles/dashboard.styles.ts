import { Box, TableCell, styled } from "@mui/material";

export const StatisticsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "24px",

  ".counts_container": {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: "12px",
    gap: "30px",
  },

  ".count_box": {
    display: "flex",
    flexDirection: "column",
    width: "360px",
    height: "152px",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    padding: "25px 20px",
    boxShadow:
      "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)",

    ":hover": {
      boxShadow:
        "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 10px 20px 0px rgba(79, 70, 229, 0.1)",
    },

    ".count_type": {
      fontFamily: "Montserrat",
      fontSize: "14px",
      fontWeight: "500",
      color: "#6B7280",
    },

    ".count": {
      display: "flex",
      fontSize: "24px",
      fontWeight: "600",
      fontFamily: "Montserrat",
      color: "#111827",
    },

    ".view_all": {
      marginTop: "35px",
      color: "#4F46E5",
      fontSize: "14px",
      fontFamily: "Montserrat",
      fontWeight: "500",
      cursor: "pointer",
    },

    ".change_effect": {
      display: "flex",
      color: "#059669",
      fontSize: "14px",
      fontFamily: "Montserrat",
      fontWeight: "600",
      height: "100%",
      alignItems: "center",
    },
  },

  "@media (max-width: 1200px)": {
    ".counts_container": {
      flexWrap: "wrap",
    },
  },
}));

export const ActivitiesContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "24px",

  ".Activities_container": {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
  },
}));

export const ChartContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  marginTop: "24px",
  gap: "20px",
  flexWrap: "wrap",


  ".chart_box": {
    display: "flex",
    flexDirection: "column",
    width: "550px",
    height: "343px",
    boxShadow: "0px 2px 10px 0px #0000001A",
  backgroundColor: "#FFFFFF",

  },

  "@media (max-width: 1400px)": {
    ".chart_box": {
      width: "500px",
    },
  },

  "@media (max-width: 899px)": {
    ".chart_box": {
      width: "100%",
    },
  },

  ".top_part": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
    height: "80px",
    borderBottom: "1px solid #F0F0F0",
    padding: "0px 20px",

    ".header": {
      color: "#000000",
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "20px",
    },
  },

  ".the_chart": {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    height: "calc(343px - 80px)",
    // width: "100%",

    ".y_axis_label": {
      position: "relative",
      color: "#000000",
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: "12px",
      marginLeft: "50px",
    },

    ".y_axis_label::before": {
      content: '""',
      position: "absolute",
      left: "-15px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "red",
    },
  },

  ".date_picker": {
    display: "flex",
    color: "#374151",
    textAlign: "center",
  },
}));

export const DatePickerInput = styled("input")({
  width: "94px",
  height: "38px",
  borderRadius: "4px",
  border: "1px solid #374151",
  padding: "0 10px",
  right: "20px",
  "&:focus": {
    outline: "none",
  },
});

export const ResponsiveContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

export const RecentOrdersContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "24px",

  ".recent_orders_box": {
    display: "flex",
    marginTop: "20px",
    marginBottom: "20px",
    width: "1120px",
  },

  "@media (max-width: 1450px)": {
    ".recent_orders_box": {
      width: "100%",
      overflowX: "auto",
    },
  },
}));
