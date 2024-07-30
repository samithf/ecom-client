import { SERVER_URL } from "../../constants/urls";

export function CafeLogoCell(col) {
  const path = col.data.logo;
  if (!path) {
    return null;
  }
  return <img src={`${SERVER_URL}/${path}`} alt="Logo" width={40} height={40} />;
}
