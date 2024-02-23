import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSelection,
  isSelected,
} from "../../Reducers/bookReducer/bookSlice";
import styles from "./singleCard.module.css";

export default function SingleCard({ title, img, desc, asin }) {
  const dispatch = useDispatch();
  const selected = useSelector(isSelected);

  const handleClick = () => {
    dispatch(handleSelection({ type: "set", value: asin }));
  };

  return (
    <Card className="mt-6 w-full">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={img} alt="book img" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 truncate">
          {title}
        </Typography>
        <Typography>{desc}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleClick}
          className={selected && selected === asin ? styles.bg_red : ""}
        >
          {selected && selected === asin ? "selected" : "show comments"}
        </Button>
      </CardFooter>
    </Card>
  );
}
