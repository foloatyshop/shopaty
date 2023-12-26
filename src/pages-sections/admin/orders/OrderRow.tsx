import { FC } from "react";
import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { currency } from "lib";
import { Paragraph, Small } from "components/Typography";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents";
import { format } from "date-fns";

// ========================================================================
type OrderRowProps = { order: any };
// ========================================================================

const OrderRow: FC<OrderRowProps> = ({ order }) => {
  // const { amount, id, qty, purchaseDate, billingAddress, status } = order;
  const { id, date, name, phone, address, note, products, quantity, price, sum } = order;

  const router = useRouter();

  const formatDate = ( nanoseconds, seconds) => {
    // Assuming nanoseconds and seconds are parameters from your order data
    const timestampInSeconds = seconds + nanoseconds / 1e9; // convert nanoseconds to seconds
    const timestampInMilliseconds = timestampInSeconds * 1000; // convert seconds to milliseconds
    const date = new Date(timestampInMilliseconds);

    // Format the date as "dd/mm/yy"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {formatDate(date.nanoseconds, date.seconds)}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {name}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {phone}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {address}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {note}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {products.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </StyledTableCell>

      <StyledTableCell align="left">
        {quantity.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </StyledTableCell>

      <StyledTableCell align="left">
        {price.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </StyledTableCell>

      <StyledTableCell align="left">{sum}</StyledTableCell>

 

      <StyledTableCell align="center">
      

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrderRow;
