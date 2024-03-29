export interface Column {
  id: "name" | "count";
  label: string | null;
  minWidth?: number;
  align?: "right";
}
