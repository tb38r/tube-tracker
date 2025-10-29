export enum TubeLine {
  Bakerloo = "Bakerloo",
  Central = "Central",
  Circle = "Circle",
  District = "District",
  HammersmithCity = "Hammersmith & City",
  Jubilee = "Jubilee",
  Metropolitan = "Metropolitan",
  Northern = "Northern",
  Piccadilly = "Piccadilly",
  Victoria = "Victoria",
  WaterlooCity = "Waterloo & City",
}

export const TubeLineNameMap: Record<string, TubeLine> = {
  Bakerloo: TubeLine.Bakerloo,
  Central: TubeLine.Central,
  Circle: TubeLine.Circle,
  District: TubeLine.District,
  "Hammersmith & City": TubeLine.HammersmithCity,
  Jubilee: TubeLine.Jubilee,
  Metropolitan: TubeLine.Metropolitan,
  Northern: TubeLine.Northern,
  Piccadilly: TubeLine.Piccadilly,
  Victoria: TubeLine.Victoria,
  "Waterloo & City": TubeLine.WaterlooCity,
};

export const TubeLineColors: Record<TubeLine, string> = {
  [TubeLine.Bakerloo]: "rgb(178, 99, 0)",
  [TubeLine.Central]: "rgb(220, 36, 31)",
  [TubeLine.Circle]: "rgb(255, 200, 10)",
  [TubeLine.District]: "rgb(0, 125, 50)",
  [TubeLine.HammersmithCity]: "rgb(245, 137, 166)",
  [TubeLine.Jubilee]: "rgb(131, 141, 147)",
  [TubeLine.Metropolitan]: "rgb(155, 0, 88)",
  [TubeLine.Northern]: "rgb(0, 0, 0)",
  [TubeLine.Piccadilly]: "rgb(0, 25, 168)",
  [TubeLine.Victoria]: "rgb(3, 155, 229)",
  [TubeLine.WaterlooCity]: "rgb(118, 208, 189)",
};

export enum StatusColor {
  Green = "#4CAF50", 
  Yellow = "#FFC107", 
  Orange = "#FF9800", 
  Red = "#F44336",
  Blue = "#2196F3", 
  Grey = "#9E9E9E", 
}

export const SeverityColorMap: Record<number, StatusColor> = {
  0: StatusColor.Blue, 
  1: StatusColor.Red,
  2: StatusColor.Red, 
  3: StatusColor.Red, 
  4: StatusColor.Orange, 
  5: StatusColor.Orange, 
  6: StatusColor.Red, 
  7: StatusColor.Yellow, 
  8: StatusColor.Blue,
  9: StatusColor.Yellow, 
  10: StatusColor.Green, 
  11: StatusColor.Orange,
  12: StatusColor.Grey, 
  13: StatusColor.Grey, 
  14: StatusColor.Orange, 
  15: StatusColor.Red,
  16: StatusColor.Red, 
  17: StatusColor.Yellow, 
  18: StatusColor.Green, 
  19: StatusColor.Yellow, 
};


export interface LineStatus {
  statusSeverity: number;
  statusSeverityDescription: string;
  reason?: string;
}

export interface TubeData {
  id: string;
  name: string;
  modeName: string;
  lineStatuses: LineStatus[];
}
