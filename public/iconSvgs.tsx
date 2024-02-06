import { Box } from "@mui/material";

export type iconProps = {
  fillColor?: string;
};

export const HomeIcon = ({ fillColor }: iconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
        stroke={fillColor ? fillColor : "#F1BC7E"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AccountIcon = ({ fillColor }: iconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z"
        fill={fillColor ? fillColor : "#F1BC7E"}
      />
    </svg>
  );
};

export const ProductsIcon = ({ fillColor }: iconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
        fill={fillColor ? fillColor : "#F1BC7E"}
      />
      <path
        d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
        fill={fillColor ? fillColor : "#F1BC7E"}
      />
    </svg>
  );
};

export const OperatorsIcon = ({ fillColor }: iconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.35418C10.7329 1.52375 11.8053 1 13 1C15.2091 1 17 2.79086 17 5C17 7.20914 15.2091 9 13 9C11.8053 9 10.7329 8.47624 10 7.64582M13 19H1V18C1 14.6863 3.68629 12 7 12C10.3137 12 13 14.6863 13 18V19ZM13 19H19V18C19 14.6863 16.3137 12 13 12C11.9071 12 10.8825 12.2922 10 12.8027M11 5C11 7.20914 9.20914 9 7 9C4.79086 9 3 7.20914 3 5C3 2.79086 4.79086 1 7 1C9.20914 1 11 2.79086 11 5Z"
        // stroke="#90BDB6"
        stroke={fillColor ? fillColor : "#F1BC7E"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CountArrow = ({ fillColor }: iconProps) => {
  return (
    <Box>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29315 9.70679C5.10545 9.51926 5 9.26495 5 8.99979C5 8.73462 5.10545 8.48031 5.29315 8.29279L9.29816 4.29279C9.48592 4.10532 9.74055 4 10.006 4C10.2715 4 10.5262 4.10532 10.7139 4.29279L14.7189 8.29279C14.9013 8.48139 15.0022 8.73399 15 8.99619C14.9977 9.25838 14.8924 9.5092 14.7067 9.6946C14.5211 9.88001 14.27 9.98518 14.0074 9.98746C13.7449 9.98974 13.492 9.88894 13.3032 9.70679L11.0073 7.41379V14.9998C11.0073 15.265 10.9018 15.5194 10.714 15.7069C10.5263 15.8944 10.2716 15.9998 10.006 15.9998C9.7405 15.9998 9.48582 15.8944 9.29805 15.7069C9.11028 15.5194 9.00479 15.265 9.00479 14.9998V7.41379L6.70892 9.70679C6.52116 9.89426 6.26653 9.99957 6.00104 9.99957C5.73554 9.99957 5.48092 9.89426 5.29315 9.70679Z"
          fill={fillColor ? fillColor : "#10B981"}
        />
      </svg>
    </Box>
  );
};
