import MediaCard, { type MediaCardData } from "../components/media-card";
const MediaCard_data: MediaCardData[] = [
    { title: "  When a payment settles differently than expected  ", text: "    Compare the original transaction, settlement record and ledger entry. Identify whether the difference comes from timing, fees, partial settlement or a missing event.     ", href: "#settlement", label: "  See settlement investigation  ", imgSrc: "/assets/cloned/images/9c5cce507e29.webp", id: "settlement" },
    { title: "  When a payout does not match the ledger  ", text: "    Trace the payout across gateway, bank and internal records. Surface the likely cause, assign ownership and prepare the next permitted action.     ", href: "#payout", label: "  See payout resolution  ", imgSrc: "/assets/cloned/images/c766bba2f7f5.webp", id: "payout" },
    { title: "  When the right action needs a review  ", text: "    Apply the relevant policy, route the case to the right approver and preserve the decision for future audit and analysis.     ", href: "#approvals", label: "  See approval controls  ", imgSrc: "/assets/cloned/images/5b68ebc6b99f.webp", id: "approvals" }
];
/** Discover What Being section. */
export default function DiscoverWhatBeingSection({ mediaCardData = MediaCard_data } = {}) {
  return (
    <div className="block relative">
      {mediaCardData.map((d, i) => <MediaCard key={i} d={d} />)}
      {" "}
    </div>
  );
}
