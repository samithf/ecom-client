import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AddEditCafeForm } from "../components/cafes/add-edit-cafe-form";
import { getCafe } from "../redux/state/cafeState";

export default function EditCafePage() {
  const { cafeId } = useParams();
  const dispatch = useDispatch();

  const { selectedCafe, isLoading } = useSelector((state) => state.cafe);

  useEffect(() => {
    dispatch(getCafe(cafeId));
  }, [dispatch, cafeId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!selectedCafe) {
    return;
  }

  const cafe = selectedCafe.data;

  return (
    <AddEditCafeForm
      initialEditState={{
        name: cafe.name,
        description: cafe.description,
        location: cafe.location,
        logo: cafe.logo,
        id: cafe.id,
      }}
    />
  );
}
