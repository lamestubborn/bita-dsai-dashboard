
import { BarChartBig, Cog, Filter, Sigma, Database, Rocket, FileText, type LucideProps } from "lucide-react";

export const Icons = {
    BarChartBig,
    Cog,
    Filter,
    Sigma,
    Database,
    Rocket,
    FileText
};

export type IconName = keyof typeof Icons;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = Icons[name];
  return <LucideIcon {...props} />;
};
