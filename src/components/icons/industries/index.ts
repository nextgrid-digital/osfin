import type { ComponentType } from "react";
import type { Industry } from "../../../content/industries";
import BanksIcon from "./banks-icon";
import CryptoIcon from "./crypto-icon";
import EcommerceIcon from "./ecommerce-icon";
import FintechIcon from "./fintech-icon";
import GamingIcon from "./gaming-icon";
import InsuranceIcon from "./insurance-icon";
import PaymentsIcon from "./payments-icon";
import TravelIcon from "./travel-icon";

export const industryIcons: Record<Industry["id"], ComponentType<{ className?: string }>> = {
  banks: BanksIcon,
  payments: PaymentsIcon,
  fintech: FintechIcon,
  insurance: InsuranceIcon,
  ecommerce: EcommerceIcon,
  travel: TravelIcon,
  crypto: CryptoIcon,
  gaming: GamingIcon,
};
