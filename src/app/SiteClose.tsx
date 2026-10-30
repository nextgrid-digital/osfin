import CascadeBands from "./CascadeBands";
import SiteFooter from "./SiteFooter";

export default function SiteClose() {
  return (
    <div className="typeset typeset-docs">
      <CascadeBands from="#ffffff" to="#000E17" />
      <SiteFooter />
    </div>
  );
}
