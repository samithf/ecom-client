import { Link } from "react-router-dom";

export function EmployeeCountCell(col) {
  const count = col.data.employees;
  const cafeId = col.data.id;
  const cafeName = col.data.name;
  return (
    <Link to={{ pathname: `/employees/cafe/${cafeId}` }} state={{ cafeName }}>
      {count}
    </Link>
  );
}
