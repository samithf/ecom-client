export function CafeNameCell(col) {
  const cafe = col.data.cafe;
  if (!cafe) {
    return null;
  }
  return cafe.name;
}
