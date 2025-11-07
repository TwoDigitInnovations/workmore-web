import Backdrop from "@mui/material/Backdrop";
import { Circles } from "react-loader-spinner";

const Loader = (props) => {
  return (
    <Backdrop
      sx={{ color: "#B59073", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <Circles
        height="80"
        width="80"
        color="#B59073"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Backdrop>
  );
};

export default Loader;
