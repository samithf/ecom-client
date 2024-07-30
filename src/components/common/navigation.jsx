import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const NavContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: "white",
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(4),
  ul: {
    display: "flex",
    justifyContent: "center",
    listStyleType: "none",
    li: {
      marginRight: theme.spacing(2),
      flexGrow: 1,
      a: {
        marginRight: 4,
        textDecoration: "none",
        color: "black",
        fontSize: "1.6rem",
      },
    },
  },
}));

export function Navigation() {
  return (
    <NavContainer>
      <ul>
        <li>
          <Link to="/cafes">Cafes</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
      </ul>
    </NavContainer>
  );
}
