export type NavigationIconKey =
  | "overview"
  | "missions"
  | "dispatches"
  | "qa"
  | "artifacts"
  | "settings";

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
  icon: NavigationIconKey;
  badge?: string;
}
