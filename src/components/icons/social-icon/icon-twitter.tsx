import { IconProps } from "@/types/common";

const IconTwitter: React.FC<IconProps> = ({
  className = "",
  fill = "primary",
  stroke = "accent",
}: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6269 6.60007C16.6371 6.747 16.6371 6.89392 16.6371 7.04221C16.6371 11.5605 13.1974 16.7714 6.90789 16.7714V16.7687C5.04994 16.7714 3.23059 16.2392 1.6665 15.2357C1.93666 15.2682 2.20818 15.2845 2.48037 15.2851C4.02008 15.2865 5.51578 14.7699 6.7271 13.8186C5.2639 13.7908 3.98081 12.8368 3.53258 11.444C4.04514 11.5429 4.57327 11.5225 5.07635 11.3851C3.48112 11.0628 2.33344 9.66121 2.33344 8.03347C2.33344 8.01858 2.33344 8.00436 2.33344 7.99014C2.80876 8.25488 3.34096 8.40181 3.88534 8.41806C2.38287 7.41393 1.91974 5.41515 2.82704 3.85242C4.56311 5.98865 7.12456 7.28732 9.87424 7.42477C9.59866 6.23714 9.97512 4.99264 10.8635 4.15779C12.2407 2.86318 14.4067 2.92954 15.7013 4.30607C16.4671 4.15508 17.2011 3.87409 17.8727 3.47595C17.6175 4.26748 17.0833 4.93983 16.3696 5.36708C17.0474 5.28718 17.7096 5.10572 18.3332 4.82879C17.8741 5.51672 17.2959 6.11594 16.6269 6.60007Z"
        fill={`var(--${fill})`}
      />
    </svg>
  );
};

export default IconTwitter;