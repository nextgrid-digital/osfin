import { TextReveal } from "@/components/ui/cascade-text";
import GatewayFlow from "@/components/ui/gateway-flow";
import CascadeBands from "./CascadeBands";
import SiteContainer from "./SiteContainer";
import SiteFooter from "./SiteFooter";

export default function SiteClose() {
  return (
    <div className="typeset typeset-docs">
      <section className="relative overflow-hidden bg-[#E4E4E4]">
        <GatewayFlow
          mode="light"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
        {/* Keep lines at top; clear behind copy and fade out toward the bottom. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: [
              "radial-gradient(ellipse 80% 55% at 50% 52%, rgba(228,228,228,0.97) 0%, rgba(228,228,228,0.82) 38%, rgba(228,228,228,0.2) 62%, transparent 78%)",
              "linear-gradient(to bottom, transparent 0%, transparent 14%, rgba(228,228,228,0.25) 36%, rgba(228,228,228,0.78) 68%, #E4E4E4 90%)",
            ].join(", "),
          }}
        />
        <SiteContainer className="relative z-10 py-20 text-center md:py-28">
          <div className="mx-auto max-w-[1000px]">
            <h2>
              Put agentic ops
              <br />
              in production
            </h2>
            <div className="not-typeset mt-10 flex justify-center" data-not-typeset>
              <TextReveal
                href="#signup"
                text="Talk to Sales"
                className="btn-primary not-typeset inline-flex h-10 items-center rounded-none bg-black px-5 text-[13px] font-medium text-white transition hover:opacity-90"
                data-not-typeset=""
              />
            </div>
          </div>
        </SiteContainer>
      </section>
      <CascadeBands from="#E4E4E4" to="#001D20" />
      <SiteFooter />
    </div>
  );
}
