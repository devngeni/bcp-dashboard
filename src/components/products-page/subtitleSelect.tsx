import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const options = [
  //TOURS AND EXPERIENCES
  { category: "TOURS AND EXPERIENCES", subtitle: "Full Day Trip" },
  { category: "TOURS AND EXPERIENCES", subtitle: "Half Day Trip" },
  { category: "TOURS AND EXPERIENCES", subtitle: "Out of Town" },

  //TRAVEL CONCIERGE
  { category: "TRAVEL CONCIERGE", subtitle: "Airport Transfer" },
  { category: "TRAVEL CONCIERGE", subtitle: "Car Hire" },
  { category: "TRAVEL CONCIERGE", subtitle: "Chauffeur" },

  //PRIVATE CHEF & MEAL PREP
  { category: "PRIVATE CHEF & MEAL PREP", subtitle: "Restaurant" },
  {
    category: "PRIVATE CHEF & MEAL PREP",
    subtitle: "Private Chef & Meal Prep",
  },

  //DRINKS
  { category: "DRINKS", subtitle: "Soft Drinks" },
  { category: "DRINKS", subtitle: "Beers" },
  { category: "DRINKS", subtitle: "Whiskey" },
  { category: "DRINKS", subtitle: "Vodka" },

  //HOUSEKEEPING
  { category: "HOUSEKEEPING", subtitle: "House Keeping" },

  //PROPERTY MANAGEMENT
  { category: "PROPERTY MANAGEMENT", subtitle: "Property Management" },

  //WELLNESS AND GROOMING
  { category: "WELLNESS AND GROOMING", subtitle: "Massage" },
  { category: "WELLNESS AND GROOMING", subtitle: "Grooming" },
  { category: "WELLNESS AND GROOMING", subtitle: "Facial" },
  { category: "WELLNESS AND GROOMING", subtitle: "Waxing" },

  //SHOPPING & GROCERY RUNS
  { category: "SHOPPING & GROCERY RUNS", subtitle: "Shopping" },

  //NANNY SERVICE
  { category: "NANNY SERVICE", subtitle: "Nanny Services" },

  //GIFTSHOP
  { category: "GIFTSHOP", subtitle: "Available Gifts" },

  //RENTABLES
  { category: "RENTABLES", subtitle: "Rentables" },
  { category: "RENTABLES", subtitle: "Portable Wifi" },

  //LAUGGAGE SHOP
  { category: "LAUGGAGE SHOP", subtitle: "Luggage Services" },

  //BANNER AD
  { category: "BANNER AD", subtitle: "Banner ad" },
];

const SubtitleSelect = ({ setSubtitle, subtitle }: any) => {
  const [label, setLabel] = useState("Select Subtitle");

  const handleFocus = () => {
    setLabel("");
  };

  const handleBlur = (event: any) => {
    if (!event.target.value) {
      setLabel("Subtitle");
    }
  };

  const handleSelectedOption = (event: any, value: any) => {
    setSubtitle(value?.subtitle);
  };

  useEffect(() => {
    if (subtitle) setLabel("");
  }, [subtitle]);

  return (
    <Autocomplete
      sx={{
        "&.MuiAutocomplete-root": {
          backgroundColor: "white",
          padding: "0 !important",

          "& fieldset": {
            borderColor: "#D1D5DB",
          },
          "&:hover fieldset": {
            borderColor: "#D1D5DB",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D1D5DB",
          },

          "& .MuiOutlinedInput-input": {
            padding: "0 !important",
          },
          ".MuiAutocomplete-input": {
            border: "none",
            height: "24px !important",
            margin: "0",
          },
        },
      }}
      id="grouped-demo"
      options={options}
      groupBy={(option) => option.category}
      getOptionLabel={(option) => option.subtitle}
      value={options.find((option) => option.subtitle === subtitle) || subtitle}
      onChange={handleSelectedOption}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    />
  );
};

export default SubtitleSelect;
