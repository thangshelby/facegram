// import styles from "../../global2.css";

const  LoadingIcon = ({
	color = "red",
	thickness = 0.2 
}) => (
  <svg
    className='lds-dual-ring'
    viewBox="0 0 24 24"
    xmlns="<http://www.w3.org/2000/svg>"
  >
    <circle
      className='lds-dual-ring'
      cx="4"
      cy="14"
      r="1"
      strokeLinecap="round"
      strokeWidth={thickness}
      stroke={color}
      fill="none"
    />
  </svg>
);

export default LoadingIcon
